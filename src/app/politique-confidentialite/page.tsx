"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PolitiqueConfidentialitePage() {
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
                            ← Retour à l&apos;accueil
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
                            POLITIQUE DE CONFIDENTIALITÉ
                        </h1>
                        <div className="text-lg text-gray-700 space-y-2">
                            <p><strong>AfriLance</strong></p>
                            <p>Plateforme de mise en relation freelances-clients</p>
                            <p className="text-sm text-gray-500 mt-4">
                                Document de confidentialité - Version du {new Date().toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <section className="mb-8">
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                                <p className="text-blue-800 font-medium">
                                    Chez AfriLance, la protection des données personnelles de nos utilisateurs est une priorité.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Données collectées</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Nous collectons les types de données suivants :
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Informations personnelles</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        <li>Nom et prénom</li>
                                        <li>Adresse email</li>
                                        <li>Numéro de téléphone</li>
                                        <li>Rôle (freelance ou client)</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Informations professionnelles</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        <li>Portfolio et réalisations</li>
                                        <li>Compétences et expertises</li>
                                        <li>Missions publiées</li>
                                        <li>Historique des collaborations</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Informations de paiement</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        <li>Données Mobile Money</li>
                                        <li>Informations cartes bancaires</li>
                                        <li>Historique des transactions</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Informations techniques</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        <li>Cookies et traceurs</li>
                                        <li>Adresse IP</li>
                                        <li>Données de navigation</li>
                                        <li>Préférences utilisateur</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Utilisation des données</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Les données collectées servent à :
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700">Créer et gérer votre compte utilisateur</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700">Faciliter la mise en relation entre freelances et clients</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700">Assurer la sécurité des paiements et transactions</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700">Envoyer des notifications, confirmations et informations liées au service</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700">Améliorer l&apos;expérience utilisateur et personnaliser le contenu affiché</p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Conservation et sécurité</h2>
                            <div className="bg-green-50 p-6 rounded-lg space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    <p className="text-gray-700">Vos données sont stockées sur des serveurs sécurisés</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    <p className="text-gray-700">Les mots de passe sont chiffrés avec bcrypt</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    <p className="text-gray-700">Les paiements sont protégés par des protocoles de sécurité (SSL/TLS)</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    <p className="text-gray-700">Les données sont conservées uniquement le temps nécessaire à la fourniture des services</p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Partage des données</h2>
                            <div className="space-y-4">
                                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                                    <p className="text-red-800 font-medium">
                                        🚫 AfriLance ne vend pas vos données personnelles.
                                    </p>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Les données peuvent être partagées uniquement en cas d&apos;obligation légale (autorités compétentes) ou pour assurer le bon fonctionnement de la plateforme (partenaires techniques sous contrat de confidentialité).
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Vos droits</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Conformément aux réglementations en vigueur, vous disposez des droits suivants :
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-800 mb-2">Droit d&apos;accès</h3>
                                    <p className="text-blue-700 text-sm">Consulter les données que nous détenons sur vous</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-800 mb-2">Droit de modification</h3>
                                    <p className="text-blue-700 text-sm">Corriger ou mettre à jour vos informations</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-800 mb-2">Droit de suppression</h3>
                                    <p className="text-blue-700 text-sm">Demander l&apos;effacement de vos données</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-800 mb-2">Droit d&apos;opposition</h3>
                                    <p className="text-blue-700 text-sm">Vous opposer au traitement de vos données</p>
                                </div>
                            </div>
                            <div className="bg-orange-50 p-6 rounded-lg mt-6">
                                <p className="text-gray-700 mb-2">
                                    <strong>Comment exercer vos droits :</strong>
                                </p>
                                <p className="text-gray-700">
                                    Vous pouvez exercer ces droits en contactant <strong>support@afrilance.com</strong> avec une pièce d&apos;identité pour vérification.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Contact</h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-700 mb-2">
                                    Pour toute question concernant cette politique de confidentialité :
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Email : support@afrilance.com</li>
                                    <li>Objet : &quot;Protection des données personnelles&quot;</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
