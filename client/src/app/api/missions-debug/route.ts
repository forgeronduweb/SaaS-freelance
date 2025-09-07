import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenFromRequest, getUserFromToken } from '@/lib/auth'

// POST /api/missions-debug - Version simplifiée pour tester la création de missions
export async function POST(request: NextRequest) {
  try {
    console.log('🔍 API POST /missions-debug appelée');

    // Récupérer le token
    const token = getTokenFromRequest(request)
    console.log('🔑 Token présent:', !!token)

    if (!token) {
      return Response.json({ success: false, error: 'Token manquant' }, { status: 401 })
    }

    // Récupérer l'utilisateur
    const user = await getUserFromToken(token)
    console.log('👤 Utilisateur trouvé:', user ? `${user.fullName} (${user.role})` : 'Aucun')

    if (!user) {
      return Response.json({
        success: false,
        error: 'Token invalide ou utilisateur non trouvé'
      }, { status: 401 })
    }

    const body = await request.json()
    console.log('📝 Données reçues:', body)

    const { title, description, category, skills, budget, deadline, status = 'OPEN' } = body

    // Mapper le statut vers les valeurs Prisma valides
    const validStatus = status === 'draft' ? 'OPEN' : status.toUpperCase()

    // Validation basique
    if (!title || !description || !category || !budget || !deadline) {
      return Response.json({
        success: false,
        error: 'Champs obligatoires manquants'
      }, { status: 400 })
    }

    // Valider et formater la date
    let deadlineDate: Date
    try {
      const dateStr = deadline.includes('T') ? deadline.split('T')[0] : deadline
      deadlineDate = new Date(dateStr + 'T00:00:00.000Z')
      if (isNaN(deadlineDate.getTime()) || deadlineDate.getFullYear() < 2024 || deadlineDate.getFullYear() > 2030) {
        throw new Error('Date invalide')
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur de format de date'
      return Response.json({
        success: false,
        error: `Format de date invalide: ${message}`
      }, { status: 400 })
    }

    console.log('📅 Date deadline formatée:', deadlineDate.toISOString())
    console.log('📊 Statut mappé:', validStatus)

    // Créer la mission sans restriction de rôle pour le debug
    const mission = await prisma.mission.create({
      data: {
        title,
        description,
        category,
        skills: skills || [],
        budget: parseFloat(budget),
        deadline: deadlineDate,
        status: validStatus,
        clientId: user.id,
        isRemote: true,
        attachments: []
      },
      include: {
        client: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true
          }
        }
      }
    })

    console.log('✅ Mission créée:', mission.title)

    return Response.json({
      success: true,
      data: { mission, message: 'Mission créée avec succès' }
    })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur interne du serveur'
    console.error('❌ Erreur:', message)
    return Response.json({ success: false, error: message }, { status: 500 })
  }
}
