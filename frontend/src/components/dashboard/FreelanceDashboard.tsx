"use client";
import React from "react";
import DashboardLayout from "./DashboardLayout";

const FreelanceDashboard = () => {
    const stats = [
        { label: "Missions actives", value: "3", icon: "missions", color: "bg-blue-500" },
        { label: "Solde disponible", value: "125 000 FCFA", icon: "wallet", color: "bg-green-500" },
        { label: "Notifications", value: "5", icon: "notifications", color: "bg-orange-500" },
        { label: "Note moyenne", value: "4.8/5", icon: "star", color: "bg-yellow-500" },
    ];

    const activeMissions = [
        {
            id: 1,
            title: "Développement site e-commerce",
            client: "Boutique Dakar",
            status: "En cours",
            progress: 65,
            deadline: "15 Sept 2025",
            amount: "75 000 FCFA"
        },
        {
            id: 2,
            title: "Logo et identité visuelle",
            client: "StartUp Tech",
            status: "En attente validation",
            progress: 90,
            deadline: "10 Sept 2025",
            amount: "45 000 FCFA"
        },
        {
            id: 3,
            title: "Application mobile iOS",
            client: "Entreprise ABC",
            status: "En cours",
            progress: 30,
            deadline: "30 Sept 2025",
            amount: "150 000 FCFA"
        }
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
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "En cours": return "bg-blue-100 text-blue-800";
            case "En attente validation": return "bg-yellow-100 text-yellow-800";
            case "Terminé": return "bg-green-100 text-green-800";
            default: return "bg-slate-100 text-slate-800";
        }
    };

    return (
        <DashboardLayout userType="freelance">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
                    <p className="text-slate-600">Bienvenue sur votre espace freelance AfriLance</p>
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
                    {/* Missions en cours */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-800">Missions en cours</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {activeMissions.map((mission) => (
                                        <div key={mission.id} className="border border-slate-200 rounded-lg p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="font-medium text-slate-800">{mission.title}</h3>
                                                    <p className="text-sm text-slate-600">Client: {mission.client}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                                                    {mission.status}
                                                </span>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
                                                    <span>Progression</span>
                                                    <span>{mission.progress}%</span>
                                                </div>
                                                <div className="w-full bg-slate-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${mission.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600">Échéance: {mission.deadline}</span>
                                                <span className="font-medium text-green-600">{mission.amount}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications & Badges */}
                    <div className="space-y-6">
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
                            <p className="text-2xl font-bold mb-4">125 000 FCFA</p>
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
