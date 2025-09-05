import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, requireRole } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/utils'

// GET /api/users - Rechercher des utilisateurs (freelances/clients)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role') // FREELANCE ou CLIENT
    const skills = searchParams.get('skills')?.split(',')
    const categories = searchParams.get('categories')?.split(',')
    const minRating = searchParams.get('minRating')
    const country = searchParams.get('country')
    const city = searchParams.get('city')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const skip = (page - 1) * limit

    // Construire les filtres
    const where: any = {
      isActive: true,
      isEmailVerified: true
    }

    if (role && ['FREELANCE', 'CLIENT'].includes(role)) {
      where.role = role
    }

    if (skills && skills.length > 0) {
      where.skills = { hasSome: skills }
    }

    if (categories && categories.length > 0) {
      where.categories = { hasSome: categories }
    }

    if (minRating) {
      where.rating = { gte: parseFloat(minRating) }
    }

    if (country) where.country = country
    if (city) where.city = city

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { rating: 'desc' },
          { totalReviews: 'desc' },
          { createdAt: 'desc' }
        ],
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          profilePhoto: true,
          rating: true,
          totalReviews: true,
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
          totalProjectsPublished: true,
          totalBudgetSpent: true,
          createdAt: true,
          lastLoginAt: true
        }
      }),
      prisma.user.count({ where })
    ])

    return createSuccessResponse({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    return handleApiError(error)
  }
}

