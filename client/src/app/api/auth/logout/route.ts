import { NextRequest, NextResponse } from 'next/server';
import { clearAllAuthCookies } from '@/lib/cookies';

export async function POST(request: NextRequest) {
  try {
    // Créer la réponse
    const response = NextResponse.json(
      { message: 'Déconnexion réussie' },
      { status: 200 }
    );

    // Supprimer tous les cookies d'authentification
    clearAllAuthCookies(response);

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
