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

    
    // Les freelances engagés seront récupérés depuis l'API
    const engagedFreelances: unknown[] = [];

    // Les messages récents seront récupérés depuis l'API
    const recentMessages: unknown[] = [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'bg-blue-100 text-blue-600';
            case 'IN_PROGRESS':
                return 'bg-orange-100 text-orange-600';
            case 'COMPLETED':
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

    // L'historique des paiements sera récupéré depuis l'API
    const paymentHistory: unknown[] = [];


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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Missions publiÃƒes */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-800">Mes Missions</h2>
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

                    {/* Freelances engagés */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <div className="p-6 border-b border-slate-200">
                            <h2 className="text-lg font-semibold text-slate-800">Freelances Engagés</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {engagedFreelances.length > 0 ? (
                                    engagedFreelances.map((freelance: unknown) => {
                                        const f = freelance as Record<string, unknown>;
                                        return (
                                        <div key={String(f.id)} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                                            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-medium">{String(f.avatar)}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-slate-800">{String(f.name)}</h3>
                                                <p className="text-sm text-slate-600">{String(f.specialty)}</p>
                                                <p className="text-xs text-slate-500">Mission: {String(f.mission)}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 mb-1">
                                                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-slate-700">{String(f.rating)}</span>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(String(f.status))}`}>
                                                    {String(f.status)}
                                                </span>
                                            </div>
                                        </div>
                                        );
                                    })
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
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Messages récents */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <div className="p-6 border-b border-slate-200">
                            <h2 className="text-lg font-semibold text-slate-800">Messages Récents</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentMessages.length > 0 ? (
                                    recentMessages.map((message: unknown) => {
                                        const msg = message as Record<string, unknown>;
                                        return (
                                        <div key={String(msg.id)} className={`p-4 rounded-lg ${msg.unread ? 'bg-orange-50 border border-orange-200' : 'bg-slate-50'}`}>
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-medium text-slate-800 text-sm">{String(msg.from)}</h4>
                                                <span className="text-xs text-slate-500">{String(msg.time)}</span>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-1">{String(msg.message)}</p>
                                            <p className="text-xs text-slate-500">Mission: {String(msg.mission)}</p>
                                        </div>
                                        );
                                    })
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

                    {/* Historique des paiements */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <div className="p-6 border-b border-slate-200">
                            <h2 className="text-lg font-semibold text-slate-800">Paiements Récents</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {paymentHistory.length > 0 ? (
                                    paymentHistory.map((payment: unknown) => {
                                        const p = payment as Record<string, unknown>;
                                        return (
                                        <div key={String(p.id)} className="p-4 border border-slate-200 rounded-lg">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h4 className="font-medium text-slate-800 text-sm">{String(p.mission)}</h4>
                                                    <p className="text-sm text-slate-600">À {String(p.freelance)}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(String(p.status))}`}>
                                                    {String(p.status)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600">{String(p.date)}</span>
                                                <span className="font-medium text-green-600">{String(p.amount)}</span>
                                            </div>
                                        </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-slate-400 mb-2">
                                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-slate-600">Aucun paiement récent</p>
                                        <p className="text-sm text-slate-500">L&apos;historique de vos paiements apparaîtra ici</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action rapide */}
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold mb-2">Besoin d&apos;un nouveau freelance ?</h3>
                            <p className="text-orange-100">Publiez une mission et recevez des propositions qualifiées</p>
                        </div>
                        <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                            Publier une mission
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ClientDashboard;


