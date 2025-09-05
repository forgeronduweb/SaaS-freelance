import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, hashPassword } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError, validateEmail, validatePassword } from '@/lib/utils'

// GET /api/users/[id] - Récupérer le profil d'un utilisateur
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        profilePhoto: true,
        phone: true,
        rating: true,
        totalReviews: true,
        isActive: true,
        isEmailVerified: true,
        // Champs freelance
        title: true,
        bio: true,
        skills: true,
        categories: true,
        hourlyRate: true,
        dailyRate: true,
        completedProjects: true,
        portfolio: true,
        country: true,
        city: true,
        // Champs client
        companyName: true,
        companySize: true,
        sector: true,
        website: true,
        companyLogo: true,
        totalProjectsPublished: true,
        totalBudgetSpent: true,
        createdAt: true,
        lastLoginAt: true
      }
    })

    if (!user) {
      return createErrorResponse('Utilisateur non trouvé', 404)
    }

    if (!user.isActive) {
      return createErrorResponse('Ce compte a été désactivé', 403)
    }

    return createSuccessResponse({ user })

  } catch (error) {
    return handleApiError(error)
  }
}

// PUT /api/users/[id] - Mettre à jour le profil utilisateur
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await requireAuth(request)
    const body = await request.json()
    const { id } = await params

    // Vérifier que l'utilisateur modifie son propre profil
    if (currentUser.id !== id) {
      return createErrorResponse('Vous ne pouvez modifier que votre propre profil', 403)
    }

    const {
      fullName,
      email,
      phone,
      profilePhoto,
      password,
      // Champs freelance
      title,
      bio,
      skills,
      categories,
      hourlyRate,
      dailyRate,
      portfolio,
      country,
      city,
      // Champs client
      companyName,
      companySize,
      sector,
      website,
      companyLogo
    } = body

    // Validation email si fourni
    if (email && !validateEmail(email)) {
      return createErrorResponse('Format d\'email invalide', 400)
    }

    // Validation mot de passe si fourni
    if (password) {
      const passwordValidation = validatePassword(password)
      if (!passwordValidation.valid) {
        return createErrorResponse(passwordValidation.message!, 400)
      }
    }

    // Vérifier l'unicité de l'email si changé
    if (email && email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return createErrorResponse('Cet email est déjà utilisé par un autre compte', 409)
      }
    }

    // Préparer les données de mise à jour
    const updateData: any = {}

    if (fullName) updateData.fullName = fullName
    if (email) updateData.email = email
    if (phone) updateData.phone = phone
    if (profilePhoto) updateData.profilePhoto = profilePhoto
    if (password) updateData.password = await hashPassword(password)

    // Champs spécifiques au rôle
    if (currentUser.role === 'FREELANCE') {
      if (title) updateData.title = title
      if (bio) updateData.bio = bio
      if (skills) updateData.skills = skills
      if (categories) updateData.categories = categories
      if (hourlyRate !== undefined) updateData.hourlyRate = hourlyRate
      if (dailyRate !== undefined) updateData.dailyRate = dailyRate
      if (portfolio) updateData.portfolio = portfolio
      if (country) updateData.country = country
      if (city) updateData.city = city
    } else if (currentUser.role === 'CLIENT') {
      if (companyName) updateData.companyName = companyName
      if (companySize) updateData.companySize = companySize
      if (sector) updateData.sector = sector
      if (website) updateData.website = website
      if (companyLogo) updateData.companyLogo = companyLogo
    }

    // Si l'email change, marquer comme non vérifié
    if (email && email !== currentUser.email) {
      updateData.isEmailVerified = false
      // TODO: Envoyer nouvel email de vérification
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        profilePhoto: true,
        phone: true,
        rating: true,
        totalReviews: true,
        isEmailVerified: true,
        // Champs freelance
        title: true,
        bio: true,
        skills: true,
        categories: true,
        hourlyRate: true,
        dailyRate: true,
        completedProjects: true,
        portfolio: true,
        country: true,
        city: true,
        // Champs client
        companyName: true,
        companySize: true,
        sector: true,
        website: true,
        companyLogo: true,
        totalProjectsPublished: true,
        totalBudgetSpent: true,
      }
    })

    return createSuccessResponse({
      user: updatedUser,
      message: 'Profil mis à jour avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}
