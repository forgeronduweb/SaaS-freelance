"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MentionsLegalesPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header simplifié pour contrat */}
            <header className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <Image 
                                src="/logo.png" 
                                alt="AfriLance Logo" 
                                width={40} 
                                height={40}
                                className="w-10 h-10"
                            />
                            <span className="text-2xl font-bold text-orange-600">AfriLance</span>
                        </Link>
                        <Link 
                            href="/" 
                            className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
                        >
                            ← Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white border border-gray-300 p-12">
                    {/* En-tête contractuel */}
                    <div className="text-center mb-12 pb-8 border-b border-gray-200">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            MENTIONS LÉGALES
                        </h1>
                        <div className="text-lg text-gray-700 space-y-2">
                            <p><strong>AfriLance</strong></p>
                            <p>Plateforme de mise en relation freelances-clients</p>
                            <p className="text-sm text-gray-500 mt-4">
                                Document légal - Version du {new Date().toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Informations légales</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Conformément aux lois en vigueur, voici les informations légales relatives à la plateforme :
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Identification de l'éditeur</h2>
                            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p><strong>Nom de la plateforme :</strong> AfriLance</p>
                                    </div>
                                    <div>
                                        <p><strong>Éditeur du site :</strong> [Ton nom / Société si enregistrée]</p>
                                    </div>
                                    <div>
                                        <p><strong>Responsable de publication :</strong> [Ton nom complet]</p>
                                    </div>
                                    <div>
                                        <p><strong>Adresse :</strong> [Ton adresse ou siège social de la société]</p>
                                    </div>
                                    <div>
                                        <p><strong>Email de contact :</strong> support@afrilance.com</p>
                                    </div>
                                    <div>
                                        <p><strong>Téléphone :</strong> [Ton numéro professionnel]</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Hébergement</h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p><strong>Hébergeur :</strong> [Nom de l'hébergeur du site, ex. Vercel, Render, OVH]</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Les informations détaillées de l'hébergeur sont disponibles sur demande.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Propriété intellectuelle</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 leading-relaxed">
                                    L'ensemble des contenus présents sur AfriLance (textes, logos, graphismes, icônes, illustrations, design) est protégé par le droit d'auteur.
                                </p>
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <p className="text-gray-700 font-medium">
                                        ⚠️ Toute reproduction, distribution ou exploitation, sans autorisation expresse, est interdite.
                                    </p>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Les marques, logos et signes distinctifs reproduits sur le site sont la propriété exclusive d'AfriLance ou font l'objet d'une autorisation d'usage.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Responsabilité</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 leading-relaxed">
                                    AfriLance s'efforce de fournir des informations exactes et à jour. Cependant, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité des informations diffusées.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    L'utilisation des informations et contenus disponibles sur l'ensemble du site ne saurait en aucun cas engager la responsabilité d'AfriLance.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Contact</h2>
                            <div className="bg-orange-50 p-6 rounded-lg">
                                <p className="text-gray-700 mb-2">
                                    Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Par email : support@afrilance.com</li>
                                    <li>Via notre formulaire de contact sur le site</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
