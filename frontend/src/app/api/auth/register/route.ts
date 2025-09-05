import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError, validateEmail, validatePassword } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    console.log('=== DÉBUT INSCRIPTION ===')
    const body = await request.json()
    console.log('Données reçues:', JSON.stringify(body, null, 2))
    
    const { email, password, fullName, phone, role, ...additionalData } = body

    // Validation des champs obligatoires
    if (!email || !password || !fullName || !role) {
      console.log('Erreur: Champs manquants - email:', !!email, 'password:', !!password, 'fullName:', !!fullName, 'role:', !!role)
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
    console.log('Vérification utilisateur existant...')
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('Utilisateur existe déjà')
      return createErrorResponse('Un utilisateur avec cet email existe déjà', 409)
    }

    // Hasher le mot de passe
    console.log('Hashage du mot de passe...')
    const hashedPassword = await hashPassword(password)
    const emailVerificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    console.log('Mot de passe hashé avec succès')

    // Préparer les données selon le rôle
    let userData: any = {
      email,
      password: hashedPassword,
      fullName,
      phone,
      role,
      emailVerificationToken,
    }

    if (role === 'FREELANCE') {
      userData = {
        ...userData,
        title: additionalData.title,
        bio: additionalData.bio,
        hourlyRate: additionalData.hourlyRate,
        dailyRate: additionalData.dailyRate,
        skills: additionalData.skills || [],
        categories: additionalData.categories || [],
        portfolio: additionalData.portfolio || [],
        country: additionalData.country,
        city: additionalData.city,
      }
    } else if (role === 'CLIENT') {
      userData = {
        ...userData,
        companyName: additionalData.companyName,
        companySize: additionalData.companySize,
        sector: additionalData.sector,
        website: additionalData.website,
      }
    }

    // Créer l'utilisateur
    console.log('Création utilisateur avec données:', JSON.stringify(userData, null, 2))
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
    console.log('Utilisateur créé avec succès:', user.id)

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
    console.error('=== ERREUR INSCRIPTION ===')
    console.error('Erreur complète:', error)
    console.error('Stack trace:', error instanceof Error ? error.stack : 'Pas de stack trace')
    return handleApiError(error)
  }
}

