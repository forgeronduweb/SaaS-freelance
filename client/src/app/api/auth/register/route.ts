import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, validatePasswordStrength } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      userType, 
      phone,
      location,
      // Champs spécifiques aux freelances
      skills,
      hourlyRate,
      bio,
      // Champs spécifiques aux clients
      companyName,
      companySize,
      industry
    } = body;

    // Validation des champs requis
    if (!email || !password || !firstName || !lastName || !userType) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Validation du type d'utilisateur
    if (!['freelance', 'client'].includes(userType)) {
      return NextResponse.json(
        { error: 'Type d\'utilisateur invalide' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validation de la force du mot de passe
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: 'Mot de passe trop faible', details: passwordValidation.errors },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Un compte avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Hacher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer l'utilisateur
    const userData: any = {
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      userType,
      phone: phone || null,
      location: location || null,
    };

    // Ajouter les champs spécifiques selon le type d'utilisateur
    if (userType === 'freelance') {
      userData.skills = skills || [];
      userData.hourlyRate = hourlyRate || null;
      userData.bio = bio || null;
      userData.planType = 'gratuit';
    } else if (userType === 'client') {
      userData.companyName = companyName || null;
      userData.companySize = companySize || null;
      userData.industry = industry || null;
    }

    const user = new User(userData);
    await user.save();

    // Retourner les données utilisateur (sans le mot de passe)
    const userResponse = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      initials: user.initials,
      userType: user.userType,
      phone: user.phone,
      location: user.location,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      // Champs spécifiques selon le type
      ...(userType === 'freelance' && {
        skills: user.skills,
        hourlyRate: user.hourlyRate,
        bio: user.bio,
        planType: user.planType,
        rating: user.rating,
        completedProjects: user.completedProjects,
        totalEarnings: user.totalEarnings,
      }),
      ...(userType === 'client' && {
        companyName: user.companyName,
        companySize: user.companySize,
        industry: user.industry,
        totalSpent: user.totalSpent,
      }),
    };

    return NextResponse.json(
      { 
        message: 'Compte créé avec succès', 
        user: userResponse 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
