import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/utils'

// POST /api/missions/[id]/applications - Postuler à une mission (freelances seulement)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(request, ['FREELANCE'])
    const body = await request.json()
    const { id } = await params

    const {
      coverLetter,
      proposedBudget,
      proposedDeadline,
      estimatedDuration,
      questions,
      portfolio,
      attachments
    } = body

    // Validation des champs obligatoires
    if (!coverLetter || !proposedBudget || !proposedDeadline) {
      return createErrorResponse('Lettre de motivation, budget et délai proposés sont requis', 400)
    }

    if (proposedBudget <= 0) {
      return createErrorResponse('Le budget proposé doit être supérieur à 0', 400)
    }

    const deadlineDate = new Date(proposedDeadline)
    if (deadlineDate <= new Date()) {
      return createErrorResponse('Le délai proposé doit être dans le futur', 400)
    }

    // Vérifier que la mission existe et est ouverte
    const mission = await prisma.mission.findUnique({
      where: { id },
      select: { 
        id: true, 
        status: true, 
        clientId: true,
        title: true,
        budget: true,
        deadline: true
      }
    })

    if (!mission) {
      return createErrorResponse('Mission non trouvée', 404)
    }

    if (mission.status !== 'OPEN') {
      return createErrorResponse('Cette mission n\'accepte plus de candidatures', 400)
    }

    if (mission.clientId === user.id) {
      return createErrorResponse('Vous ne pouvez pas postuler à votre propre mission', 400)
    }

    // Vérifier si l'utilisateur a déjà postulé
    const existingApplication = await prisma.application.findUnique({
      where: {
        missionId_freelanceId: {
          missionId: id,
          freelanceId: user.id
        }
      }
    })

    if (existingApplication) {
      return createErrorResponse('Vous avez déjà postulé à cette mission', 409)
    }

    // Créer la candidature
    const application = await prisma.application.create({
      data: {
        coverLetter,
        proposedBudget,
        proposedDeadline: deadlineDate,
        estimatedDuration,
        questions,
        portfolio: portfolio || [],
        attachments: attachments || [],
        missionId: id,
        freelanceId: user.id,
      },
      include: {
        freelance: {
          select: {
            id: true,
            fullName: true,
            title: true,
            profilePhoto: true,
            rating: true,
            totalReviews: true,
            completedProjects: true,
            skills: true,
          }
        },
        mission: {
          select: {
            id: true,
            title: true,
            client: {
              select: {
                id: true,
                fullName: true,
                companyName: true,
              }
            }
          }
        }
      }
    })

    // Mettre à jour le compteur de candidatures de la mission
    await prisma.mission.update({
      where: { id },
      data: {
        applicationsCount: {
          increment: 1
        }
      }
    })

    // TODO: Créer une notification pour le client
    // await createNotification({
    //   userId: mission.clientId,
    //   type: 'APPLICATION_RECEIVED',
    //   title: 'Nouvelle candidature',
    //   message: `${user.fullName} a postulé à votre mission "${mission.title}"`,
    //   data: { missionId: id, applicationId: application.id }
    // })

    return createSuccessResponse({
      application,
      message: 'Candidature envoyée avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

// GET /api/missions/[id]/applications - Récupérer les candidatures d'une mission (client propriétaire seulement)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(request, ['CLIENT'])
    const { id } = await params

    // Vérifier que la mission appartient au client
    const mission = await prisma.mission.findUnique({
      where: { id },
      select: { clientId: true }
    })

    if (!mission) {
      return createErrorResponse('Mission non trouvée', 404)
    }

    if (mission.clientId !== user.id) {
      return createErrorResponse('Vous n\'êtes pas autorisé à voir ces candidatures', 403)
    }

    const applications = await prisma.application.findMany({
      where: { missionId: id },
      include: {
        freelance: {
          select: {
            id: true,
            fullName: true,
            title: true,
            profilePhoto: true,
            rating: true,
            totalReviews: true,
            completedProjects: true,
            skills: true,
            bio: true,
            hourlyRate: true,
            dailyRate: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return createSuccessResponse({ applications })

  } catch (error) {
    return handleApiError(error)
  }
}
