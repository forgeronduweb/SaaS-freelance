"use client";
import React, { useState } from "react";

const Pricing = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    
    const plans = [
        {
            name: "Gratuit",
            price: "0",
            period: "FCFA",
            description: "Parfait pour commencer sur AfriLance",
            features: [
                "Création de profil freelance",
                "Candidature à 5 missions/mois",
                "Commission 10% par mission",
                "Support communautaire",
                "Paiement Mobile Money",
                "Portfolio basique"
            ],
            cta: "Commencer gratuitement",
            popular: false,
            buttonStyle: "border border-orange-300 hover:bg-orange-50 text-orange-700"
        },
        {
            name: "Freelance Premium",
            priceMonthly: "5 000",
            priceAnnual: "50 000",
            description: "Pour freelances sérieux qui veulent plus de clients",
            features: [
                "Visibilité prioritaire dans les recherches",
                "Badge \"Vérifié\" (génère plus de confiance)",
                "Candidatures illimitées",
                "Portfolio complet (projets illimités)",
                "Accès aux missions Premium",
                "Support prioritaire 24/7"
            ],
            cta: "Passer au Premium",
            popular: true,
            buttonStyle: "bg-orange-600 hover:bg-orange-700 text-white"
        },
        {
            name: "Entreprise",
            priceMonthly: "25 000",
            priceAnnual: "250 000",
            description: "Solution complète pour entreprises",
            features: [
                "Publication illimitée de missions",
                "Accès prioritaire aux freelances vérifiés",
                "Gestion multi-utilisateurs",
                "Outils avancés de gestion de projets",
                "Support client prioritaire (email + WhatsApp pro)",
                "Statistiques détaillées",
                ...(isAnnual ? [
                    "2 mois offerts (économie)",
                    "Badge \"Entreprise Premium\" visible",
                    "Partenariats avec AfriLance",
                    "Historique complet 12 mois"
                ] : [])
            ],
            cta: "Choisir Entreprise",
            popular: false,
            buttonStyle: "border border-orange-300 hover:bg-orange-50 text-orange-700"
        }
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="px-4 md:px-16 lg:px-24 xl:px-32">
                <div className="text-center mb-16">
                    <p className="text-base font-medium text-orange-600 mb-2">Tarifs</p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4">
                        Choisissez votre plan
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
                        Du plan gratuit aux solutions entreprise, trouvez l'offre qui correspond à vos besoins sur AfriLance.
                    </p>
                    
                    {/* Toggle Mensuel/Annuel */}
                    <div className="flex items-center justify-center mb-8">
                        <span className={`mr-3 ${!isAnnual ? 'text-orange-600 font-medium' : 'text-slate-600'}`}>Mensuel</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                                isAnnual ? 'bg-orange-600' : 'bg-slate-300'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                        <span className={`ml-3 ${isAnnual ? 'text-orange-600 font-medium' : 'text-slate-600'}`}>Annuel</span>
                        <span className={`ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium transition-opacity ${
                            isAnnual ? 'opacity-100' : 'opacity-0'
                        }`}>
                            2 mois offerts
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div 
                            key={index} 
                            className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl flex flex-col ${
                                plan.popular 
                                    ? 'border-orange-500' 
                                    : 'border-slate-200 hover:border-orange-300'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                                        Le plus populaire
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-semibold text-slate-800 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center mb-2 h-16">
                                    {plan.name === "Gratuit" ? (
                                        <>
                                            <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                                            <span className="text-slate-600 ml-1">{plan.period}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-4xl font-bold text-slate-800">
                                                {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                                            </span>
                                            <span className="text-slate-600 ml-1">
                                                FCFA{isAnnual ? '/an' : '/mois'}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p className="text-slate-600">{plan.description}</p>
                            </div>

                            <div className="h-[380px] overflow-hidden flex-grow">
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className={`w-full px-8 py-3 rounded-full font-medium transition-colors mt-auto ${plan.buttonStyle}`}>
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-semibold mb-4">
                            Prêt à développer votre entreprise ?
                        </h3>
                        <p className="mb-6 max-w-2xl mx-auto">
                            Rejoignez les entreprises qui font confiance à AfriLance pour leurs projets avec des freelances qualifiés.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-white hover:bg-orange-50 text-orange-600 px-8 py-3 rounded-full font-medium transition-colors">
                                Essai gratuit 7 jours
                            </button>
                            <button className="border-2 border-white hover:bg-white hover:text-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
                                Contacter l'équipe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
