import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/fix-freelance - Corriger le problème d'email
export async function POST(request: NextRequest) {
  try {
    // Corriger l'email de freelance1@gmail.com
    const updatedUser = await prisma.user.update({
      where: { 
        email: 'freelance1@gmail.com' 
      },
      data: { 
        isEmailVerified: true,
        emailVerificationToken: null
      }
    })

    return Response.json({
      success: true,
      message: `Email vérifié pour ${updatedUser.fullName}`,
      user: {
        id: updatedUser.id,
        name: updatedUser.fullName,
        email: updatedUser.email,
        isEmailVerified: updatedUser.isEmailVerified
      }
    })

  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
