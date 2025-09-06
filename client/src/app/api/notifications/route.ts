import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/utils'

// GET /api/notifications - Récupérer les notifications de l'utilisateur
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const type = searchParams.get('type')
    const isRead = searchParams.get('isRead')
  
    void userId // Variable pour future utilisation
    void type // Variable pour future utilisation  
    void isRead // Variable pour future utilisation
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      userId: user.id
    }

    if (unreadOnly) {
      where.readAt = null
    }

    if (type) {
      where.type = type
    }

    if (isRead !== null) {
      where.isRead = isRead === 'true'
    }

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: {
          userId: user.id,
          readAt: null
        }
      })
    ])

    return createSuccessResponse({
      notifications,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/notifications - Créer une notification (usage interne)
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    void user // Variable pour validation d'authentification
    const body = await request.json()

    const {
      userId,
      type,
      title,
      message,
      data
    } = body

    // Validation des champs obligatoires
    if (!userId || !type || !title || !message) {
      return createErrorResponse('Tous les champs obligatoires doivent être remplis', 400)
    }

    const validTypes = [
      'MESSAGE_RECEIVED',
      'APPLICATION_RECEIVED',
      'APPLICATION_ACCEPTED',
      'APPLICATION_REJECTED',
      'MISSION_COMPLETED',
      'PAYMENT_RECEIVED',
      'PAYMENT_RELEASED',
      'REVIEW_RECEIVED',
      'SYSTEM_ANNOUNCEMENT'
    ]

    if (!validTypes.includes(type)) {
      return createErrorResponse('Type de notification invalide', 400)
    }

    // Vérifier que l'utilisateur cible existe
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, isActive: true }
    })

    if (!targetUser) {
      return createErrorResponse('Utilisateur cible non trouvé', 404)
    }

    if (!targetUser.isActive) {
      return createErrorResponse('L\'utilisateur cible n\'est pas actif', 400)
    }

    // Créer la notification
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        data: data || {}
      }
    })

    // TODO: Envoyer notification push/email selon les préférences utilisateur
    // TODO: Envoyer notification temps réel via WebSocket/Pusher

    return createSuccessResponse({
      notification,
      message: 'Notification créée avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

