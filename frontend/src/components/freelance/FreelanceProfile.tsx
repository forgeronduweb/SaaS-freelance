"use client";
import React from "react";
import AppLayout from "../layout/AppLayout";
import ContactForm from '@/components/forms/ContactForm';

interface FreelanceProfileProps {
    freelanceId?: string;
}

const FreelanceProfile = () => {
    const [showContactForm, setShowContactForm] = React.useState(false);
    
    // Données mockées - à remplacer par des données réelles via API
    const freelanceData = {
        id: "1",
        name: "Amadou Diallo",
        title: "Développeur Full-Stack",
        avatar: "/api/placeholder/150/150",
        bio: "Développeur passionné avec 5 ans d'expérience dans la création d'applications web modernes. Spécialisé en React, Node.js et bases de données. J'accompagne les entreprises africaines dans leur transformation digitale.",
        location: "Dakar, Sénégal",
        hourlyRate: "15 000 FCFA",
        dailyRate: "75 000 FCFA",
        availability: "Disponible immédiatement",
        rating: 4.9,
        totalReviews: 47,
        completedProjects: 89,
        responseTime: "< 2h",
        skills: [
            "React.js", "Node.js", "JavaScript", "TypeScript", "MongoDB", 
            "PostgreSQL", "Next.js", "Express.js", "Tailwind CSS", "Git"
        ],
        languages: [
            { name: "Français", level: "Natif" },
            { name: "Anglais", level: "Courant" },
            { name: "Wolof", level: "Natif" }
        ],
        certifications: [
            "AWS Certified Developer",
            "Google Analytics Certified",
            "Meta React Developer"
        ]
    };

    const portfolio = [
        {
            id: 1,
            title: "E-commerce Boutique Mode",
            client: "Fashion Store Dakar",
            description: "Développement complet d'une plateforme e-commerce avec paiement mobile money intégré",
            image: "/api/placeholder/400/250",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            link: "https://example.com"
        },
        {
            id: 2,
            title: "Application de Gestion RH",
            client: "Entreprise Tech SA",
            description: "Application web pour la gestion des employés, congés et paie",
            image: "/api/placeholder/400/250",
            technologies: ["Next.js", "PostgreSQL", "Prisma"],
            link: "https://example.com"
        },
        {
            id: 3,
            title: "Site Vitrine Restaurant",
            client: "Restaurant Le Baobab",
            description: "Site web responsive avec système de réservation en ligne",
            image: "/api/placeholder/400/250",
            technologies: ["React", "Firebase", "Tailwind"],
            link: "https://example.com"
        }
    ];

    const reviews = [
        {
            id: 1,
            clientName: "Fatou Sow",
            clientTitle: "CEO, Fashion Store",
            rating: 5,
            date: "Il y a 2 semaines",
            comment: "Excellent travail ! Amadou a livré le projet en avance et la qualité est exceptionnelle. Communication parfaite tout au long du projet."
        },
        {
            id: 2,
            clientName: "Moussa Ba",
            clientTitle: "Directeur IT, Tech SA",
            rating: 5,
            date: "Il y a 1 mois",
            comment: "Développeur très compétent et professionnel. L'application répond parfaitement à nos besoins. Je recommande vivement."
        },
        {
            id: 3,
            clientName: "Aïcha Ndiaye",
            clientTitle: "Propriétaire, Restaurant Le Baobab",
            rating: 4,
            date: "Il y a 2 mois",
            comment: "Très satisfaite du résultat. Le site est moderne et nos réservations ont augmenté de 40%. Merci Amadou !"
        }
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

    return (
        <AppLayout 
            pageTitle={`Profil de ${freelanceData.name}`}
            pageDescription="Consultez le profil détaillé de ce freelance, ses compétences, son portfolio et les avis clients."
            userType="client"
        >
            <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne principale */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profil principal */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 bg-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                        {freelanceData.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                        <div>
                                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                                                {freelanceData.name}
                                            </h1>
                                            <p className="text-xl text-orange-600 font-medium mb-2">
                                                {freelanceData.title}
                                            </p>
                                            <div className="flex items-center gap-2 text-slate-600 mb-4">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>{freelanceData.location}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-3">
                                            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                                                Engager ce freelance
                                            </button>
                                            <button 
                                                onClick={() => setShowContactForm(true)}
                                                className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                                            >
                                                Envoyer un message
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="flex">{renderStars(Math.floor(freelanceData.rating))}</div>
                                            <span className="font-medium text-slate-800">{freelanceData.rating}</span>
                                            <span className="text-slate-600">({freelanceData.totalReviews} avis)</span>
                                        </div>
                                        <div className="text-slate-600">
                                            {freelanceData.completedProjects} projets terminés
                                        </div>
                                    </div>
                                    
                                    <p className="text-slate-700 leading-relaxed">
                                        {freelanceData.bio}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Compétences */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4">Compétences</h2>
                            <div className="flex flex-wrap gap-2">
                                {freelanceData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Portfolio */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6">Portfolio</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {portfolio.map((project) => (
                                    <div key={project.id} className="border border-slate-200 rounded-lg overflow-hidden">
                                        <div className="h-48 bg-slate-200 flex items-center justify-center">
                                            <span className="text-slate-500">Image du projet</span>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-slate-800 mb-2">{project.title}</h3>
                                            <p className="text-sm text-slate-600 mb-3">{project.description}</p>
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {project.technologies.map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-xs text-slate-500">Client: {project.client}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Avis clients */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6">Avis clients</h2>
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="border-b border-slate-200 last:border-b-0 pb-6 last:pb-0">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                                                <span className="text-slate-600 font-medium">
                                                    {review.clientName.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <h4 className="font-medium text-slate-800">{review.clientName}</h4>
                                                        <p className="text-sm text-slate-600">{review.clientTitle}</p>
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
                                    <span className="text-sm text-slate-600">Tarif horaire</span>
                                    <p className="font-medium text-slate-800">{freelanceData.hourlyRate}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-600">Tarif journalier</span>
                                    <p className="font-medium text-slate-800">{freelanceData.dailyRate}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-600">Disponibilité</span>
                                    <p className="font-medium text-green-600">{freelanceData.availability}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-600">Temps de réponse</span>
                                    <p className="font-medium text-slate-800">{freelanceData.responseTime}</p>
                                </div>
                            </div>
                        </div>

                        {/* Langues */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h3 className="font-semibold text-slate-800 mb-4">Langues</h3>
                            <div className="space-y-3">
                                {freelanceData.languages.map((language, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="text-slate-700">{language.name}</span>
                                        <span className="text-sm text-slate-600">{language.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h3 className="font-semibold text-slate-800 mb-4">Certifications</h3>
                            <div className="space-y-2">
                                {freelanceData.certifications.map((cert, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm text-slate-700">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de contact */}
            {showContactForm && (
                <ContactForm
                    recipientName={freelanceData.name}
                    recipientType="freelance"
                    recipientId={freelanceData.id}
                    onClose={() => setShowContactForm(false)}
                />
            )}
        </AppLayout>
    );
};

export default FreelanceProfile;
