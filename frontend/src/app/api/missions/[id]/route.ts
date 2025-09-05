import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/utils'

// GET /api/missions/[id] - Récupérer une mission spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mission = await prisma.mission.findUnique({
      where: { id: params.id },
      include: {
        client: {
          select: {
            id: true,
            fullName: true,
            companyName: true,
            companyLogo: true,
            rating: true,
            totalReviews: true,
            totalProjectsPublished: true,
          }
        },
        freelance: {
          select: {
            id: true,
            fullName: true,
            title: true,
            profilePhoto: true,
            rating: true,
            totalReviews: true,
          }
        },
        applications: {
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
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            applications: true,
            messages: true,
          }
        }
      }
    })

    if (!mission) {
      return createErrorResponse('Mission non trouvée', 404)
    }

    // Incrémenter le compteur de vues
    await prisma.mission.update({
      where: { id: params.id },
      data: {
        viewsCount: {
          increment: 1
        }
      }
    })

    return createSuccessResponse({ mission })

  } catch (error) {
    return handleApiError(error)
  }
}

// PUT /api/missions/[id] - Mettre à jour une mission
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()

    // Vérifier que la mission existe et appartient à l'utilisateur
    const existingMission = await prisma.mission.findUnique({
      where: { id: params.id },
      select: { clientId: true, status: true }
    })

    if (!existingMission) {
      return createErrorResponse('Mission non trouvée', 404)
    }

    if (existingMission.clientId !== user.id) {
      return createErrorResponse('Vous n\'êtes pas autorisé à modifier cette mission', 403)
    }

    if (existingMission.status !== 'OPEN') {
      return createErrorResponse('Seules les missions ouvertes peuvent être modifiées', 400)
    }

    const {
      title,
      description,
      category,
      skills,
      budget,
      deadline,
      isUrgent,
      requirements,
      deliverables,
      estimatedDuration,
      experienceLevel,
      location,
      isRemote,
      attachments
    } = body

    // Validation si la date limite est fournie
    if (deadline) {
      const deadlineDate = new Date(deadline)
      if (deadlineDate <= new Date()) {
        return createErrorResponse('La date limite doit être dans le futur', 400)
      }
    }

    // Mettre à jour la mission
    const mission = await prisma.mission.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(skills && { skills }),
        ...(budget && { budget }),
        ...(deadline && { deadline: new Date(deadline) }),
        ...(isUrgent !== undefined && { isUrgent }),
        ...(requirements && { requirements }),
        ...(deliverables && { deliverables }),
        ...(estimatedDuration && { estimatedDuration }),
        ...(experienceLevel && { experienceLevel }),
        ...(location && { location }),
        ...(isRemote !== undefined && { isRemote }),
        ...(attachments && { attachments }),
      },
      include: {
        client: {
          select: {
            id: true,
            fullName: true,
            companyName: true,
            companyLogo: true,
          }
        }
      }
    })

    return createSuccessResponse({
      mission,
      message: 'Mission mise à jour avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/missions/[id] - Supprimer une mission
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request)

    // Vérifier que la mission existe et appartient à l'utilisateur
    const existingMission = await prisma.mission.findUnique({
      where: { id: params.id },
      select: { clientId: true, status: true }
    })

    if (!existingMission) {
      return createErrorResponse('Mission non trouvée', 404)
    }

    if (existingMission.clientId !== user.id) {
      return createErrorResponse('Vous n\'êtes pas autorisé à supprimer cette mission', 403)
    }

    if (existingMission.status === 'IN_PROGRESS') {
      return createErrorResponse('Impossible de supprimer une mission en cours', 400)
    }

    // Supprimer la mission (cascade supprimera les candidatures)
    await prisma.mission.delete({
      where: { id: params.id }
    })

    return createSuccessResponse({
      message: 'Mission supprimée avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}
