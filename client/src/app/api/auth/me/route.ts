<<<<<<< HEAD
import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createSuccessResponse, handleApiError } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    
    return createSuccessResponse({
      user,
      message: 'Profil utilisateur récupéré avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

=======
import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createSuccessResponse, handleApiError } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    
    return createSuccessResponse({
      user,
      message: 'Profil utilisateur récupéré avec succès'
    })

  } catch (error) {
    return handleApiError(error)
  }
}

>>>>>>> be9aabde0c29b71f2a94406aab22b023aa80b427
