"use client";
import React from "react";

interface ClientProfileProps {
    clientId: string;
}

const ClientProfile = ({ clientId }: ClientProfileProps) => {
    // Données mockées - à remplacer par des données réelles via API
    const clientData = {
        id: clientId,
        name: "TechCorp Afrique",
        type: "Entreprise",
        logo: "/api/placeholder/120/120",
        sector: "Technologies de l'information",
        location: "Dakar, Sénégal",
        website: "https://techcorp-afrique.com",
        description: "Entreprise leader dans le développement de solutions digitales pour l'Afrique. Nous accompagnons les PME dans leur transformation numérique depuis 2018.",
        foundedYear: 2018,
        teamSize: "50-100 employés",
        totalBudgetSpent: "2 450 000 FCFA",
        totalProjects: 23,
        activeProjects: 3,
        rating: 4.7,
        totalReviews: 18,
        responseTime: "< 4h",
        paymentVerified: true,
        memberSince: "Janvier 2022"
    };

    const projectHistory = [
        {
            id: 1,
            title: "Application mobile e-commerce",
            category: "Développement Mobile",
            budget: "450 000 FCFA",
            status: "Terminé",
            freelancer: "Amadou Diallo",
            completedDate: "Août 2024",
            rating: 5
        },
        {
            id: 2,
            title: "Refonte site web corporate",
            category: "Développement Web",
            budget: "320 000 FCFA",
            status: "Terminé",
            freelancer: "Fatou Sow",
            completedDate: "Juillet 2024",
            rating: 5
        },
        {
            id: 3,
            title: "Stratégie marketing digital",
            category: "Marketing",
            budget: "180 000 FCFA",
            status: "En cours",
            freelancer: "Moussa Ba",
            completedDate: null,
            rating: null
        },
        {
            id: 4,
            title: "Audit sécurité informatique",
            category: "Conseil",
            budget: "275 000 FCFA",
            status: "En cours",
            freelancer: "Khadija Benali",
            completedDate: null,
            rating: null
        }
    ];

    const reviews = [
        {
            id: 1,
            freelanceName: "Amadou Diallo",
            freelanceTitle: "Développeur Full-Stack",
            rating: 5,
            date: "Il y a 2 semaines",
            comment: "Client très professionnel avec des exigences claires. Paiement rapide et communication excellente. Je recommande !",
            projectTitle: "Application mobile e-commerce"
        },
        {
            id: 2,
            freelanceName: "Fatou Sow",
            freelanceTitle: "Designer UI/UX",
            rating: 5,
            date: "Il y a 1 mois",
            comment: "Projet très intéressant avec une équipe à l'écoute. Brief détaillé et feedback constructif. Parfait !",
            projectTitle: "Refonte site web corporate"
        },
        {
            id: 3,
            freelanceName: "Omar Sy",
            freelanceTitle: "Développeur Backend",
            rating: 4,
            date: "Il y a 3 mois",
            comment: "Bon client, quelques ajustements en cours de route mais collaboration fluide. Recommandé.",
            projectTitle: "API de gestion des stocks"
        }
    ];

    const stats = [
        { label: "Projets terminés", value: clientData.totalProjects - clientData.activeProjects, color: "bg-green-500" },
        { label: "Projets actifs", value: clientData.activeProjects, color: "bg-blue-500" },
        { label: "Budget total dépensé", value: clientData.totalBudgetSpent, color: "bg-purple-500" },
        { label: "Note moyenne", value: `${clientData.rating}/5`, color: "bg-yellow-500" }
    ];

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-slate-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Terminé": return "bg-green-100 text-green-800";
            case "En cours": return "bg-blue-100 text-blue-800";
            case "En attente": return "bg-yellow-100 text-yellow-800";
            default: return "bg-slate-100 text-slate-800";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header avec navigation */}
            <div className="bg-white shadow-sm">
                <div className="px-4 md:px-16 lg:px-24 xl:px-32 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>Clients</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-orange-600 font-medium">{clientData.name}</span>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne principale */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profil principal */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-24 bg-slate-200 rounded-lg flex items-center justify-center">
                                        <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                                                    {clientData.name}
                                                </h1>
                                                {clientData.paymentVerified && (
                                                    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        Vérifié
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-lg text-orange-600 font-medium mb-2">
                                                {clientData.sector}
                                            </p>
                                            <div className="flex items-center gap-2 text-slate-600 mb-4">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>{clientData.location}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-3">
                                            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                                                Envoyer un message
                                            </button>
                                            <button className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                                                Voir les missions
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="flex">{renderStars(Math.floor(clientData.rating))}</div>
                                            <span className="font-medium text-slate-800">{clientData.rating}</span>
                                            <span className="text-slate-600">({clientData.totalReviews} avis)</span>
                                        </div>
                                        <div className="text-slate-600">
                                            Membre depuis {clientData.memberSince}
                                        </div>
                                    </div>
                                    
                                    <p className="text-slate-700 leading-relaxed">
                                        {clientData.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Statistiques */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-600">{stat.label}</p>
                                            <p className="font-semibold text-slate-800">{stat.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Historique des projets */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6">Historique des projets</h2>
                            <div className="space-y-4">
                                {projectHistory.map((project) => (
                                    <div key={project.id} className="border border-slate-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-medium text-slate-800">{project.title}</h3>
                                                <p className="text-sm text-slate-600">{project.category}</p>
                                                <p className="text-sm text-slate-600">Freelance: {project.freelancer}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                                    {project.status}
                                                </span>
                                                <p className="text-sm font-medium text-green-600 mt-1">{project.budget}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-600">
                                                {project.completedDate ? `Terminé le ${project.completedDate}` : 'En cours'}
                                            </span>
                                            {project.rating && (
                                                <div className="flex items-center gap-1">
                                                    <div className="flex">{renderStars(project.rating)}</div>
                                                    <span className="text-slate-600">({project.rating}/5)</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Avis des freelances */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6">Avis des freelances</h2>
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="border-b border-slate-200 last:border-b-0 pb-6 last:pb-0">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-medium">
                                                {review.freelanceName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <h4 className="font-medium text-slate-800">{review.freelanceName}</h4>
                                                        <p className="text-sm text-slate-600">{review.freelanceTitle}</p>
                                                        <p className="text-xs text-slate-500">Projet: {review.projectTitle}</p>
                                                    </div>
                                                    <span className="text-sm text-slate-500">{review.date}</span>
                                                </div>
                                                <div className="flex mb-3">{renderStars(review.rating)}</div>
                                                <p className="text-slate-700">{review.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Informations rapides */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h3 className="font-semibold text-slate-800 mb-4">Informations</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-sm text-slate-600">Type</span>
                                    <p className="font-medium text-slate-800">{clientData.type}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-600">Taille de l&apos;équipe</span>
                                    <p className="font-medium text-slate-800">{clientData.teamSize}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-600">Fondée en</span>
                                    <p className="font-medium text-slate-800">{clientData.foundedYear}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-600">Temps de réponse</span>
                                    <p className="font-medium text-slate-800">{clientData.responseTime}</p>
                                </div>
                                {clientData.website && (
                                    <div>
                                        <span className="text-sm text-slate-600">Site web</span>
                                        <a 
                                            href={clientData.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block font-medium text-orange-600 hover:text-orange-700"
                                        >
                                            Visiter le site
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Badge de confiance */}
                        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
                            <div className="flex items-center gap-3 mb-3">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h4 className="font-semibold">Client Vérifié</h4>
                                    <p className="text-sm text-green-100">Paiements sécurisés</p>
                                </div>
                            </div>
                            <p className="text-sm text-green-100">
                                Ce client a un historique de paiements fiables et respecte ses engagements.
                            </p>
                        </div>

                        {/* Contact rapide */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h3 className="font-semibold text-slate-800 mb-4">Contact</h3>
                            <div className="space-y-3">
                                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                                    Envoyer un message
                                </button>
                                <button className="w-full border border-orange-600 text-orange-600 py-2 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                                    Voir les missions actives
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;
