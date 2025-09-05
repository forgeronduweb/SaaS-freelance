"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../../hooks/useAuth";

const FreelanceDashboard = () => {
    const { user, loading } = useAuth();
    const [dashboardData, setDashboardData] = useState({
        missions: [],
        stats: {
            activeMissions: 0,
            availableBalance: 0,
            notifications: 0,
            averageRating: 0
        }
    });

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Récupérer les missions où le freelance a été accepté
            const response = await fetch(`/api/missions?freelanceId=${user?.id}&status=IN_PROGRESS,COMPLETED`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Missions acceptées pour freelance:', data);
                
                // Récupérer uniquement les missions où le freelance a été sélectionné
                const acceptedMissions = data.data?.missions?.filter((mission: Record<string, unknown>) => 
                    mission.selectedFreelanceId === user?.id
                ) || [];
                
                // Calculer les statistiques
                const activeMissions = acceptedMissions.filter((mission: any) => 
                    mission.status === 'IN_PROGRESS'
                ).length;
                const availableBalance = 0; // À implémenter avec le système de paiement
                const notifications = 3; // À implémenter plus tard
                const averageRating = user?.rating || 0;
                
                setDashboardData({
                    missions: acceptedMissions,
                    stats: {
                        activeMissions,
                        availableBalance,
                        notifications,
                        averageRating: Number(averageRating.toFixed(2))
                    }
                });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    const stats = [
        { label: "Missions actives", value: dashboardData.stats.activeMissions.toString(), icon: "missions", color: "bg-blue-500" },
        { label: "Solde disponible", value: `${dashboardData.stats.availableBalance.toLocaleString()} FCFA`, icon: "wallet", color: "bg-green-500" },
        { label: "Notifications", value: dashboardData.stats.notifications.toString(), icon: "notifications", color: "bg-orange-500" },
        { label: "Note moyenne", value: `${user?.rating || 0}/5`, icon: "star", color: "bg-yellow-500" },
    ];

    const recentNotifications = [
        {
            id: 1,
            type: "mission",
            title: "Nouvelle mission disponible",
            message: "Une mission de développement web correspond à votre profil",
            time: "Il y a 2h",
            unread: true
        },
        {
            id: 2,
            type: "payment",
            title: "Paiement reçu",
            message: "Vous avez reçu 45 000 FCFA pour la mission Logo StartUp Tech",
            time: "Il y a 1 jour",
            unread: false
        },
        {
            id: 3,
            type: "message",
            title: "Nouveau message",
            message: "Boutique Dakar vous a envoyé un message",
            time: "Il y a 2 jours",
            unread: false
        }
    ];

    const badges = [
        { name: "Top Freelance", description: "Parmi les 10% meilleurs", color: "bg-purple-500" },
        { name: "100% Satisfait", description: "Toutes les missions validées", color: "bg-green-500" },
        { name: "Livraison Rapide", description: "Toujours à temps", color: "bg-blue-500" },
        { name: "Expert", description: "Plus de 100 missions réalisées", color: "bg-orange-500" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "En attente validation": 
                return "bg-yellow-100 text-yellow-800";
            case "Terminé": 
            case "TerminÃ": 
                return "bg-green-100 text-green-800";
            case "En cours":
                return "bg-blue-100 text-blue-800";
            case "Ouvert":
                return "bg-orange-100 text-orange-800";
            default: 
                return "bg-slate-100 text-slate-800";
        }
    };

    if (loading) {
        return (
            <DashboardLayout userType="freelance">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    
    return (
        <DashboardLayout userType="freelance">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Bonjour {user?.fullName || 'Freelance'} ðŸ‘‹
                    </h1>
                    <p className="text-slate-600">
                        {user?.title ? `${user.title} - ` : ''}Bienvenue sur votre espace freelance AfriLance
                    </p>
                    {user?.bio && (
                        <p className="text-sm text-slate-500 mt-1">{user.bio}</p>
                    )}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-3 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="mb-2 md:mb-0">
                                    <p className="text-xs md:text-sm font-medium text-slate-600">{stat.label}</p>
                                    <p className="text-lg md:text-2xl font-bold text-slate-800">{stat.value}</p>
                                </div>
                                <div className={`w-8 h-8 md:w-12 md:h-12 ${stat.color} rounded-lg flex items-center justify-center self-end md:self-auto`}>
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Missions acceptées */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-800">Missions Acceptées</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {dashboardData.missions.length > 0 ? (
                                        dashboardData.missions.map((mission: any) => (
                                            <div key={String(mission.id)} className="border border-slate-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-slate-800">{String(mission.title)}</h3>
                                                        <p className="text-sm text-slate-600 mt-1">{String(mission.category)}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-orange-600">{String(mission.budget)} FCFA</p>
                                                        <p className="text-sm text-slate-500">{String(mission.deadline)}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 mb-3">{String(mission.description)}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                                            mission.status === 'IN_PROGRESS' 
                                                                ? 'bg-blue-100 text-blue-800' 
                                                                : mission.status === 'COMPLETED'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {mission.status === 'IN_PROGRESS' ? 'En cours' : 
                                                             mission.status === 'COMPLETED' ? 'Terminée' : String(mission.status)}
                                                        </span>
                                                        <span className="text-xs text-slate-500">Mission acceptée</span>
                                                    </div>
                                                    <button className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors">
                                                        Voir détails
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-slate-500">Aucune mission acceptée pour le moment</p>
                                            <p className="text-sm text-slate-400 mt-2">Les missions pour lesquelles vous avez été sélectionné apparaîtront ici</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Notifications récentes */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-800">Notifications récentes</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recentNotifications.map((notification) => (
                                        <div key={notification.id} className={`p-3 rounded-lg ${notification.unread ? 'bg-orange-50 border border-orange-200' : 'bg-slate-50'}`}>
                                            <h4 className="font-medium text-slate-800 text-sm">{notification.title}</h4>
                                            <p className="text-xs text-slate-600 mt-1">{notification.message}</p>
                                            <p className="text-xs text-slate-500 mt-2">{notification.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Badges & Réputation */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-800">Mes Badges</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {badges.map((badge, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className={`w-10 h-10 ${badge.color} rounded-full flex items-center justify-center`}>
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-slate-800 text-sm">{badge.name}</h4>
                                                <p className="text-xs text-slate-600">{badge.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Solde rapide */}
                        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg p-6 text-white">
                            <h3 className="font-semibold mb-2">Solde disponible</h3>
                            <p className="text-2xl font-bold mb-4">{dashboardData.stats.availableBalance.toLocaleString()} FCFA</p>
                            <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-50 transition-colors">
                                Retirer mes gains
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FreelanceDashboard;

