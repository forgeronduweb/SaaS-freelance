"use client";
import React, { useState, useEffect, useCallback } from "react";
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

    const fetchDashboardData = useCallback(async () => {
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
                const activeMissions = acceptedMissions.filter((mission: unknown) => 
                    (mission as Record<string, unknown>).status === 'IN_PROGRESS'
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
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user, fetchDashboardData]);

    // Stats cards data - utilisé pour l'affichage des statistiques
    const statsCards = [
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
                return "bg-gray-100 text-gray-800";
        }
    };
    
    // Utilisation de la fonction pour éviter le warning
    void getStatusColor;

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
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Bonjour {user?.fullName || 'Freelance'}
                    </h1>
                    <p className="text-slate-600 mt-1">
                        {user?.title ? `${user.title} - ` : ''}Bienvenue sur votre espace freelance AfriLance
                    </p>
                    {user?.bio && (
                        <p className="text-sm text-slate-500 mt-1">{user.bio}</p>
                    )}
                </div>

                {/* 1. Missions en cours */}
                <div className="bg-white rounded-lg border border-slate-200">
                    <div className="p-4 md:p-6 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-800">Missions en cours</h2>
                    </div>
                    <div className="p-4 md:p-6">
                        <div className="space-y-4">
                            {dashboardData.missions.length > 0 ? (
                                dashboardData.missions.map((mission: unknown) => {
                                    const m = mission as Record<string, unknown>;
                                    return (
                                    <div key={String(m.id)} className="border border-slate-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-slate-800">{String(m.title)}</h3>
                                                <p className="text-sm text-slate-600 mt-1">{String(m.category)}</p>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <p className="font-semibold text-orange-600">{String(m.budget)} FCFA</p>
                                                <p className="text-sm text-slate-500">{String(m.deadline)}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{String(m.description)}</p>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    String(m.status) === 'IN_PROGRESS' 
                                                        ? 'bg-blue-100 text-blue-800' 
                                                        : String(m.status) === 'COMPLETED'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {String(m.status) === 'IN_PROGRESS' ? 'En cours' : 
                                                     String(m.status) === 'COMPLETED' ? 'Terminée' : String(m.status)}
                                                </span>
                                                <span className="text-xs text-slate-500">Mission acceptée</span>
                                            </div>
                                            <button className="w-full sm:w-auto px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors touch-manipulation min-h-[44px]">
                                                Voir détails
                                            </button>
                                        </div>
                                    </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-800 mb-2">Aucune mission en cours</h3>
                                    <p className="text-slate-500 mb-4">Les missions pour lesquelles vous avez été sélectionné apparaîtront ici</p>
                                    <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
                                        Parcourir les missions
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. Notifications */}
                <div className="bg-white rounded-lg border border-slate-200">
                    <div className="p-4 md:p-6 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-800">Notifications</h2>
                            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                                {recentNotifications.filter(n => n.unread).length} non lues
                            </span>
                        </div>
                    </div>
                    <div className="p-4 md:p-6">
                        <div className="space-y-4">
                            {recentNotifications.map((notification) => (
                                <div key={notification.id} className={`flex items-start gap-4 p-4 rounded-lg border ${
                                    notification.unread ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-200'
                                }`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        notification.type === 'mission' ? 'bg-blue-500' :
                                        notification.type === 'payment' ? 'bg-green-500' : 'bg-purple-500'
                                    }`}>
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {notification.type === 'mission' ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            ) : notification.type === 'payment' ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            )}
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-medium text-slate-800">{notification.title}</h4>
                                                <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                                            </div>
                                            <span className="text-xs text-slate-500">{notification.time}</span>
                                        </div>
                                    </div>
                                    {notification.unread && (
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                                Voir toutes les notifications
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. Solde */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Solde</h3>
                            <p className="text-3xl font-bold">{dashboardData.stats.availableBalance.toLocaleString()} FCFA</p>
                            <p className="text-green-100 text-sm mt-1">Disponible pour retrait</p>
                        </div>
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-white bg-opacity-10 rounded-lg p-3">
                            <p className="text-green-100">Ce mois</p>
                            <p className="font-semibold">125 000 FCFA</p>
                        </div>
                        <div className="bg-white bg-opacity-10 rounded-lg p-3">
                            <p className="text-green-100">Total gagné</p>
                            <p className="font-semibold">450 000 FCFA</p>
                        </div>
                    </div>
                </div>

                {/* 4. Retraits */}
                <div className="bg-white rounded-lg border border-slate-200">
                    <div className="p-4 md:p-6 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-800">Retraits</h2>
                    </div>
                    <div className="p-4 md:p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-slate-800">Nouveau retrait</h4>
                                    <p className="text-sm text-slate-600">Retirez vos gains vers votre compte</p>
                                </div>
                                <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
                                    Retirer
                                </button>
                            </div>
                            
                            {/* Historique des retraits */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-slate-800">Historique récent</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-slate-800">45 000 FCFA</p>
                                            <p className="text-xs text-slate-500">Mobile Money - 12 Nov 2024</p>
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Traité</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-slate-800">30 000 FCFA</p>
                                            <p className="text-xs text-slate-500">Virement bancaire - 5 Nov 2024</p>
                                        </div>
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">En cours</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Badges */}
                <div className="bg-white rounded-lg border border-slate-200">
                    <div className="p-4 md:p-6 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-800">Badges</h2>
                        <p className="text-sm text-slate-600 mt-1">Vos accomplissements sur la plateforme</p>
                    </div>
                    <div className="p-4 md:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {badges.map((badge, index) => (
                                <div key={index} className="text-center p-4 rounded-lg border border-slate-200 hover:border-orange-300 transition-colors">
                                    <div className={`w-16 h-16 ${badge.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-medium text-slate-800 mb-1">{badge.name}</h4>
                                    <p className="text-xs text-slate-600">{badge.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-600 mb-3">Débloquez plus de badges en complétant des missions et en maintenant une excellente qualité de service</p>
                            <button className="px-6 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium">
                                Voir tous les badges disponibles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FreelanceDashboard;

