"use client";
import React from "react";

const HowItWorks = () => {
    const [activeTab, setActiveTab] = React.useState<'freelances' | 'clients'>('freelances');

    const freelanceSteps = [
        {
            number: "01",
            title: "Crée ton profil",
            description: "Ajoute tes compétences, portfolio et fixe ton tarif.",
            icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            number: "02",
            title: "Trouve une mission",
            description: "Parcours les offres publiées et postule en quelques clics.",
            icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            )
        },
        {
            number: "03",
            title: "Travaille et livre",
            description: "Collabore directement avec le client sur la plateforme.",
            icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            number: "04",
            title: "Sois payé en toute sécurité",
            description: "Ton paiement est garanti via Mobile Money, banque ou carte.",
            icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            )
        }
    ];

    const clientSteps = [
        {
            number: "01",
            title: "Publie ta mission",
            description: "Décris ton besoin, fixe un budget et un délai.",
            icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            )
        },
        {
            number: "02",
            title: "Choix du freelance",
            description: "Consulte les profils, avis, portfolio et discute via la messagerie intégrée. Sélectionne le freelance pour ta mission.",
            icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            number: "03",
            title: "Dépôt sécurisé (escrow)",
            description: "Dépose le montant sur la plateforme. L'argent est bloqué sur le compte AfriLance jusqu'à validation.",
            icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        },
        {
            number: "04",
            title: "Validation et paiement",
            description: "Suis l'avancement, échange des fichiers. Une fois satisfait, valide la mission et l'argent est débloqué automatiquement.",
            icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    const currentSteps = activeTab === 'freelances' ? freelanceSteps : clientSteps;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-base font-medium text-orange-600 mb-2">Processus</p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4">
                        Comment ça marche ?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Découvrez comment AfriLance simplifie la collaboration entre freelances et clients en 4 étapes simples.
                    </p>
                </div>

                {/* Tabs Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="bg-slate-100 p-1 rounded-lg w-full max-w-md sm:w-auto">
                        <button
                            onClick={() => setActiveTab('freelances')}
                            className={`w-1/2 sm:w-auto px-3 sm:px-6 py-3 rounded-md font-medium text-sm sm:text-base transition-all duration-200 ${
                                activeTab === 'freelances'
                                    ? 'bg-orange-600 text-white shadow-sm'
                                    : 'text-slate-600 hover:text-slate-800'
                            }`}
                        >
                            <span className="hidden sm:inline">Pour les </span>Freelances
                        </button>
                        <button
                            onClick={() => setActiveTab('clients')}
                            className={`w-1/2 sm:w-auto px-3 sm:px-6 py-3 rounded-md font-medium text-sm sm:text-base transition-all duration-200 ${
                                activeTab === 'clients'
                                    ? 'bg-orange-600 text-white shadow-sm'
                                    : 'text-slate-600 hover:text-slate-800'
                            }`}
                        >
                            <span className="hidden sm:inline">Pour les </span>Clients
                        </button>
                    </div>
                </div>

                <div className="relative min-h-[280px]">
                    {/* Ligne de connexion pour desktop */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                        {currentSteps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Connecteur vertical pour mobile/tablet */}
                                {index < currentSteps.length - 1 && (
                                    <div className="lg:hidden absolute left-1/2 top-32 w-0.5 h-16 bg-orange-200 transform -translate-x-1/2"></div>
                                )}
                                
                                <div className="flex flex-col items-center text-center relative z-10">
                                    {/* Numéro et icône */}
                                    <div className="relative mb-6">
                                        <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                                            {step.number}
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                                            {step.icon}
                                        </div>
                                    </div>
                                    
                                    {/* Contenu */}
                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold text-slate-800 mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8">
                        <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                            Prêt à commencer ?
                        </h3>
                        <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                            Rejoignez des milliers de freelances africains qui font confiance à AfriLance pour développer leur activité.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
                                Je suis Freelance
                            </button>
                            <button className="border border-orange-300 hover:bg-orange-50 text-orange-700 px-8 py-3 rounded-full font-medium transition-colors">
                                Je cherche un Freelance
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
