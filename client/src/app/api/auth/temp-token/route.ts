import { NextRequest } from 'next/server'
import { generateToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/auth/temp-token - Créer un token temporaire pour les tests
export async function POST(request: NextRequest) {
  try {
    const { email, tempAuth } = await request.json()
    
    if (!tempAuth) {
      return Response.json({
        success: false,
        error: 'Cette API est réservée aux tests'
      }, { status: 400 })
    }
    
    // Récupérer l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true
      }
    })
    
    if (!user) {
      return Response.json({
        success: false,
        error: 'Utilisateur non trouvé'
      }, { status: 404 })
    }
    
    // Générer un token temporaire
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })
    
    return Response.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        },
        message: 'Token temporaire créé pour les tests'
      }
    })
    
  } catch (error: any) {
    console.error('Erreur création token temporaire:', error)
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
