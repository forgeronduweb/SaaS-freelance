"use client";
import React from "react";
import Link from "next/link";
import FreelanceCard from "./FreelanceCard";
import AppLayout from '@/components/layout/AppLayout';

const FreelanceList = () => {
    const [filters, setFilters] = React.useState({
        category: "",
        minBudget: "",
        maxBudget: "",
        country: "",
        availability: ""
    });

    const [searchTerm, setSearchTerm] = React.useState("");

    // Données mockées - à remplacer par des données réelles via API
    const freelances = [
        {
            id: "1",
            name: "Amadou Diallo",
            title: "Développeur Full-Stack",
            skills: ["React.js", "Node.js", "MongoDB", "JavaScript", "TypeScript"],
            rating: 4.9,
            totalReviews: 47,
            hourlyRate: "15 000 FCFA",
            availability: "Disponible immédiatement",
            location: "Dakar, Sénégal",
            completedProjects: 89,
            category: "Développement"
        },
        {
            id: "2",
            name: "Fatou Sow",
            title: "Designer UI/UX",
            skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
            rating: 4.8,
            totalReviews: 32,
            hourlyRate: "12 000 FCFA",
            availability: "Disponible dans 1 semaine",
            location: "Abidjan, Côte d'Ivoire",
            completedProjects: 56,
            category: "Design"
        },
        {
            id: "3",
            name: "Moussa Ba",
            title: "Spécialiste Marketing Digital",
            skills: ["SEO", "Google Ads", "Facebook Ads", "Analytics"],
            rating: 4.7,
            totalReviews: 28,
            hourlyRate: "10 000 FCFA",
            availability: "Disponible immédiatement",
            location: "Casablanca, Maroc",
            completedProjects: 43,
            category: "Marketing"
        },
        {
            id: "4",
            name: "Aïcha Ndiaye",
            title: "Rédactrice Web",
            skills: ["Rédaction", "SEO", "Content Marketing", "Copywriting"],
            rating: 4.9,
            totalReviews: 51,
            hourlyRate: "8 000 FCFA",
            availability: "Disponible immédiatement",
            location: "Tunis, Tunisie",
            completedProjects: 78,
            category: "Rédaction"
        },
        {
            id: "5",
            name: "Ousmane Traoré",
            title: "Développeur Mobile",
            skills: ["React Native", "Flutter", "iOS", "Android"],
            rating: 4.6,
            totalReviews: 19,
            hourlyRate: "18 000 FCFA",
            availability: "Disponible dans 2 semaines",
            location: "Bamako, Mali",
            completedProjects: 34,
            category: "Développement"
        },
        {
            id: "6",
            name: "Khadija Benali",
            title: "Consultante Business",
            skills: ["Stratégie", "Business Plan", "Finance", "Management"],
            rating: 4.8,
            totalReviews: 25,
            hourlyRate: "20 000 FCFA",
            availability: "Disponible immédiatement",
            location: "Rabat, Maroc",
            completedProjects: 41,
            category: "Conseil"
        }
    ];

    const categories = ["Développement", "Design", "Marketing", "Rédaction", "Conseil", "Traduction"];
    const countries = ["Sénégal", "Côte d'Ivoire", "Maroc", "Tunisie", "Mali", "Burkina Faso"];
    const availabilities = ["Disponible immédiatement", "Disponible dans 1 semaine", "Disponible dans 2 semaines"];

    const filteredFreelances = freelances.filter(freelance => {
        const matchesSearch = freelance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            freelance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            freelance.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = !filters.category || freelance.category === filters.category;
        const matchesCountry = !filters.country || freelance.location.includes(filters.country);
        const matchesAvailability = !filters.availability || freelance.availability === filters.availability;

        return matchesSearch && matchesCategory && matchesCountry && matchesAvailability;
    });

    return (
        <AppLayout userType="client" pageTitle="Freelances Disponibles" pageDescription="Trouvez le freelance parfait pour votre projet">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Freelances Disponibles</h1>
                <p className="text-slate-600">Trouvez le freelance parfait pour votre projet</p>
            </div>

            <div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filtres */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-20">
                            <h2 className="text-lg font-semibold text-slate-800 mb-6">Filtres</h2>
                            
                            {/* Recherche */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Rechercher
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nom, compétence..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>

                            {/* Catégorie */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Catégorie
                                </label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">Toutes les catégories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Pays */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Pays
                                </label>
                                <select
                                    value={filters.country}
                                    onChange={(e) => setFilters({...filters, country: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">Tous les pays</option>
                                    {countries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Disponibilité */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Disponibilité
                                </label>
                                <select
                                    value={filters.availability}
                                    onChange={(e) => setFilters({...filters, availability: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">Toute disponibilité</option>
                                    {availabilities.map(availability => (
                                        <option key={availability} value={availability}>{availability}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Budget */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Budget horaire (FCFA)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minBudget}
                                        onChange={(e) => setFilters({...filters, minBudget: e.target.value})}
                                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxBudget}
                                        onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
                                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>
                            </div>

                            {/* Reset */}
                            <button
                                onClick={() => {
                                    setFilters({category: "", minBudget: "", maxBudget: "", country: "", availability: ""});
                                    setSearchTerm("");
                                }}
                                className="w-full text-orange-600 hover:text-orange-700 font-medium"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    </div>

                    {/* Liste des freelances */}
                    <div className="lg:col-span-3">
                        {/* Header résultats */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">
                                    {filteredFreelances.length} freelance{filteredFreelances.length > 1 ? 's' : ''} trouvé{filteredFreelances.length > 1 ? 's' : ''}
                                </h3>
                                <p className="text-slate-600">
                                    Triés par pertinence
                                </p>
                            </div>
                            
                            <select className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                <option>Trier par pertinence</option>
                                <option>Note la plus élevée</option>
                                <option>Prix croissant</option>
                                <option>Prix décroissant</option>
                                <option>Plus récent</option>
                            </select>
                        </div>

                        {/* Grille des freelances */}
                        {filteredFreelances.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredFreelances.map(freelance => (
                                    <FreelanceCard key={freelance.id} freelance={freelance} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h3 className="text-lg font-medium text-slate-800 mb-2">Aucun freelance trouvé</h3>
                                <p className="text-slate-600 mb-4">Essayez de modifier vos critères de recherche</p>
                                <button
                                    onClick={() => {
                                        setFilters({category: "", minBudget: "", maxBudget: "", country: "", availability: ""});
                                        setSearchTerm("");
                                    }}
                                    className="text-orange-600 hover:text-orange-700 font-medium"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredFreelances.length > 0 && (
                            <div className="flex items-center justify-center mt-12 gap-2">
                                <button className="px-3 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
                                    Précédent
                                </button>
                                <button className="px-3 py-2 bg-orange-600 text-white rounded-lg">1</button>
                                <button className="px-3 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">2</button>
                                <button className="px-3 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">3</button>
                                <button className="px-3 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
                                    Suivant
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default FreelanceList;
