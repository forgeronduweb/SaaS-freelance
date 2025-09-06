"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ConditionsPage() {
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
                            CONDITIONS D'UTILISATION
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
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">1. Objet</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Les présentes Conditions d'utilisation définissent les modalités d'accès et d'utilisation de la plateforme AfriLance.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                AfriLance est une place de marché en ligne mettant en relation des clients ayant des besoins en prestations de services et des freelances offrant leurs compétences.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                En vous inscrivant et en utilisant la plateforme, vous acceptez pleinement et sans réserve les présentes conditions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">2. Inscription et accès</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                L'accès à la plateforme nécessite la création d'un compte en tant que Freelance ou Client.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Les informations fournies lors de l'inscription doivent être exactes et mises à jour.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Chaque utilisateur est responsable de la confidentialité de ses identifiants et de toute activité réalisée via son compte.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">3. Utilisation de la plateforme</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Les clients publient des missions, sélectionnent un freelance et effectuent un dépôt sécurisé.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Les freelances postulent aux missions, réalisent les prestations et reçoivent leur paiement une fois la mission validée.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Toute utilisation abusive (fraude, usurpation d'identité, non-respect des règles de paiement, communication trompeuse) entraînera la suspension ou la suppression du compte.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">4. Paiements et commissions</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Les paiements se font via les moyens sécurisés proposés sur la plateforme (Mobile Money, carte bancaire, Stripe).
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Les fonds déposés par le client sont bloqués jusqu'à la validation de la mission.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                AfriLance perçoit une commission sur chaque mission validée. Le montant de cette commission est indiqué lors de la transaction.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Aucun paiement direct en dehors de la plateforme n'est autorisé.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">5. Responsabilités des utilisateurs</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Clients :</strong> fournir un descriptif clair et complet de la mission, payer les prestations convenues, valider le travail livré conformément à l'accord.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Freelances :</strong> livrer un travail conforme aux attentes, respecter les délais et maintenir une communication professionnelle.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">6. Responsabilité de la plateforme</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                AfriLance n'est pas partie au contrat entre clients et freelances : elle agit uniquement comme intermédiaire technique et gestionnaire des paiements.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                AfriLance ne garantit pas la qualité ou la conformité des services rendus par les freelances.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                La plateforme s'engage à sécuriser les transactions et protéger les données personnelles.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">7. Évaluations et réputation</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                À la fin de chaque mission, client et freelance peuvent laisser une évaluation (note et commentaire).
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Ces avis doivent rester honnêtes, respectueux et conformes à la réalité.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">8. Résiliation et suspension</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                L'utilisateur peut fermer son compte à tout moment.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                AfriLance se réserve le droit de suspendre ou supprimer un compte en cas de non-respect des présentes conditions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">9. Données personnelles</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                AfriLance collecte et traite des données personnelles nécessaires au fonctionnement du service (gestion des comptes, paiements, notifications).
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Conformément à la réglementation en vigueur, l'utilisateur dispose d'un droit d'accès, de rectification et de suppression de ses données.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">10. Modification des conditions</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                AfriLance peut modifier les présentes Conditions d'utilisation à tout moment.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Les utilisateurs seront informés et devront accepter les nouvelles conditions pour continuer à utiliser la plateforme.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">11. Droit applicable et litiges</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Les présentes Conditions sont régies par le droit en vigueur en Côte d'Ivoire.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux compétents.
                            </p>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500 text-center">
                            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                        </p>
                        <div className="flex justify-center mt-4">
                            <Link 
                                href="/" 
                                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                Retour à l'accueil
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
