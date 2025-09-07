import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/auth/temp-token - Créer un token temporaire pour les tests
export async function POST(request: NextRequest) {
  try {
    const { email, tempAuth } = await request.json()

    if (!tempAuth) {
      return NextResponse.json(
        { success: false, error: 'Cette API est réservée aux tests' },
        { status: 400 }
      )
    }

    // Récupérer l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Générer un token temporaire
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
        message: 'Token temporaire créé pour les tests',
      },
    })
  } catch (error: unknown) {
    console.error('Erreur création token temporaire:', error)
    // Vérifier si error est un objet avec message
    const message = error instanceof Error ? error.message : 'Erreur serveur'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
