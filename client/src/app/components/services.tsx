"use client";
import React from "react";

const Services = () => {
    const services = [
        {
            icon: (
                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Développement Web & Mobile",
            description: "Création de sites web vitrines et e-commerce. Applications mobiles (Android / iOS). Développement d'API et intégration de systèmes.",
            features: [
                "Sites web vitrines et e-commerce",
                "Applications mobiles (Android / iOS)",
                "Développement d'API et intégration",
                "Maintenance et optimisation"
            ]
        },
        {
            icon: (
                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
            ),
            title: "Design Graphique",
            description: "Logos et chartes graphiques pour entreprises. Flyers, affiches et supports marketing. UI/UX design pour apps et sites web.",
            features: [
                "Logos et chartes graphiques",
                "Flyers et supports marketing",
                "UI/UX design",
                "Illustrations et animations"
            ]
        },
        {
            icon: (
                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            title: "Rédaction & Traduction",
            description: "Rédaction d'articles, blogs et contenu SEO. Création de contenus marketing pour réseaux sociaux. Traduction multilingue.",
            features: [
                "Articles, blogs et contenu SEO",
                "Contenus marketing réseaux sociaux",
                "Traduction (français ↔ anglais)",
                "Relecture et correction"
            ]
        },
        {
            icon: (
                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            title: "Marketing Digital",
            description: "Gestion des campagnes publicitaires (Facebook, Google Ads). Community management et réseaux sociaux. SEO et email marketing.",
            features: [
                "Campagnes publicitaires",
                "Community management",
                "SEO / optimisation",
                "Email marketing et newsletters"
            ]
        },
    ];

    return (
        <section id="services" className="py-16 bg-slate-900">
            <div className="max-w-7xl mx-auto px-2 md:px-3 lg:px-4 xl:px-5">
                <div className="text-center mb-16">
                    <p className="text-base font-medium text-orange-600 mb-2">Services</p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        Services proposés sur AfriLance
                    </h2>
                    <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                        Découvrez la diversité des compétences disponibles sur notre plateforme, adaptées aux besoins du marché africain et international.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                    {services.map((service, index) => (
                        <div key={index} className="bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-orange-500">
                            {/* Icône - Plus grande sur mobile */}
                            <div className="flex items-center justify-center w-20 h-20 md:w-16 md:h-16 bg-orange-600/20 rounded-xl mb-6 mx-auto">
                                <div className="scale-125 md:scale-100">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Titre - Centré sur mobile */}
                            <h3 className="text-xl font-semibold text-white mb-4 text-center md:text-left">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Liste des fonctionnalités */}
                            <ul className="space-y-2 mb-6">
                                {service.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start">
                                        <svg className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm text-slate-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 text-white shadow-2xl">
                        <h3 className="text-2xl font-semibold mb-4">
                            Prêt à proposer tes services ?
                        </h3>
                        <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                            Rejoins des milliers de freelances africains qui développent leur activité sur AfriLance. Inscription gratuite et immédiate.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-white hover:bg-orange-50 text-orange-600 px-8 py-3 rounded-full font-medium transition-colors shadow-lg">
                                Créer mon profil freelance
                            </button>
                            <button className="border-2 border-white hover:bg-white hover:text-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
                                Publier une mission
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
