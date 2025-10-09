import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      firstName: string;
      lastName: string;
      userType: 'client' | 'freelance';
      phone?: string;
      isEmailVerified: boolean;
      // Champs client
      companyName?: string;
      industry?: string;
      totalSpent?: number;
      // Champs freelance
      skills?: string[];
      bio?: string;
      rating?: number;
      totalEarnings?: number;
      completedProjects?: number;
      planType?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    userType: 'client' | 'freelance';
    phone?: string;
    isEmailVerified: boolean;
    // Champs client
    companyName?: string;
    industry?: string;
    totalSpent?: number;
    // Champs freelance
    skills?: string[];
    bio?: string;
    rating?: number;
    totalEarnings?: number;
    completedProjects?: number;
    planType?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    userType: 'client' | 'freelance';
    firstName: string;
    lastName: string;
    phone?: string;
    isEmailVerified: boolean;
    // Champs client
    companyName?: string;
    industry?: string;
    totalSpent?: number;
    // Champs freelance
    skills?: string[];
    bio?: string;
    rating?: number;
    totalEarnings?: number;
    completedProjects?: number;
    planType?: string;
  }
}
