<<<<<<< HEAD
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/utils'

// GET /api/test - Test de base de l'API
export async function GET() {
  try {
    // Test de connexion à la base de données
    const userCount = await prisma.user.count()
    const missionCount = await prisma.mission.count()
    
    return createSuccessResponse({
      message: 'API AfriLance fonctionnelle',
      database: 'Connectée',
      stats: {
        users: userCount,
        missions: missionCount
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/test - Test de création d'utilisateur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'create-test-user') {
      // Créer un utilisateur de test
      const testUser = await prisma.user.create({
        data: {
          email: `test-${Date.now()}@afrilance.com`,
          password: '$2b$10$test.hash.password', // Hash fictif
          fullName: 'Utilisateur Test',
          role: 'FREELANCE',
          title: 'Développeur Full Stack',
          bio: 'Développeur passionné avec 5 ans d\'expérience',
          skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
          categories: ['Développement Web', 'Applications Mobiles'],
          hourlyRate: 25000,
          country: 'Sénégal',
          city: 'Dakar',
          isEmailVerified: true
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          title: true,
          skills: true
        }
      })

      return createSuccessResponse({
        user: testUser,
        message: 'Utilisateur de test créé avec succès'
      })
    }

    if (action === 'create-test-mission') {
      // Créer une mission de test (nécessite un client)
      const testClient = await prisma.user.findFirst({
        where: { role: 'CLIENT' }
      })

      if (!testClient) {
        // Créer un client de test d'abord
        const newClient = await prisma.user.create({
          data: {
            email: `client-${Date.now()}@afrilance.com`,
            password: '$2b$10$test.hash.password',
            fullName: 'Client Test',
            role: 'CLIENT',
            companyName: 'TechCorp Afrique',
            sector: 'Technologie',
            isEmailVerified: true
          }
        })

        const testMission = await prisma.mission.create({
          data: {
            title: 'Développement d\'une application mobile',
            description: 'Nous recherchons un développeur pour créer une application mobile de e-commerce',
            category: 'Développement Mobile',
            skills: ['React Native', 'JavaScript', 'API REST'],
            budget: 500000,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
            clientId: newClient.id,
            requirements: 'Expérience en React Native requise',
            deliverables: 'Application complète avec tests',
            estimatedDuration: '4 semaines',
            experienceLevel: 'Intermédiaire',
            isRemote: true
          },
          include: {
            client: {
              select: {
                fullName: true,
                companyName: true
              }
            }
          }
        })

        return createSuccessResponse({
          mission: testMission,
          message: 'Mission de test créée avec succès'
        })
      }
    }

    return createErrorResponse('Action non reconnue', 400)

  } catch (error) {
    return handleApiError(error)
  }
}

=======
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/utils'

// GET /api/test - Test de base de l'API
export async function GET() {
  try {
    // Test de connexion à la base de données
    const userCount = await prisma.user.count()
    const missionCount = await prisma.mission.count()
    
    return createSuccessResponse({
      message: 'API AfriLance fonctionnelle',
      database: 'Connectée',
      stats: {
        users: userCount,
        missions: missionCount
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/test - Test de création d'utilisateur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'create-test-user') {
      // Créer un utilisateur de test
      const testUser = await prisma.user.create({
        data: {
          email: `test-${Date.now()}@afrilance.com`,
          password: '$2b$10$test.hash.password', // Hash fictif
          fullName: 'Utilisateur Test',
          role: 'FREELANCE',
          title: 'Développeur Full Stack',
          bio: 'Développeur passionné avec 5 ans d\'expérience',
          skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
          categories: ['Développement Web', 'Applications Mobiles'],
          hourlyRate: 25000,
          country: 'Sénégal',
          city: 'Dakar',
          isEmailVerified: true
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          title: true,
          skills: true
        }
      })

      return createSuccessResponse({
        user: testUser,
        message: 'Utilisateur de test créé avec succès'
      })
    }

    if (action === 'create-test-mission') {
      // Créer une mission de test (nécessite un client)
      const testClient = await prisma.user.findFirst({
        where: { role: 'CLIENT' }
      })

      if (!testClient) {
        // Créer un client de test d'abord
        const newClient = await prisma.user.create({
          data: {
            email: `client-${Date.now()}@afrilance.com`,
            password: '$2b$10$test.hash.password',
            fullName: 'Client Test',
            role: 'CLIENT',
            companyName: 'TechCorp Afrique',
            sector: 'Technologie',
            isEmailVerified: true
          }
        })

        const testMission = await prisma.mission.create({
          data: {
            title: 'Développement d\'une application mobile',
            description: 'Nous recherchons un développeur pour créer une application mobile de e-commerce',
            category: 'Développement Mobile',
            skills: ['React Native', 'JavaScript', 'API REST'],
            budget: 500000,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
            clientId: newClient.id,
            requirements: 'Expérience en React Native requise',
            deliverables: 'Application complète avec tests',
            estimatedDuration: '4 semaines',
            experienceLevel: 'Intermédiaire',
            isRemote: true
          },
          include: {
            client: {
              select: {
                fullName: true,
                companyName: true
              }
            }
          }
        })

        return createSuccessResponse({
          mission: testMission,
          message: 'Mission de test créée avec succès'
        })
      }
    }

    return createErrorResponse('Action non reconnue', 400)

  } catch (error) {
    return handleApiError(error)
  }
}

>>>>>>> be9aabde0c29b71f2a94406aab22b023aa80b427
