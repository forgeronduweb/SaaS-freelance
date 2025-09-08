import { NextResponse } from 'next/server'

export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export const createSuccessResponse = (data: Record<string, unknown>, message?: string, status = 200): NextResponse => {
  return NextResponse.json({
    success: true,
    data,
    message
  } as ApiResponse, { status })
}

export const createErrorResponse = (error: string, status: number = 400): NextResponse => {
  return NextResponse.json({
    success: false,
    error
  } as ApiResponse, { status })
}

export const handleApiError = (error: Error | unknown): NextResponse => {
  console.error('API Error:', error)
  
  const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
  
  if (errorMessage === 'Token manquant') {
    return createErrorResponse('Authentification requise', 401)
  }
  
  if (errorMessage === 'Token invalide') {
    return createErrorResponse('Token invalide', 401)
  }
  
  if (errorMessage === 'Compte désactivé') {
    return createErrorResponse('Compte désactivé', 403)
  }
  
  if (errorMessage === 'Accès non autorisé') {
    return createErrorResponse('Accès non autorisé', 403)
  }
  
  return createErrorResponse(
    errorMessage || 'Erreur interne du serveur',
    500
  )
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins 6 caractères' }
  }
  
  return { valid: true }
}

export const generateVerificationToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}

export const formatCurrency = (amount: number, currency: string = 'XOF'): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export const calculatePlatformFee = (amount: number, feePercentage?: number): number => {
  const fee = feePercentage || parseInt(process.env.PLATFORM_FEE_PERCENTAGE || '10')
  return Math.round(amount * (fee / 100))
}

export const calculateFreelanceAmount = (amount: number, feePercentage?: number): number => {
  const fee = calculatePlatformFee(amount, feePercentage)
  return amount - fee
}
