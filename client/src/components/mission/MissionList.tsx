"use client";
import React from "react";
import AppLayout from "../layout/AppLayout";
import ApplicationForm from "../forms/ApplicationForm";

interface Mission {
    id: string;
    title: string;
    description: string;
    client: string;
    clientLogo: string | null;
    budget: string;
    budgetType: string;
    category: string;
    skills: string[];
    deadline: string;
    status: string;
    urgency: string;
    proposals: number;
    postedDate: string;
    clientRating: number;
    clientReviews: number;
}

import Link from 'next/link';

const MissionList = () => {
    const [filters, setFilters] = React.useState({
        category: "",
        minBudget: "",
        maxBudget: "",
        status: "",
        deadline: ""
    });

    const [searchTerm, setSearchTerm] = React.useState("");
    const [showApplicationForm, setShowApplicationForm] = React.useState(false);
    const [selectedMission, setSelectedMission] = React.useState<Mission | null>(null);
    const [missions, setMissions] = React.useState<Mission[]>([]);
    const [loading, setLoading] = React.useState(true);

    // Récupérer les missions depuis l'API
    React.useEffect(() => {
        fetchMissions();
        
        // Actualiser les missions toutes les 3 minutes pour réduire la charge
        const interval = setInterval(fetchMissions, 180000);
        
        return () => clearInterval(interval);
    }, []);

    const fetchMissions = async () => {
        try {
            if (missions.length === 0) {
                setLoading(true);
            }
            
            const token = localStorage.getItem('token');
            const response = await fetch('/api/missions?status=OPEN', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Missions récupérées pour la page missions:', data);
                
                // Transformer les données API en format attendu par le composant
                const transformedMissions = data.data?.missions?.map((mission: any) => ({
                    id: mission.id,
                    title: String(mission.title),
                    description: String(mission.description),
                    client: String(mission.client?.companyName || mission.client?.fullName || 'Client'),
                    clientLogo: mission.client?.companyLogo || null,
                    budget: `${Number(mission.budget)?.toLocaleString()} FCFA`,
                    budgetType: 'Forfait',
                    category: String(mission.category),
                    skills: Array.isArray(mission.skills) ? mission.skills : [],
                    deadline: new Date(String(mission.deadline)).toLocaleDateString('fr-FR'),
                    status: mission.status === 'OPEN' ? 'Ouvert' : mission.status === 'IN_PROGRESS' ? 'En cours' : 'Terminé',
                    urgency: mission.isUrgent ? 'Urgent' : 'Normal',
                    proposals: Number(mission._count?.applications) || 0,
                    postedDate: `Il y a ${Math.floor((Date.now() - new Date(String(mission.createdAt)).getTime()) / (1000 * 60 * 60 * 24))} jour${Math.floor((Date.now() - new Date(String(mission.createdAt)).getTime()) / (1000 * 60 * 60 * 24)) > 1 ? 's' : ''}`,
                    clientRating: Number(mission.client?.rating) || 4.5,
                    clientReviews: Number(mission.client?.totalReviews) || 0,
                })) || [];
                
                // Trier par date de création (plus récent en premier)
                transformedMissions.sort((a: any, b: any) => {
                    const dateA = new Date(data.data?.missions?.find((m: Record<string, unknown>) => m.id === a.id)?.createdAt || 0);
                    const dateB = new Date(data.data?.missions?.find((m: Record<string, unknown>) => m.id === b.id)?.createdAt || 0);
                    return dateB.getTime() - dateA.getTime();
                });
                
                setMissions(transformedMissions);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des missions:', error);
        } finally {
            setLoading(false);
        }
    };

    // Données mockées de fallback (gardées pour compatibilité)
    
    const categories = ["Développement Web", "Développement Mobile", "Design", "Marketing", "Rédaction", "Conseil IT", "Traduction"];
    const statuses = ["Ouvert", "En cours", "Terminé"];

    const filteredMissions = missions.filter(mission => {
        const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            mission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            mission.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = !filters.category || mission.category === filters.category;
        const matchesStatus = !filters.status || mission.status === filters.status;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Ouvert": return "bg-green-100 text-green-800";
            case "En cours": return "bg-blue-100 text-blue-800";
            case "Terminé": return "bg-slate-100 text-slate-800";
            default: return "bg-slate-100 text-slate-800";
        }
    };

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case "Urgent": return "bg-red-100 text-red-800";
            case "Normal": return "bg-slate-100 text-slate-600";
            default: return "bg-slate-100 text-slate-600";
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-slate-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    const handleApplyClick = (mission: Mission) => {
        setSelectedMission(mission);
        setShowApplicationForm(true);
    };

    return (
        <AppLayout userType="freelance" pageTitle="Missions Disponibles" pageDescription="Trouvez la mission parfaite pour vos compétences">
            <div className="mb-4 lg:mb-6">
                <h1 className="text-xl lg:text-3xl font-bold text-slate-800 mb-2">Missions Disponibles</h1>
                <p className="text-sm lg:text-base text-slate-600">Trouvez la mission parfaite pour vos compétences</p>
            </div>

            <div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
                    {/* Filtres */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 lg:p-6 lg:sticky lg:top-20">
                            <h2 className="text-base lg:text-lg font-semibold text-slate-800 mb-4 lg:mb-6">Filtres</h2>
                            
                            {/* Recherche */}
                            <div className="mb-4 lg:mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Rechercher
                                </label>
                                <input
                                    type="text"
                                    placeholder="Titre, compétence..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                />
                            </div>

                            {/* Catégorie */}
                            <div className="mb-4 lg:mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Catégorie
                                </label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                >
                                    <option value="">Toutes les catégories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Statut */}
                            <div className="mb-4 lg:mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Statut
                                </label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                >
                                    <option value="">Tous les statuts</option>
                                    {statuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Budget */}
                            <div className="mb-4 lg:mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Budget (FCFA)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minBudget}
                                        onChange={(e) => setFilters({...filters, minBudget: e.target.value})}
                                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxBudget}
                                        onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
                                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Reset */}
                            <button
                                onClick={() => {
                                    setFilters({category: "", minBudget: "", maxBudget: "", status: "", deadline: ""});
                                    setSearchTerm("");
                                }}
                                className="w-full text-orange-600 hover:text-orange-700 font-medium"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    </div>

                    {/* Liste des missions */}
                    <div className="lg:col-span-3">
                        {/* Header résultats */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-3">
                            <div>
                                <h3 className="text-base lg:text-lg font-semibold text-slate-800">
                                    {filteredMissions.length} mission{filteredMissions.length > 1 ? 's' : ''} trouvée{filteredMissions.length > 1 ? 's' : ''}
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Triées par pertinence
                                </p>
                            </div>
                            
                            <select className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm">
                                <option>Trier par pertinence</option>
                                <option>Plus récent</option>
                                <option>Budget croissant</option>
                                <option>Budget décroissant</option>
                                <option>Échéance proche</option>
                            </select>
                        </div>

                        {/* Liste des missions */}
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                            </div>
                        ) : filteredMissions.length > 0 ? (
                            <div className="space-y-4 lg:space-y-6">
                                {filteredMissions.map(mission => (
                                    <div key={mission.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 lg:p-6 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 gap-3">
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                                    <h3 className="text-lg lg:text-xl font-semibold text-slate-800 hover:text-orange-600 cursor-pointer">
                                                        {mission.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                                                            {mission.status}
                                                        </span>
                                                        {mission.urgency === "Urgent" && (
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(mission.urgency)}`}>
                                                                {mission.urgency}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-3 text-sm text-slate-600">
                                                    <span className="font-medium text-orange-600">{mission.category}</span>
                                                    <span className="hidden sm:inline">â€¢</span>
                                                    <span>{mission.postedDate}</span>
                                                    <span className="hidden sm:inline">â€¢</span>
                                                    <span>{mission.proposals} proposition{mission.proposals > 1 ? 's' : ''}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="text-left lg:text-right">
                                                <p className="text-xl lg:text-2xl font-bold text-green-600">{mission.budget}</p>
                                                <p className="text-sm text-slate-600">{mission.budgetType}</p>
                                                <p className="text-sm text-slate-600">Délai: {mission.deadline}</p>
                                            </div>
                                        </div>

                                        <p className="text-slate-700 mb-4 leading-relaxed">
                                            {mission.description}
                                        </p>

                                        {/* Compétences requises */}
                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-2">
                                                {mission.skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Informations client */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-slate-600 font-medium text-xs lg:text-sm">
                                                        {mission.client.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-medium text-slate-800 text-sm lg:text-base truncate">{mission.client}</h4>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex">{renderStars(Math.floor(mission.clientRating))}</div>
                                                        <span className="text-xs lg:text-sm text-slate-600">
                                                            {mission.clientRating} ({mission.clientReviews} avis)
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                                                <Link href={`/missions/${mission.id}`}>
                                                    <button className="w-full sm:w-auto border border-orange-600 text-orange-600 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors">
                                                        Voir détails
                                                    </button>
                                                </Link>
                                                {mission.status === "Ouvert" && (
                                                    <button 
                                                        onClick={() => handleApplyClick(mission)}
                                                        className="w-full sm:w-auto bg-orange-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                                                    >
                                                        Postuler
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h3 className="text-lg font-medium text-slate-800 mb-2">Aucune mission trouvée</h3>
                                <p className="text-slate-600 mb-4">Essayez de modifier vos critères de recherche</p>
                                <button
                                    onClick={() => {
                                        setFilters({category: "", minBudget: "", maxBudget: "", status: "", deadline: ""});
                                        setSearchTerm("");
                                    }}
                                    className="text-orange-600 hover:text-orange-700 font-medium"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Modal de candidature */}
            {showApplicationForm && selectedMission && (
                <ApplicationForm
                    missionId={selectedMission.id}
                    missionTitle={selectedMission.title}
                    clientName={selectedMission.client}
                    onClose={() => {
                        setShowApplicationForm(false);
                        setSelectedMission(null);
                    }}
                />
            )}
        </AppLayout>
    );
};

export default MissionList;

