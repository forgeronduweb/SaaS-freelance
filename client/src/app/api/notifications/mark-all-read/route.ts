import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { createSuccessResponse, handleApiError } from '@/lib/utils'

// PUT /api/notifications/mark-all-read - Marquer toutes les notifications comme lues
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth(request)

    // Marquer toutes les notifications non lues de l'utilisateur comme lues
    const result = await prisma.notification.updateMany({
      where: {
        userId: user.id,
        readAt: null
      },
      data: {
        readAt: new Date()
      }
    })

    return createSuccessResponse({
      count: result.count,
      message: `${result.count} notification(s) marquée(s) comme lue(s)`
    })

  } catch (error) {
    return handleApiError(error)
  }
}
