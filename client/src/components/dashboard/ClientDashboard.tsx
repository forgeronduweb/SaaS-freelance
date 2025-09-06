"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../../hooks/useAuth";

const ClientDashboard = () => {
    const { user, loading } = useAuth();
    const [dashboardData, setDashboardData] = useState({
        missions: [],
        stats: {
            activeMissions: 0,
            engagedFreelances: 0,
            unreadMessages: 0,
            totalBudget: 0
        }
    });

    const fetchDashboardData = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/missions', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Missions récupérées:', data);
                
                // Filtrer les missions du client connecté
                const clientMissions = data.data?.missions?.filter((mission: Record<string, unknown>) => 
                    mission.clientId === user?.id
                ) || [];
                
                // Calculer les statistiques
                const activeMissions = clientMissions.filter((m: Record<string, unknown>) => 
                    m.status === 'IN_PROGRESS' || m.status === 'OPEN'
                ).length;
                const totalBudget = clientMissions.reduce((sum: number, m: Record<string, unknown>) => sum + (Number(m.budget) || 0), 0);
                
                setDashboardData({
                    missions: clientMissions,
                    stats: {
                        activeMissions,
                        engagedFreelances: clientMissions.filter((m: Record<string, unknown>) => m.selectedFreelanceId).length,
                        unreadMessages: 3, // À implémenter plus tard
                        totalBudget
                    }
                });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }, [user?.id]);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user, fetchDashboardData]);

    const stats = [
        { label: "Missions actives", value: dashboardData.stats.activeMissions.toString(), icon: "missions", color: "bg-blue-500" },
        { label: "Freelances engagés", value: dashboardData.stats.engagedFreelances.toString(), icon: "team", color: "bg-green-500" },
        { label: "Messages non lus", value: dashboardData.stats.unreadMessages.toString(), icon: "messages", color: "bg-orange-500" },
        { label: "Budget total", value: `${dashboardData.stats.totalBudget.toLocaleString()} FCFA`, icon: "wallet", color: "bg-purple-500" },
    ];

    if (loading) {
        return (
            <DashboardLayout userType="client">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    
    // Données simulées pour les freelances engagés (à remplacer par API)
    const engagedFreelances = [
        {
            id: 1,
            name: "Amadou Diallo",
            avatar: "AD",
            specialty: "Développeur Full-Stack",
            mission: "Site e-commerce",
            rating: 4.9,
            status: "En cours",
            progress: 75,
            lastActivity: "Il y a 2h",
            budget: "150000"
        },
        {
            id: 2,
            name: "Fatou Sow",
            avatar: "FS",
            specialty: "Designer UI/UX",
            mission: "Refonte interface",
            rating: 4.8,
            status: "En cours",
            progress: 45,
            lastActivity: "Il y a 1 jour",
            budget: "85000"
        }
    ];

    // Messages récents simulés (à remplacer par API)
    const recentMessages = [
        {
            id: 1,
            from: "Amadou Diallo",
            message: "J'ai terminé la partie backend, je passe maintenant au frontend",
            mission: "Site e-commerce",
            time: "Il y a 1h",
            unread: true
        },
        {
            id: 2,
            from: "Fatou Sow",
            message: "Voici les premiers mockups pour validation",
            mission: "Refonte interface",
            time: "Il y a 3h",
            unread: true
        },
        {
            id: 3,
            from: "Moussa Ba",
            message: "Mission terminée, merci pour votre confiance !",
            mission: "Logo entreprise",
            time: "Il y a 2 jours",
            unread: false
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'bg-blue-100 text-blue-600';
            case 'IN_PROGRESS':
            case 'En cours':
                return 'bg-orange-100 text-orange-600';
            case 'COMPLETED':
            case 'Terminée':
                return 'bg-green-100 text-green-600';
            case 'CANCELLED':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-slate-100 text-slate-600';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'Ouverte';
            case 'IN_PROGRESS':
                return 'En cours';
            case 'COMPLETED':
                return 'Terminée';
            case 'CANCELLED':
                return 'Annulée';
            default:
                return status;
        }
    };

    // Historique des paiements simulé (à remplacer par API)
    const paymentHistory = [
        {
            id: 1,
            mission: "Logo entreprise",
            freelance: "Moussa Ba",
            amount: "45 000 FCFA",
            status: "Payé",
            date: "15 Nov 2024",
            method: "Mobile Money"
        },
        {
            id: 2,
            mission: "Site e-commerce",
            freelance: "Amadou Diallo",
            amount: "75 000 FCFA",
            status: "Bloqué (Escrow)",
            date: "12 Nov 2024",
            method: "Carte bancaire"
        },
        {
            id: 3,
            mission: "Refonte interface",
            freelance: "Fatou Sow",
            amount: "42 500 FCFA",
            status: "En attente",
            date: "10 Nov 2024",
            method: "Virement"
        }
    ];


    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case "Payé": return "bg-green-100 text-green-800";
            case "Bloqué (Escrow)": return "bg-yellow-100 text-yellow-800";
            case "En attente": return "bg-orange-100 text-orange-800";
            default: return "bg-slate-100 text-slate-800";
        }
    };

    return (
        <DashboardLayout userType="client">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Bonjour {user?.fullName || 'Client'} 👋
                    </h1>
                    <p className="text-slate-600">
                        {user?.companyName ? `${user.companyName} - ` : ''}Gérez vos missions et suivez vos freelances
                    </p>
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

                {/* 1. Missions publiées */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-800">Missions publiées</h2>
                        <Link href="/missions/new">
                            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                                Nouvelle Mission
                            </button>
                        </Link>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {dashboardData.missions?.length > 0 ? (
                                dashboardData.missions?.map((mission: unknown) => {
                                    const m = mission as Record<string, unknown>;
                                    return (
                                    <div key={String(m.id)} className="border border-slate-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-medium text-slate-800">{String(m.title)}</h3>
                                                <p className="text-sm text-slate-600 mt-1">{String(m.category)}</p>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {Array.isArray(m.skills) && m.skills.slice(0, 3).map((skill: string, index: number) => (
                                                        <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                                                            {String(skill)}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(String(m.status))}`}>
                                                    {getStatusLabel(String(m.status))}
                                                </span>
                                                <p className="text-sm text-slate-600 mt-1">
                                                    Créée le {new Date(String(m.createdAt)).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-600">Budget: {String(m.budget)} FCFA</span>
                                            <span className="font-medium text-green-600">
                                                {String(m.budget)} FCFA
                                            </span>
                                        </div>
                                        
                                        {Boolean(m.isUrgent) && (
                                            <div className="mt-2">
                                                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                                                    Urgent
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-slate-400 mb-2">
                                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-600">Aucune mission publiée</p>
                                    <p className="text-sm text-slate-500">Créez votre première mission pour commencer</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. Freelances engagés */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-800">Freelances engagés</h2>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                {engagedFreelances.length} actifs
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {engagedFreelances.length > 0 ? (
                                engagedFreelances.map((freelance) => (
                                    <div key={freelance.id} className="border border-slate-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-medium">{freelance.avatar}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-medium text-slate-800">{freelance.name}</h3>
                                                        <p className="text-sm text-slate-600">{freelance.specialty}</p>
                                                        <p className="text-xs text-slate-500 mt-1">Mission: {freelance.mission}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-1 mb-1">
                                                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <span className="text-sm font-medium text-slate-700">{freelance.rating}</span>
                                                        </div>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(freelance.status)}`}>
                                                            {freelance.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                {/* Barre de progression */}
                                                <div className="mb-3">
                                                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                                                        <span>Progression</span>
                                                        <span>{freelance.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-slate-200 rounded-full h-2">
                                                        <div 
                                                            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${freelance.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-slate-500">{freelance.lastActivity}</span>
                                                    <div className="flex gap-2">
                                                        <button className="px-3 py-1 text-xs border border-orange-600 text-orange-600 rounded hover:bg-orange-50 transition-colors">
                                                            Contacter
                                                        </button>
                                                        <button className="px-3 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
                                                            Voir détails
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-slate-400 mb-2">
                                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.12l-.075.075a3 3 0 00-4.242 0l-.075-.075A3 3 0 006 18v2h5m6 0v-2a3 3 0 00-3-3H9a3 3 0 00-3 3v2m6 0H9" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-600">Aucun freelance engagé</p>
                                    <p className="text-sm text-slate-500">Les freelances que vous engagez apparaîtront ici</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. Messages */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-800">Messages</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentMessages.length > 0 ? (
                                recentMessages.map((message) => (
                                    <div key={message.id} className={`p-4 rounded-lg border ${message.unread ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-200'}`}>
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-medium text-slate-800 text-sm">{message.from}</h4>
                                            <span className="text-xs text-slate-500">{message.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-1">{message.message}</p>
                                        <p className="text-xs text-slate-500">Mission: {message.mission}</p>
                                        {message.unread && (
                                            <div className="mt-2">
                                                <span className="w-2 h-2 bg-orange-500 rounded-full inline-block"></span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-slate-400 mb-2">
                                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-600">Aucun message récent</p>
                                    <p className="text-sm text-slate-500">Vos conversations avec les freelances apparaîtront ici</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 4. Paiements sécurisés */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-800">Paiements sécurisés</h2>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="text-xs text-green-600 font-medium">Sécurisé</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {paymentHistory.length > 0 ? (
                                paymentHistory.map((payment) => (
                                    <div key={payment.id} className="border border-slate-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-slate-800 text-sm">{payment.mission}</h4>
                                                <p className="text-sm text-slate-600">À {payment.freelance}</p>
                                                <p className="text-xs text-slate-500 mt-1">{payment.method}</p>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                                <p className="text-sm font-medium text-slate-800 mt-1">{payment.amount}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
                                            <span className="text-slate-500">{payment.date}</span>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                {payment.status === "En attente" && (
                                                    <button className="w-full sm:w-auto px-3 py-2 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors min-h-[36px] touch-manipulation">
                                                        Valider paiement
                                                    </button>
                                                )}
                                                {payment.status === "Bloqué (Escrow)" && (
                                                    <button className="w-full sm:w-auto px-3 py-2 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors min-h-[36px] touch-manipulation">
                                                        Libérer fonds
                                                    </button>
                                                )}
                                                <button className="w-full sm:w-auto px-3 py-2 text-xs border border-slate-300 text-slate-600 rounded hover:bg-slate-50 transition-colors min-h-[36px] touch-manipulation">
                                                    Détails
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-slate-400 mb-2">
                                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-600">Aucun paiement récent</p>
                                    <p className="text-sm text-slate-500">L'historique de vos paiements apparaîtra ici</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Résumé des paiements */}
                        <div className="mt-6 pt-4 border-t border-slate-200">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <p className="text-sm text-slate-600">Total dépensé</p>
                                    <p className="font-semibold text-slate-800 text-lg">162 500 FCFA</p>
                                </div>
                                <div className="p-3 bg-yellow-50 rounded-lg">
                                    <p className="text-sm text-slate-600">En escrow</p>
                                    <p className="font-semibold text-yellow-600 text-lg">75 000 FCFA</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-slate-600">En attente</p>
                                    <p className="font-semibold text-orange-600 text-lg">42 500 FCFA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action rapide */}
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg p-4 md:p-6 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold mb-2">Besoin d&apos;un nouveau freelance ?</h3>
                            <p className="text-orange-100 text-sm">Publiez une mission et recevez des propositions qualifiées</p>
                        </div>
                        <button className="w-full sm:w-auto bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors min-h-[44px] touch-manipulation">
                            Publier une mission
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ClientDashboard;


