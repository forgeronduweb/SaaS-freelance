import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { comparePassword, generateToken } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError, validateEmail } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation des champs obligatoires
    if (!email || !password) {
      return createErrorResponse('Email et mot de passe requis', 400)
    }

    if (!validateEmail(email)) {
      return createErrorResponse('Format d\'email invalide', 400)
    }

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        fullName: true,
        role: true,
        isActive: true,
        isEmailVerified: true,
        phone: true,
        profilePhoto: true,
        // Champs freelance
        title: true,
        bio: true,
        skills: true,
        categories: true,
        rating: true,
        totalReviews: true,
        completedProjects: true,
        hourlyRate: true,
        dailyRate: true,
        // Champs client
        companyName: true,
        companySize: true,
        sector: true,
        website: true,
        totalBudgetSpent: true,
        totalProjectsPublished: true,
      }
    })

    if (!user) {
      console.log('Utilisateur non trouvé pour email:', email)
      return createErrorResponse('Email ou mot de passe incorrect', 401)
    }

    // Vérifier le mot de passe
    console.log('Vérification du mot de passe...')
    const isPasswordValid = await comparePassword(password, user.password)
    console.log('Mot de passe valide:', isPasswordValid)
    
    if (!isPasswordValid) {
      return createErrorResponse('Email ou mot de passe incorrect', 401)
    }

    // Vérifier si le compte est actif
    if (!user.isActive) {
      return createErrorResponse('Votre compte a été désactivé. Contactez le support.', 403)
    }

    // Mettre à jour la dernière connexion
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    // Générer le token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    console.log('Token généré, longueur:', token.length)

    // Retourner l'utilisateur sans le mot de passe
    const { password: _, ...userWithoutPassword } = user

    console.log('Réponse de connexion préparée pour utilisateur:', userWithoutPassword.email)

    return createSuccessResponse({
      user: userWithoutPassword,
      token,
      message: 'Connexion réussie'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

