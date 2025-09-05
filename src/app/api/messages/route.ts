import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/utils'

// POST /api/messages - Envoyer un message
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()

    const {
      receiverId,
      missionId,
      content,
      attachments
    } = body

    // Validation des champs obligatoires
    if (!receiverId || !content) {
      return createErrorResponse('Destinataire et contenu requis', 400)
    }

    if (receiverId === user.id) {
      return createErrorResponse('Vous ne pouvez pas vous envoyer un message à vous-même', 400)
    }

    // Vérifier que le destinataire existe
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
      select: { id: true, fullName: true, isActive: true }
    })

    if (!receiver) {
      return createErrorResponse('Destinataire non trouvé', 404)
    }

    if (!receiver.isActive) {
      return createErrorResponse('Le destinataire n\'est pas actif', 400)
    }

    // Si une mission est spécifiée, vérifier les permissions
    if (missionId) {
      const mission = await prisma.mission.findUnique({
        where: { id: missionId },
        select: { clientId: true, freelanceId: true }
      })

      if (!mission) {
        return createErrorResponse('Mission non trouvée', 404)
      }

      // Vérifier que l'utilisateur fait partie de la mission
      const isAuthorized = mission.clientId === user.id || 
                          mission.freelanceId === user.id ||
                          mission.clientId === receiverId || 
                          mission.freelanceId === receiverId

      if (!isAuthorized) {
        return createErrorResponse('Vous n\'êtes pas autorisé à envoyer des messages pour cette mission', 403)
      }
    }

    // Créer le message
    const message = await prisma.message.create({
      data: {
        content,
        senderId: user.id,
        receiverId,
        missionId,
        attachments: attachments || [],
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            role: true,
          }
        },
        receiver: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            role: true,
          }
        },
        mission: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    })

    // TODO: Envoyer notification temps réel via WebSocket/Pusher
    // TODO: Créer une notification pour le destinataire

    return createSuccessResponse({
      message,
      success: 'Message envoyé avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

// GET /api/messages - Récupérer les conversations de l'utilisateur
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const conversationWith = searchParams.get('with') // ID de l'autre utilisateur
    const missionId = searchParams.get('missionId')

    const skip = (page - 1) * limit

    if (conversationWith) {
      // Récupérer les messages d'une conversation spécifique
      const where: any = {
        OR: [
          { senderId: user.id, receiverId: conversationWith },
          { senderId: conversationWith, receiverId: user.id }
        ]
      }

      if (missionId) {
        where.missionId = missionId
      }

      const messages = await prisma.message.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          sender: {
            select: {
              id: true,
              fullName: true,
              profilePhoto: true,
              role: true,
            }
          },
          receiver: {
            select: {
              id: true,
              fullName: true,
              profilePhoto: true,
              role: true,
            }
          },
          mission: {
            select: {
              id: true,
              title: true,
            }
          }
        }
      })

      // Marquer les messages reçus comme lus
      await prisma.message.updateMany({
        where: {
          senderId: conversationWith,
          receiverId: user.id,
          readAt: null
        },
        data: {
          readAt: new Date(),
          status: 'READ'
        }
      })

      return createSuccessResponse({
        messages: messages.reverse() // Ordre chronologique
      })
    } else {
      // Récupérer la liste des conversations (derniers messages avec chaque contact)
      const conversations = await prisma.$queryRaw`
        SELECT DISTINCT
          CASE 
            WHEN m.senderId = ${user.id} THEN m.receiverId
            ELSE m.senderId
          END as contactId,
          m.missionId,
          MAX(m.createdAt) as lastMessageAt
        FROM Message m
        WHERE m.senderId = ${user.id} OR m.receiverId = ${user.id}
        GROUP BY contactId, m.missionId
        ORDER BY lastMessageAt DESC
        LIMIT ${limit}
        OFFSET ${skip}
      ` as any[]

      // Récupérer les détails des contacts et derniers messages
      const conversationDetails = await Promise.all(
        conversations.map(async (conv) => {
          const contact = await prisma.user.findUnique({
            where: { id: conv.contactId },
            select: {
              id: true,
              fullName: true,
              profilePhoto: true,
              role: true,
            }
          })

          const lastMessage = await prisma.message.findFirst({
            where: {
              OR: [
                { senderId: user.id, receiverId: conv.contactId },
                { senderId: conv.contactId, receiverId: user.id }
              ],
              ...(conv.missionId && { missionId: conv.missionId })
            },
            orderBy: { createdAt: 'desc' },
            include: {
              mission: {
                select: {
                  id: true,
                  title: true,
                }
              }
            }
          })

          const unreadCount = await prisma.message.count({
            where: {
              senderId: conv.contactId,
              receiverId: user.id,
              readAt: null
            }
          })

          return {
            contact,
            lastMessage,
            unreadCount,
            mission: lastMessage?.mission
          }
        })
      )

      return createSuccessResponse({
        conversations: conversationDetails
      })
    }

  } catch (error) {
    return handleApiError(error)
  }
}

