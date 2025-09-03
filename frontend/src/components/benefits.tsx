"use client";
import React from "react";

const Benefits = () => {
    const benefits = [
        {
            icon: (
                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Paiements Sécurisés",
            description: "Système escrow avec Mobile Money (Orange, MTN, Wave) et cartes bancaires. Votre argent est protégé jusqu'à validation du travail."
        },
        {
            icon: (
                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Visibilité Locale",
            description: "Priorité aux freelances africains avec classement par pays. Meilleure visibilité face à la concurrence mondiale."
        },
        {
            icon: (
                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Arbitrage Humain",
            description: "Équipe de médiation rapide pour résoudre les conflits. Support personnalisé en français et anglais."
        },
        {
            icon: (
                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            title: "Formation Intégrée",
            description: "Modules de formation pour développer vos compétences. Accompagnement personnalisé pour réussir vos premières missions."
        }
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-base font-medium text-orange-600 mb-2">Avantages</p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4">
                        Pourquoi choisir AfriLance ?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        La première plateforme de freelancing pensée pour l'Afrique, avec des solutions adaptées aux défis locaux.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 p-3 bg-orange-50 rounded-full">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;