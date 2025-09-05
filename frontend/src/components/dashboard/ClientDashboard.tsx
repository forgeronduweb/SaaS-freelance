"use client";
import React from "react";
import Link from "next/link";
import DashboardLayout from "./DashboardLayout";

const ClientDashboard = () => {
    const stats = [
        { label: "Missions actives", value: "2", icon: "missions", color: "bg-blue-500" },
        { label: "Freelances engagés", value: "5", icon: "team", color: "bg-green-500" },
        { label: "Messages non lus", value: "3", icon: "messages", color: "bg-orange-500" },
        { label: "Budget total", value: "450 000 FCFA", icon: "wallet", color: "bg-purple-500" },
    ];

    const publishedMissions = [
        {
            id: 1,
            title: "Développement application mobile",
            status: "En cours d'exécution",
            freelance: "Amadou Diallo",
            budget: "200 000 FCFA",
            deadline: "20 Sept 2025",
            progress: 45,
            proposals: 0
        },
        {
            id: 2,
            title: "Refonte site web e-commerce",
            status: "En cours de recrutement",
            freelance: null,
            budget: "150 000 FCFA",
            deadline: "25 Sept 2025",
            progress: 0,
            proposals: 8
        },
        {
            id: 3,
            title: "Création logo et charte graphique",
            status: "Terminé",
            freelance: "Fatou Sow",
            budget: "75 000 FCFA",
            deadline: "05 Sept 2025",
            progress: 100,
            proposals: 0
        }
    ];

    const engagedFreelances = [
        {
            id: 1,
            name: "Amadou Diallo",
            specialty: "Développeur Mobile",
            mission: "Application mobile",
            rating: 4.9,
            status: "En cours",
            avatar: "AD"
        },
        {
            id: 2,
            name: "Fatou Sow",
            specialty: "Designer Graphique",
            mission: "Logo et charte graphique",
            rating: 5.0,
            status: "Terminé",
            avatar: "FS"
        }
    ];

    const recentMessages = [
        {
            id: 1,
            from: "Amadou Diallo",
            message: "J'ai terminé la première phase du développement...",
            time: "Il y a 1h",
            unread: true,
            mission: "Application mobile"
        },
        {
            id: 2,
            from: "Fatou Sow",
            message: "Voici les dernières versions du logo...",
            time: "Il y a 3h",
            unread: true,
            mission: "Logo et charte"
        },
        {
            id: 3,
            from: "System AfriLance",
            message: "Votre mission 'Site e-commerce' a reçu 3 nouvelles propositions",
            time: "Il y a 1 jour",
            unread: false,
            mission: "Site e-commerce"
        }
    ];

    const paymentHistory = [
        {
            id: 1,
            mission: "Logo et charte graphique",
            freelance: "Fatou Sow",
            amount: "75 000 FCFA",
            status: "Payé",
            date: "05 Sept 2025"
        },
        {
            id: 2,
            mission: "Application mobile",
            freelance: "Amadou Diallo",
            amount: "100 000 FCFA",
            status: "Bloqué (Escrow)",
            date: "10 Sept 2025"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "En cours d'exécution": return "bg-blue-100 text-blue-800";
            case "En cours de recrutement": return "bg-yellow-100 text-yellow-800";
            case "Terminé": return "bg-green-100 text-green-800";
            case "En cours": return "bg-blue-100 text-blue-800";
            default: return "bg-slate-100 text-slate-800";
        }
    };

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
                    <h1 className="text-2xl font-bold text-slate-800">Tableau de bord Client</h1>
                    <p className="text-slate-600">Gérez vos missions et suivez vos freelances</p>
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
                    {/* Missions publiées */}
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
                                {publishedMissions.map((mission) => (
                                    <div key={mission.id} className="border border-slate-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-medium text-slate-800">{mission.title}</h3>
                                                {mission.freelance && (
                                                    <p className="text-sm text-slate-600">Freelance: {mission.freelance}</p>
                                                )}
                                                {mission.proposals > 0 && (
                                                    <p className="text-sm text-orange-600">{mission.proposals} propositions reçues</p>
                                                )}
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                                                {mission.status}
                                            </span>
                                        </div>
                                        
                                        {mission.progress > 0 && (
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
                                        )}
                                        
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-600">Échéance: {mission.deadline}</span>
                                            <span className="font-medium text-green-600">{mission.budget}</span>
                                        </div>
                                    </div>
                                ))}
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
                                {engagedFreelances.map((freelance) => (
                                    <div key={freelance.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                                        <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-medium">{freelance.avatar}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-slate-800">{freelance.name}</h3>
                                            <p className="text-sm text-slate-600">{freelance.specialty}</p>
                                            <p className="text-xs text-slate-500">Mission: {freelance.mission}</p>
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
                                ))}
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
                                {recentMessages.map((message) => (
                                    <div key={message.id} className={`p-4 rounded-lg ${message.unread ? 'bg-orange-50 border border-orange-200' : 'bg-slate-50'}`}>
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-medium text-slate-800 text-sm">{message.from}</h4>
                                            <span className="text-xs text-slate-500">{message.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-1">{message.message}</p>
                                        <p className="text-xs text-slate-500">Mission: {message.mission}</p>
                                    </div>
                                ))}
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
                                {paymentHistory.map((payment) => (
                                    <div key={payment.id} className="p-4 border border-slate-200 rounded-lg">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-medium text-slate-800 text-sm">{payment.mission}</h4>
                                                <p className="text-sm text-slate-600">à {payment.freelance}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}>
                                                {payment.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-600">{payment.date}</span>
                                            <span className="font-medium text-green-600">{payment.amount}</span>
                                        </div>
                                    </div>
                                ))}
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
