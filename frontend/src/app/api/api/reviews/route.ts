import { NextRequest } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { requireAuth } from '../../../../lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError } from '../../../../lib/utils'

// POST /api/reviews - Créer une évaluation
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()

    const {
      missionId,
      reviewedUserId,
      rating,
      comment,
      skills,
      communication,
      quality,
      deadline,
      wouldRecommend
    } = body

    // Validation des champs obligatoires
    if (!missionId || !reviewedUserId || !rating) {
      return createErrorResponse('Mission, utilisateur évalué et note requis', 400)
    }

    if (rating < 1 || rating > 5) {
      return createErrorResponse('La note doit être entre 1 et 5', 400)
    }

    if (reviewedUserId === user.id) {
      return createErrorResponse('Vous ne pouvez pas vous évaluer vous-même', 400)
    }

    // Vérifier que la mission existe et est terminée
    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
      select: {
        id: true,
        status: true,
        clientId: true,
        freelanceId: true,
        title: true
      }
    })

    if (!mission) {
      return createErrorResponse('Mission non trouvée', 404)
    }

    if (mission.status !== 'COMPLETED') {
      return createErrorResponse('Seules les missions terminées peuvent être évaluées', 400)
    }

    // Vérifier que l'utilisateur fait partie de la mission
    const isAuthorized = mission.clientId === user.id || mission.freelanceId === user.id
    if (!isAuthorized) {
      return createErrorResponse('Vous n\'êtes pas autorisé à évaluer cette mission', 403)
    }

    // Vérifier que l'utilisateur évalué fait partie de la mission
    const isReviewedUserInMission = mission.clientId === reviewedUserId || mission.freelanceId === reviewedUserId
    if (!isReviewedUserInMission) {
      return createErrorResponse('L\'utilisateur évalué ne fait pas partie de cette mission', 400)
    }

    // Vérifier qu'une évaluation n'existe pas déjà
    const existingReview = await prisma.review.findUnique({
      where: {
        missionId_reviewerId_reviewedUserId: {
          missionId,
          reviewerId: user.id,
          reviewedUserId
        }
      }
    })

    if (existingReview) {
      return createErrorResponse('Vous avez déjà évalué cet utilisateur pour cette mission', 409)
    }

    // Créer l'évaluation
    const review = await prisma.review.create({
      data: {
        missionId,
        reviewerId: user.id,
        reviewedUserId,
        rating,
        comment,
        skills,
        communication,
        quality,
        deadline,
        wouldRecommend: wouldRecommend !== false
      },
      include: {
        reviewer: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            role: true,
            companyName: true
          }
        },
        reviewedUser: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            role: true,
            title: true
          }
        },
        mission: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    // Mettre à jour les statistiques de l'utilisateur évalué
    const reviewedUser = await prisma.user.findUnique({
      where: { id: reviewedUserId },
      select: { rating: true, totalReviews: true }
    })

    if (reviewedUser) {
      const newTotalReviews = reviewedUser.totalReviews + 1
      const newRating = ((reviewedUser.rating * reviewedUser.totalReviews) + rating) / newTotalReviews

      await prisma.user.update({
        where: { id: reviewedUserId },
        data: {
          rating: Math.round(newRating * 100) / 100, // Arrondir à 2 décimales
          totalReviews: newTotalReviews
        }
      })
    }

    // TODO: Créer une notification pour l'utilisateur évalué
    // await createNotification({
    //   userId: reviewedUserId,
    //   type: 'REVIEW_RECEIVED',
    //   title: 'Nouvelle évaluation',
    //   message: `${user.fullName} vous a évalué ${rating}/5 pour la mission "${mission.title}"`,
    //   data: { missionId, reviewId: review.id }
    // })

    return createSuccessResponse({
      review,
      message: 'Évaluation créée avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

// GET /api/reviews - Récupérer les évaluations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') // Évaluations reçues par cet utilisateur
    const reviewerId = searchParams.get('reviewerId') // Évaluations données par cet utilisateur
    const missionId = searchParams.get('missionId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const where: any = {}

    if (userId) where.reviewedUserId = userId
    if (reviewerId) where.reviewerId = reviewerId
    if (missionId) where.missionId = missionId

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          reviewer: {
            select: {
              id: true,
              fullName: true,
              profilePhoto: true,
              role: true,
              companyName: true,
              title: true
            }
          },
          reviewedUser: {
            select: {
              id: true,
              fullName: true,
              profilePhoto: true,
              role: true,
              title: true
            }
          },
          mission: {
            select: {
              id: true,
              title: true,
              category: true
            }
          }
        }
      }),
      prisma.review.count({ where })
    ])

    return createSuccessResponse({
      reviews,
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

