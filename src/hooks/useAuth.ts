"use client";
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'CLIENT' | 'FREELANCE' | 'ADMIN';
  phone?: string;
  profilePhoto?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  // Champs freelance
  title?: string;
  bio?: string;
  skills?: string[];
  categories?: string[];
  rating?: number;
  totalReviews?: number;
  completedProjects?: number;
  hourlyRate?: number;
  dailyRate?: number;
  // Champs client
  companyName?: string;
  companySize?: string;
  sector?: string;
  website?: string;
  totalBudgetSpent?: number;
  totalProjectsPublished?: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les données du localStorage au chargement
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const refreshUserData = async () => {
    if (!token) return;

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data?.user) {
          setUser(data.data.user);
          localStorage.setItem('user', JSON.stringify(data.data.user));
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Supprimer le cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  return {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    refreshUserData,
    logout,
  };
};
