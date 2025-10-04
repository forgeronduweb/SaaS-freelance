import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { verifyPassword, generateToken } from '@/lib/auth';
import { setAuthCookie } from '@/lib/cookies';
import { loginSchema, validateInput } from '@/lib/validators';
import { checkRateLimit } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting par IP
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitResult = checkRateLimit(`login:${clientIP}`, 5, 15 * 60 * 1000); // 5 tentatives par 15 min
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Trop de tentatives de connexion. Réessayez plus tard.',
          resetTime: rateLimitResult.resetTime 
        },
        { status: 429 }
      );
    }

    await connectDB();

    const body = await request.json();
    
    // Validation avec Zod
    const validation = validateInput(loginSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.errors },
        { status: 400 }
      );
    }

    const { email, password } = validation.data!;

    // Rechercher l'utilisateur
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      isActive: true 
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Mettre à jour la dernière connexion
    user.lastLoginAt = new Date();
    await user.save();

    // Générer le token JWT
    const token = generateToken(user);

    // Préparer les données utilisateur (sans le mot de passe)
    const userResponse = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      initials: user.initials,
      userType: user.userType,
      avatar: user.avatar,
      phone: user.phone,
      location: user.location,
      isEmailVerified: user.isEmailVerified,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      
      // Champs spécifiques aux freelances
      ...(user.userType === 'freelance' && {
        skills: user.skills,
        hourlyRate: user.hourlyRate,
        bio: user.bio,
        portfolio: user.portfolio,
        rating: user.rating,
        completedProjects: user.completedProjects,
        totalEarnings: user.totalEarnings,
        planType: user.planType,
      }),
      
      // Champs spécifiques aux clients
      ...(user.userType === 'client' && {
        companyName: user.companyName,
        companySize: user.companySize,
        industry: user.industry,
        totalSpent: user.totalSpent,
      }),
    };

    // Créer la réponse avec le cookie
    const response = NextResponse.json(
      { 
        message: 'Connexion réussie',
        user: userResponse,
        token 
      },
      { status: 200 }
    );

    // Définir le cookie d'authentification de manière sécurisée
    setAuthCookie(response, token);

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
