import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, handleApiError } from '@/lib/utils'

// POST /api/verify-email - Vérifier manuellement un email (pour admin/debug)
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return Response.json(
        { success: false, error: 'Email requis' },
        { status: 400 }
      )
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { 
        isEmailVerified: true,
        emailVerificationToken: null
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isEmailVerified: true,
        isActive: true
      }
    })

    return createSuccessResponse({
      message: `Email vérifié avec succès pour ${updatedUser.fullName}`,
      user: updatedUser
    })

  } catch (err: unknown) {
    const error = err as { code?: string; message?: string }
    if (error.code === 'P2025') {
      return Response.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }
    return handleApiError(err)
  }
}

// GET /api/verify-email - Vérifier le statut d'un email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return Response.json(
        { success: false, error: 'Email requis' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isEmailVerified: true,
        isActive: true,
        createdAt: true
      }
    })

    if (!user) {
      return Response.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    return createSuccessResponse({ user })

  } catch (err: unknown) {
    return handleApiError(err)
  }
}
