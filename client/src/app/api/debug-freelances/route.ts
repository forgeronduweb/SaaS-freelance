import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, handleApiError } from '@/lib/utils'

// GET /api/debug-freelances - Diagnostic des freelances
export async function GET(request: NextRequest) {
  try {
    // 1. Compter tous les freelances
    const totalFreelances = await prisma.user.count({
      where: { role: 'FREELANCE' }
    })

    // 2. Compter les freelances actifs
    const activeFreelances = await prisma.user.count({
      where: { 
        role: 'FREELANCE',
        isActive: true 
      }
    })

    // 3. Compter les freelances avec email vérifié
    const verifiedFreelances = await prisma.user.count({
      where: { 
        role: 'FREELANCE',
        isActive: true,
        isEmailVerified: true 
      }
    })

    // 4. Lister tous les freelances avec détails
    const allFreelances = await prisma.user.findMany({
      where: { role: 'FREELANCE' },
      select: {
        id: true,
        fullName: true,
        email: true,
        isActive: true,
        isEmailVerified: true,
        title: true,
        createdAt: true,
        skills: true,
        categories: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // 5. Simuler la requête API exacte
    const visibleFreelances = await prisma.user.findMany({
      where: {
        isActive: true,
        isEmailVerified: true,
        role: 'FREELANCE'
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        title: true,
        skills: true,
        rating: true,
        totalReviews: true,
        hourlyRate: true,
        completedProjects: true
      }
    })

    return createSuccessResponse({
      summary: {
        totalFreelances,
        activeFreelances,
        verifiedFreelances,
        visibleFreelances: visibleFreelances.length
      },
      allFreelances,
      visibleFreelances,
      issues: allFreelances.filter(f => !f.isActive || !f.isEmailVerified).map(f => ({
        id: f.id,
        name: f.fullName,
        email: f.email,
        problems: [
          !f.isActive && 'Compte inactif',
          !f.isEmailVerified && 'Email non vérifié'
        ].filter(Boolean)
      }))
    })

  } catch (error) {
    return handleApiError(error)
  }
}
