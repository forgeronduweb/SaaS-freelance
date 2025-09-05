import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError, calculatePlatformFee, calculateFreelanceAmount } from '@/lib/utils'

// POST /api/payments - Créer un paiement (escrow)
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()

    const {
      missionId,
      amount,
      method,
      description,
      phoneNumber, // Pour Mobile Money
      currency = 'XOF'
    } = body

    // Validation des champs obligatoires
    if (!missionId || !amount || !method) {
      return createErrorResponse('Mission, montant et méthode de paiement requis', 400)
    }

    if (amount <= 0) {
      return createErrorResponse('Le montant doit être supérieur à 0', 400)
    }

    const validMethods = ['ORANGE_MONEY', 'MTN_MONEY', 'MOOV_MONEY', 'WAVE', 'STRIPE', 'BANK_TRANSFER']
    if (!validMethods.includes(method)) {
      return createErrorResponse('Méthode de paiement invalide', 400)
    }

    // Vérifier que la mission existe
    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
      include: {
        client: { select: { id: true, fullName: true } },
        freelance: { select: { id: true, fullName: true } }
      }
    })

    if (!mission) {
      return createErrorResponse('Mission non trouvée', 404)
    }

    // Seul le client peut effectuer le paiement
    if (mission.clientId !== user.id) {
      return createErrorResponse('Seul le client de la mission peut effectuer le paiement', 403)
    }

    // Vérifier qu'un freelance est assigné
    if (!mission.freelanceId) {
      return createErrorResponse('Aucun freelance n\'est assigné à cette mission', 400)
    }

    // Vérifier qu'il n'y a pas déjà un paiement en cours
    const existingPayment = await prisma.payment.findFirst({
      where: {
        missionId,
        status: { in: ['PENDING', 'COMPLETED'] }
      }
    })

    if (existingPayment) {
      return createErrorResponse('Un paiement existe déjà pour cette mission', 409)
    }

    // Calculer les frais
    const platformFee = calculatePlatformFee(amount)
    const freelanceAmount = calculateFreelanceAmount(amount)

    // Validation Mobile Money
    if (['ORANGE_MONEY', 'MTN_MONEY', 'MOOV_MONEY', 'WAVE'].includes(method)) {
      if (!phoneNumber) {
        return createErrorResponse('Numéro de téléphone requis pour Mobile Money', 400)
      }
    }

    // Créer le paiement
    const payment = await prisma.payment.create({
      data: {
        amount,
        currency,
        method: method as any,
        description: description || `Paiement pour la mission: ${mission.title}`,
        missionId,
        clientId: user.id,
        freelanceId: mission.freelanceId,
        platformFee,
        freelanceAmount,
        phoneNumber,
        status: 'PENDING'
      },
      include: {
        mission: {
          select: {
            id: true,
            title: true,
          }
        },
        client: {
          select: {
            id: true,
            fullName: true,
            companyName: true,
          }
        },
        freelance: {
          select: {
            id: true,
            fullName: true,
            title: true,
          }
        }
      }
    })

    // TODO: Intégrer avec les APIs de paiement réelles
    // switch (method) {
    //   case 'ORANGE_MONEY':
    //     await processOrangeMoneyPayment(payment)
    //     break
    //   case 'MTN_MONEY':
    //     await processMTNMoneyPayment(payment)
    //     break
    //   case 'STRIPE':
    //     await processStripePayment(payment)
    //     break
    // }

    return createSuccessResponse({
      payment,
      message: 'Paiement initié avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

// GET /api/payments - Récupérer l'historique des paiements
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    const where: any = {
      OR: [
        { clientId: user.id },
        { freelanceId: user.id }
      ]
    }

    if (status) {
      where.status = status
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          mission: {
            select: {
              id: true,
              title: true,
              status: true,
            }
          },
          client: {
            select: {
              id: true,
              fullName: true,
              companyName: true,
            }
          },
          freelance: {
            select: {
              id: true,
              fullName: true,
              title: true,
            }
          }
        }
      }),
      prisma.payment.count({ where })
    ])

    return createSuccessResponse({
      payments,
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

