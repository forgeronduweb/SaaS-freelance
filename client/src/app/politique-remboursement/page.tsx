"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PolitiqueRemboursementPage() {
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
                            POLITIQUE DE REMBOURSEMENT
                        </h1>
                        <div className="text-lg text-gray-700 space-y-2">
                            <p><strong>AfriLance</strong></p>
                            <p>Plateforme de mise en relation freelances-clients</p>
                            <p className="text-sm text-gray-500 mt-4">
                                Document contractuel - Version du {new Date().toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <section className="mb-8">
                            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
                                <p className="text-green-800 font-medium">
                                    AfriLance a mis en place un système de paiement sécurisé avec dépôt bloqué (escrow) afin de protéger à la fois les clients et les freelances.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Dépôt et blocage des fonds</h2>
                            <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-2">Engagement du client</h3>
                                        <p className="text-gray-700">
                                            Lorsqu'un client engage un freelance, le montant convenu est déposé sur AfriLance.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-2">Sécurisation des fonds</h3>
                                        <p className="text-gray-700">
                                            L'argent reste bloqué jusqu'à la livraison du travail et la validation par le client.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Cas de remboursement</h2>
                            <div className="space-y-6">
                                <div className="bg-yellow-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">🔄 Remboursement total ou partiel</h3>
                                    <p className="text-gray-700 mb-3">
                                        Si le freelance ne livre pas le travail ou ne respecte pas les termes convenus, le client peut demander un remboursement total ou partiel.
                                    </p>
                                    <div className="bg-white p-4 rounded border-l-4 border-yellow-400">
                                        <p className="text-sm text-gray-600">
                                            <strong>Procédure :</strong> Le client doit signaler le problème via la plateforme avec des justificatifs.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-orange-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-orange-800 mb-3">⚖️ Médiation en cas de litige</h3>
                                    <p className="text-gray-700 mb-3">
                                        En cas de litige, AfriLance joue un rôle de médiateur pour trouver une solution équitable.
                                    </p>
                                    <div className="bg-white p-4 rounded border-l-4 border-orange-400">
                                        <p className="text-sm text-gray-600">
                                            <strong>Délai :</strong> La médiation est initiée dans les 48h suivant la déclaration du litige.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Validation et paiement</h3>
                                    <p className="text-gray-700 mb-3">
                                        Si le client valide le travail, le paiement est automatiquement débloqué au profit du freelance.
                                    </p>
                                    <div className="bg-white p-4 rounded border-l-4 border-green-400">
                                        <p className="text-sm text-gray-600">
                                            <strong>Automatisation :</strong> Le déblocage se fait instantanément après validation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Frais non remboursables</h2>
                            <div className="bg-red-50 p-6 rounded-lg">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-xs">✗</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-red-800 mb-2">Commissions de la plateforme</h3>
                                        <p className="text-gray-700">
                                            Les commissions prélevées par AfriLance sur chaque transaction ne sont pas remboursables.
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded border border-red-200">
                                    <p className="text-sm text-gray-600">
                                        <strong>Exception :</strong> En cas d'erreur technique imputable à la plateforme (ex. double facturation), un remboursement sera effectué.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Délai de remboursement</h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white p-4 rounded-lg border">
                                        <h3 className="font-semibold text-gray-800 mb-2">📱 Mobile Money</h3>
                                        <p className="text-gray-700 text-sm mb-2">Délai de remboursement :</p>
                                        <p className="text-lg font-bold text-orange-600">7 jours ouvrés</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border">
                                        <h3 className="font-semibold text-gray-800 mb-2">💳 Carte bancaire</h3>
                                        <p className="text-gray-700 text-sm mb-2">Délai de remboursement :</p>
                                        <p className="text-lg font-bold text-orange-600">14 jours ouvrés</p>
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-400">
                                    <p className="text-blue-800 text-sm">
                                        <strong>Note :</strong> Les remboursements, lorsqu'ils sont validés, sont effectués selon le moyen de paiement utilisé initialement.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Procédure de demande de remboursement</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">1</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Signalement du problème</h3>
                                        <p className="text-gray-700 text-sm">Contactez le support via la plateforme ou par email</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">2</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Fourniture des justificatifs</h3>
                                        <p className="text-gray-700 text-sm">Envoyez les preuves du non-respect des termes convenus</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">3</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Analyse et décision</h3>
                                        <p className="text-gray-700 text-sm">Notre équipe étudie le dossier et prend une décision équitable</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Contact</h2>
                            <div className="bg-orange-50 p-6 rounded-lg">
                                <p className="text-gray-700 mb-2">
                                    Pour toute demande de remboursement ou question :
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Email : support@afrilance.com</li>
                                    <li>Objet : "Demande de remboursement - [Numéro de mission]"</li>
                                    <li>Via le système de messagerie de la plateforme</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
