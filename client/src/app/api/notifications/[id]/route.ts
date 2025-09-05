import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/utils'

// PUT /api/notifications/[id] - Marquer une notification comme lue
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth(request)
    const { id } = await params

    // Vérifier que la notification existe et appartient à l'utilisateur
    const notification = await prisma.notification.findUnique({
      where: { id },
      select: { userId: true, readAt: true }
    })

    if (!notification) {
      return createErrorResponse('Notification non trouvée', 404)
    }

    if (notification.userId !== user.id) {
      return createErrorResponse('Vous n\'êtes pas autorisé à modifier cette notification', 403)
    }

    // Marquer comme lue si pas déjà fait
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: {
        readAt: notification.readAt || new Date()
      }
    })

    return createSuccessResponse({
      notification: updatedNotification,
      message: 'Notification marquée comme lue'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/notifications/[id] - Supprimer une notification
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth(request)
    const { id } = await params

    // Vérifier que la notification existe et appartient à l'utilisateur
    const notification = await prisma.notification.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!notification) {
      return createErrorResponse('Notification non trouvée', 404)
    }

    if (notification.userId !== user.id) {
      return createErrorResponse('Vous n\'êtes pas autorisé à supprimer cette notification', 403)
    }

    // Supprimer la notification
    await prisma.notification.delete({
      where: { id }
    })

    return createSuccessResponse({
      message: 'Notification supprimée avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}
