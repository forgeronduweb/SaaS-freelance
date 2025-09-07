import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/utils'

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
    const clientId = searchParams.get('clientId')

    // Construire les filtres avec typage approprié
    const where: any = {}
    if (clientId) where.clientId = clientId
    else where.status = status
    if (category) where.category = category
    if (skills) where.skills = { hasSome: skills }
    if (minBudget || maxBudget) {
      where.budget = {}
      if (minBudget) where.budget.gte = parseFloat(minBudget)
      if (maxBudget) where.budget.lte = parseFloat(maxBudget)
    }
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
            select: { applications: true }
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

  } catch (error: unknown) {
    return handleApiError(error)
  }
}

// POST /api/missions - Créer une nouvelle mission (clients seulement)
export async function POST(request: NextRequest) {
  try {
    let user
    try {
      user = await getUserFromRequest(request)
      if (!user) throw new Error('Token manquant ou invalide')
      if (user.role !== 'CLIENT') throw new Error('Seuls les clients peuvent créer des missions')
    } catch (authError: unknown) {
      const message = authError instanceof Error ? authError.message : 'Erreur d\'authentification'
      return Response.json({ success: false, error: `Erreur d'authentification: ${message}` }, { status: 401 })
    }

    const body = await request.json()
    const {
      title, description, category, skills, budget, deadline,
      isUrgent, requirements, deliverables, estimatedDuration,
      experienceLevel, location, isRemote, attachments
    } = body

    if (!title || !description || !category || !budget || !deadline)
      return createErrorResponse('Tous les champs obligatoires doivent être remplis', 400)

    if (budget <= 0) return createErrorResponse('Le budget doit être supérieur à 0', 400)

    let deadlineDate: Date
    try {
      const dateStr = deadline.includes('T') ? deadline.split('T')[0] : deadline
      deadlineDate = new Date(dateStr + 'T00:00:00.000Z')
      if (isNaN(deadlineDate.getTime()) || deadlineDate.getFullYear() < 2024 || deadlineDate.getFullYear() > 2030)
        throw new Error('Date invalide')
    } catch {
      return createErrorResponse('Format de date invalide', 400)
    }

    const mission = await prisma.mission.create({
      data: {
        title, description, category, skills: skills || [], budget, deadline: deadlineDate,
        isUrgent: isUrgent || false, requirements, deliverables, estimatedDuration,
        experienceLevel, location, isRemote: isRemote !== false, attachments: attachments || [],
        clientId: user.id,
      },
      include: {
        client: { select: { id: true, fullName: true, companyName: true, companyLogo: true } }
      }
    })

    await prisma.user.update({
      where: { id: user.id },
      data: { totalProjectsPublished: { increment: 1 } }
    })

    return createSuccessResponse({ mission, message: 'Mission créée avec succès' })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur'
    return Response.json({ success: false, error: message }, { status: 500 })
  }
}
