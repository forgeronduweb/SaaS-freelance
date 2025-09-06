import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/test-db - Tester la connexion à MongoDB via Prisma
export async function GET(request: NextRequest) {
  try {
    // Test de connexion basique
    await prisma.$connect()
    
    // Test de requête simple
    const userCount = await prisma.user.count()
    const missionCount = await prisma.mission.count()
    
    // Test de création/suppression d'un document test
    const testUser = await prisma.user.create({
      data: {
        email: `test-connection-${Date.now()}@example.com`,
        password: 'test',
        fullName: 'Test Connection',
        role: 'CLIENT'
      }
    })
    
    // Supprimer immédiatement le test
    await prisma.user.delete({
      where: { id: testUser.id }
    })
    
    return Response.json({
      success: true,
      message: 'Connexion MongoDB réussie via Prisma',
      data: {
        database: 'MongoDB',
        orm: 'Prisma',
        userCount,
        missionCount,
        testOperations: {
          create: 'OK',
          delete: 'OK'
        },
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error: any) {
    console.error('Erreur connexion DB:', error)
    
    return Response.json({
      success: false,
      error: 'Erreur de connexion à la base de données',
      details: {
        message: error.message,
        code: error.code,
        type: error.constructor.name
      }
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
