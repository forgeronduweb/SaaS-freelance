import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse, handleApiError, validateEmail, generateVerificationToken } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return createErrorResponse('Email requis', 400)
    }

    if (!validateEmail(email)) {
      return createErrorResponse('Format d\'email invalide', 400)
    }

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, fullName: true }
    })

    // Pour des raisons de sécurité, on retourne toujours un succès
    // même si l'email n'existe pas
    if (!user) {
      return createSuccessResponse({
        message: 'Si cet email existe, un lien de réinitialisation a été envoyé.'
      })
    }

    // Générer un token de réinitialisation
    const resetToken = generateVerificationToken()
    const resetExpires = new Date(Date.now() + 3600000) // 1 heure

    // Sauvegarder le token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires
      }
    })

    // TODO: Envoyer l'email de réinitialisation
    // await sendPasswordResetEmail(user.email, resetToken)

    return createSuccessResponse({
      message: 'Si cet email existe, un lien de réinitialisation a été envoyé.'
    })

  } catch (error) {
    return handleApiError(error)
  }
}
