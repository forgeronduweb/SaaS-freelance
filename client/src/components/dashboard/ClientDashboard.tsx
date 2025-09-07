"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../../hooks/useAuth";

interface Mission {
  id: string;
  title: string;
  category: string;
  skills?: string[];
  status: string;
  budget: number;
  createdAt: string;
  isUrgent?: boolean;
  clientId?: string;
  selectedFreelanceId?: string;
}

interface Freelance {
  id: number;
  name: string;
  avatar: string;
  specialty: string;
  mission: string;
  rating: number;
  status: string;
  progress: number;
  lastActivity: string;
  budget: string;
}

interface Message {
  id: number;
  from: string;
  message: string;
  mission: string;
  time: string;
  unread: boolean;
}

interface Payment {
  id: number;
  mission: string;
  freelance: string;
  amount: string;
  status: string;
  date: string;
  method: string;
}

const ClientDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [dashboardData, setDashboardData] = useState<{
    missions: Mission[];
    stats: {
      activeMissions: number;
      engagedFreelances: number;
      unreadMessages: number;
      totalBudget: number;
    };
  }>({
    missions: [],
    stats: { activeMissions: 0, engagedFreelances: 0, unreadMessages: 0, totalBudget: 0 },
  });

  const fetchDashboardData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/missions", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        const clientMissions: Mission[] = data.data?.missions?.filter(
          (m: Mission) => m.clientId === user?.id
        ) || [];

        const activeMissions = clientMissions.filter(
          (m) => m.status === "IN_PROGRESS" || m.status === "OPEN"
        ).length;

        const totalBudget = clientMissions.reduce((sum, m) => sum + Number(m.budget || 0), 0);

        setDashboardData({
          missions: clientMissions,
          stats: {
            activeMissions,
            engagedFreelances: clientMissions.filter((m) => m.selectedFreelanceId).length,
            unreadMessages: 3, // à remplacer par vraie valeur API
            totalBudget,
          },
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user, fetchDashboardData]);

  if (loading) {
    return (
      <DashboardLayout userType="client">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Bonjour {user?.fullName || 'Client'} 👋
          </h1>
          <p className="text-slate-600">
            {user?.companyName ? `${user.companyName} - ` : ''}Gérez vos missions et suivez vos freelances
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
