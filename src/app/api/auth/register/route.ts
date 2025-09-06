import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError, validateEmail, validatePassword, generateVerificationToken } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName, phone, role, ...additionalData } = body

    // Validation des champs obligatoires
    if (!email || !password || !fullName || !role) {
      return createErrorResponse('Tous les champs obligatoires doivent être remplis', 400)
    }

    if (!validateEmail(email)) {
      return createErrorResponse('Format d\'email invalide', 400)
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return createErrorResponse(passwordValidation.message!, 400)
    }

    if (!['FREELANCE', 'CLIENT'].includes(role)) {
      return createErrorResponse('Rôle invalide', 400)
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return createErrorResponse('Un utilisateur avec cet email existe déjà', 409)
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password)
    const emailVerificationToken = generateVerificationToken()

    // Préparer les données de base
    const baseUserData = {
      email,
      password: hashedPassword,
      fullName,
      phone: phone || null,
      role,
      emailVerificationToken,
    }

    // Préparer les données selon le rôle
    let userData
    if (role === 'FREELANCE') {
      userData = {
        ...baseUserData,
        title: additionalData.title || null,
        bio: additionalData.bio || null,
        hourlyRate: additionalData.hourlyRate ? Number(additionalData.hourlyRate) : null,
        dailyRate: additionalData.dailyRate ? Number(additionalData.dailyRate) : null,
        skills: Array.isArray(additionalData.skills) ? additionalData.skills : [],
        categories: Array.isArray(additionalData.categories) ? additionalData.categories : [],
        portfolio: Array.isArray(additionalData.portfolio) ? additionalData.portfolio : [],
        country: additionalData.country || null,
        city: additionalData.city || null,
      }
    } else if (role === 'CLIENT') {
      userData = {
        ...baseUserData,
        companyName: additionalData.companyName || null,
        companySize: additionalData.companySize || null,
        sector: additionalData.sector || null,
        website: additionalData.website || null,
      }
    } else {
      userData = baseUserData
    }

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isEmailVerified: true,
        phone: true,
        title: true,
        bio: true,
        skills: true,
        categories: true,
        companyName: true,
        sector: true,
        createdAt: true,
      }
    })

    // Générer le token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // TODO: Envoyer l'email de vérification
    // await sendVerificationEmail(user.email, emailVerificationToken)

    return createSuccessResponse({
      user,
      token,
      message: 'Inscription réussie. Vérifiez votre email pour activer votre compte.'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

