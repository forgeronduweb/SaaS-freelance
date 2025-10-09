import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';
import { config } from '@/lib/config';

// Interface pour l'utilisateur NextAuth
interface NextAuthUser {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  userType: 'client' | 'freelance';
  phone?: string;
  isEmailVerified: boolean;
  companyName?: string;
  industry?: string;
  totalSpent?: number;
  skills?: string[];
  bio?: string;
  rating?: number;
  totalEarnings?: number;
  completedProjects?: number;
  planType?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        try {
          // Se connecter à la base de données
          await connectDB();

          // Chercher l'utilisateur
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase() 
          }).select('+password');

          if (!user) {
            throw new Error("Aucun compte trouvé avec cet email");
          }

          // Vérifier le mot de passe
          const isPasswordValid = await bcrypt.compare(
            credentials.password, 
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect");
          }

          // Vérifier que le compte est actif
          if (!user.isActive) {
            throw new Error("Compte désactivé");
          }

          // Retourner les données utilisateur (sans le mot de passe)
          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            phone: user.phone,
            isEmailVerified: user.isEmailVerified,
            // Champs spécifiques selon le type
            companyName: user.userType === 'client' ? user.companyName : undefined,
            industry: user.userType === 'client' ? user.industry : undefined,
            totalSpent: user.userType === 'client' ? user.totalSpent : undefined,
            skills: user.userType === 'freelance' ? user.skills : undefined,
            bio: user.userType === 'freelance' ? user.bio : undefined,
            rating: user.userType === 'freelance' ? user.rating : undefined,
            totalEarnings: user.userType === 'freelance' ? user.totalEarnings : undefined,
            completedProjects: user.userType === 'freelance' ? user.completedProjects : undefined,
            planType: user.userType === 'freelance' ? user.planType : undefined,
          };
        } catch (error) {
          console.error("Erreur d'authentification:", error);
          throw new Error(error instanceof Error ? error.message : "Erreur d'authentification");
        }
      }
    })
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 jours
  },
  
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 jours
  },
  
  callbacks: {
    async jwt({ token, user }) {
      // Lors de la connexion, ajouter les données utilisateur au token
      if (user) {
        token.id = user.id;
        token.userType = user.userType;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.isEmailVerified = user.isEmailVerified;
        
        // Champs spécifiques selon le type
        if (user.userType === 'client') {
          token.companyName = user.companyName;
          token.industry = user.industry;
          token.totalSpent = user.totalSpent;
        } else if (user.userType === 'freelance') {
          token.skills = user.skills;
          token.bio = user.bio;
          token.rating = user.rating;
          token.totalEarnings = user.totalEarnings;
          token.completedProjects = user.completedProjects;
          token.planType = user.planType;
        }
      }
      return token;
    },
    
    async session({ session, token }) {
      // Transférer les données du token vers la session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.userType = token.userType as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.phone = token.phone as string;
        session.user.isEmailVerified = token.isEmailVerified as boolean;
        
        // Champs spécifiques selon le type
        if (token.userType === 'client') {
          session.user.companyName = token.companyName as string;
          session.user.industry = token.industry as string;
          session.user.totalSpent = token.totalSpent as number;
        } else if (token.userType === 'freelance') {
          session.user.skills = token.skills as string[];
          session.user.bio = token.bio as string;
          session.user.rating = token.rating as number;
          session.user.totalEarnings = token.totalEarnings as number;
          session.user.completedProjects = token.completedProjects as number;
          session.user.planType = token.planType as string;
        }
      }
      return session;
    }
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  secret: config.nextAuth.secret,
  
  debug: config.app.debugMode,
  
  events: {
    async signIn({ user, account, profile }) {
      console.log(`✅ Connexion réussie pour ${user.email}`);
    },
    async signOut({ session, token }) {
      console.log(`👋 Déconnexion de ${session?.user?.email || 'utilisateur'}`);
    },
  },
  
  // Configuration pour éviter les erreurs de CORS et JSON
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token' 
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
};
