import jwt, { SignOptions } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'
import { prisma } from './prisma'

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export const hashPassword = async (password: string): Promise<string> => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS || '12')
  return await bcrypt.hash(password, rounds)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as SignOptions
  return jwt.sign(payload, secret, options)
}

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      return null
    }
    return jwt.verify(token, secret) as JWTPayload
  } catch {
    return null
  }
}

export const getTokenFromRequest = (request: NextRequest): string | null => {
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  // Fallback: check cookies
  const token = request.cookies.get('token')?.value
  return token || null
}

export const getUserFromToken = async (token: string) => {
  const payload = verifyToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      isActive: true,
      isEmailVerified: true,
      profilePhoto: true,
      // Champs freelance
      title: true,
      bio: true,
      skills: true,
      rating: true,
      totalReviews: true,
      completedProjects: true,
      // Champs client
      companyName: true,
      companySize: true,
      sector: true,
    }
  })

  return user
}

export const getUserFromRequest = async (request: NextRequest) => {
  const token = getTokenFromRequest(request)
  if (!token) return null
  
  return await getUserFromToken(token)
}

export const requireAuth = async (request: NextRequest) => {
  const token = getTokenFromRequest(request)
  if (!token) {
    throw new Error('Token manquant')
  }

  const user = await getUserFromToken(token)
  if (!user) {
    throw new Error('Token invalide')
  }

  if (!user.isActive) {
    throw new Error('Compte désactivé')
  }

  return user
}

export const requireRole = async (request: NextRequest, allowedRoles: string[]) => {
  const user = await requireAuth(request)
  
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Accès non autorisé')
  }

  return user
}
