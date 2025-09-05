import { NextRequest } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { requireAuth, requireRole } from '../../../../lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError } from '../../../../lib/utils'

// GET /api/missions - Récupérer toutes les missions avec filtres
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const skills = searchParams.get('skills')?.split(',')
    const minBudget = searchParams.get('minBudget')
    const maxBudget = searchParams.get('maxBudget')
    const status = searchParams.get('status') || 'OPEN'
    const isUrgent = searchParams.get('isUrgent') === 'true'
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Construire les filtres
    const where: any = {
      status: status as any,
    }

    if (category) where.category = category
    if (skills) where.skills = { hasSome: skills }
    if (minBudget) where.budget = { ...where.budget, gte: parseFloat(minBudget) }
    if (maxBudget) where.budget = { ...where.budget, lte: parseFloat(maxBudget) }
    if (isUrgent) where.isUrgent = true
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [missions, total] = await Promise.all([
      prisma.mission.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { isUrgent: 'desc' },
          { createdAt: 'desc' }
        ],
        include: {
          client: {
            select: {
              id: true,
              fullName: true,
              companyName: true,
              companyLogo: true,
              rating: true,
              totalReviews: true,
            }
          },
          _count: {
            select: {
              applications: true
            }
          }
        }
      }),
      prisma.mission.count({ where })
    ])

    return createSuccessResponse({
      missions,
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

// POST /api/missions - Créer une nouvelle mission (clients seulement)
export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(request, ['CLIENT'])
    const body = await request.json()

    const {
      title,
      description,
      category,
      skills,
      budget,
      deadline,
      isUrgent,
      requirements,
      deliverables,
      estimatedDuration,
      experienceLevel,
      location,
      isRemote,
      attachments
    } = body

    // Validation des champs obligatoires
    if (!title || !description || !category || !budget || !deadline) {
      return createErrorResponse('Tous les champs obligatoires doivent être remplis', 400)
    }

    if (budget <= 0) {
      return createErrorResponse('Le budget doit être supérieur à 0', 400)
    }

    const deadlineDate = new Date(deadline)
    if (deadlineDate <= new Date()) {
      return createErrorResponse('La date limite doit être dans le futur', 400)
    }

    // Créer la mission
    const mission = await prisma.mission.create({
      data: {
        title,
        description,
        category,
        skills: skills || [],
        budget,
        deadline: deadlineDate,
        isUrgent: isUrgent || false,
        requirements,
        deliverables,
        estimatedDuration,
        experienceLevel,
        location,
        isRemote: isRemote !== false,
        attachments: attachments || [],
        clientId: user.id,
      },
      include: {
        client: {
          select: {
            id: true,
            fullName: true,
            companyName: true,
            companyLogo: true,
          }
        }
      }
    })

    // Mettre à jour le compteur de missions publiées du client
    await prisma.user.update({
      where: { id: user.id },
      data: {
        totalProjectsPublished: {
          increment: 1
        }
      }
    })

    return createSuccessResponse({
      mission,
      message: 'Mission créée avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

