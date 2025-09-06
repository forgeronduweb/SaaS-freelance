import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/debug-missions-count - Compter les missions en base
export async function GET(request: NextRequest) {
  try {
    const totalMissions = await prisma.mission.count()
    
    const missionsByStatus = await prisma.mission.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    })
    
    const missionsByClient = await prisma.mission.groupBy({
      by: ['clientId'],
      _count: {
        id: true
      }
    })
    
    const recentMissions = await prisma.mission.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        clientId: true,
        status: true,
        createdAt: true,
        client: {
          select: {
            fullName: true,
            email: true
          }
        }
      }
    })
    
    return Response.json({
      success: true,
      data: {
        totalMissions,
        missionsByStatus,
        missionsByClient,
        recentMissions
      }
    })
    
  } catch (error: any) {
    console.error('Erreur debug missions:', error)
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
