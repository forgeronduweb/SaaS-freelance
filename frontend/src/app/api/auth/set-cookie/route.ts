import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token manquant' },
        { status: 400 }
      )
    }

    const response = NextResponse.json({ success: true })
    
    // Définir le cookie côté serveur
    response.cookies.set('token', token, {
      httpOnly: false, // Permettre l'accès JavaScript
      secure: false, // HTTP en développement
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Erreur lors de la définition du cookie:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
