"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TermsPage() {
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Conditions Générales d&apos;Utilisation</h1>
          <p className="text-gray-600 mt-2">Dernière mise à jour : 7 septembre 2025</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Objet</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;utilisation de la plateforme 
                AfriLance, accessible à l&apos;adresse www.afrilance.com, qui met en relation des freelances et des 
                clients pour la réalisation de missions professionnelles.
              </p>
              <p>
                L&apos;utilisation de la plateforme implique l&apos;acceptation pleine et entière des présentes CGU.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Définitions</h2>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Plateforme :</strong> Le site web AfriLance et ses services associés</li>
                <li><strong>Utilisateur :</strong> Toute personne utilisant la plateforme</li>
                <li><strong>Freelance :</strong> Professionnel indépendant proposant ses services</li>
                <li><strong>Client :</strong> Personne ou entreprise recherchant des services</li>
                <li><strong>Mission :</strong> Projet ou tâche proposée par un client</li>
                <li><strong>Mobile Money :</strong> Service de paiement mobile sécurisé</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Inscription et Compte Utilisateur</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">3.1 Conditions d&apos;inscription</h3>
              <p>
                L&apos;inscription est gratuite et ouverte à toute personne physique ou morale ayant la capacité 
                juridique de contracter. L&apos;utilisateur doit fournir des informations exactes et complètes.
              </p>
              
              <h3 className="text-lg font-semibold">3.2 Vérification d&apos;identité</h3>
              <p>
                AfriLance se réserve le droit de demander des justificatifs d&apos;identité et de vérifier 
                les informations fournies par les utilisateurs.
              </p>
              
              <h3 className="text-lg font-semibold">3.3 Responsabilité du compte</h3>
              <p>
                Chaque utilisateur est responsable de la confidentialité de ses identifiants de connexion 
                et de toutes les activités effectuées sous son compte.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Services de la Plateforme</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">4.1 Pour les clients</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Publication de missions et projets</li>
                <li>Recherche et sélection de freelances</li>
                <li>Gestion des contrats et paiements sécurisés</li>
                <li>Système d&apos;évaluation et de commentaires</li>
              </ul>
              
              <h3 className="text-lg font-semibold">4.2 Pour les freelances</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Création de profil professionnel</li>
                <li>Candidature aux missions</li>
                <li>Gestion de portefeuille de projets</li>
                <li>Réception de paiements via Mobile Money</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Paiements et Commissions</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">5.1 Système de paiement</h3>
              <p>
                Les paiements sont sécurisés via Mobile Money et autres moyens de paiement acceptés. 
                AfriLance agit en tant qu&apos;intermédiaire de paiement.
              </p>
              
              <h3 className="text-lg font-semibold">5.2 Commissions</h3>
              <p>
                AfriLance prélève une commission sur chaque transaction réussie :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Freelances : 10% du montant de la mission</li>
                <li>Clients : 3% du montant de la mission</li>
              </ul>
              
              <h3 className="text-lg font-semibold">5.3 Remboursements</h3>
              <p>
                Les conditions de remboursement sont détaillées dans notre politique de remboursement.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Obligations des Utilisateurs</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">6.1 Obligations générales</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respecter les lois et réglementations en vigueur</li>
                <li>Fournir des informations exactes et à jour</li>
                <li>Ne pas porter atteinte aux droits de tiers</li>
                <li>Maintenir la confidentialité des données</li>
              </ul>
              
              <h3 className="text-lg font-semibold">6.2 Interdictions</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contourner la plateforme pour éviter les commissions</li>
                <li>Publier du contenu illégal ou offensant</li>
                <li>Usurper l&apos;identité d&apos;autrui</li>
                <li>Utiliser des moyens automatisés non autorisés</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Propriété Intellectuelle</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Les droits de propriété intellectuelle sur les travaux réalisés appartiennent au client, 
                sauf accord contraire explicite entre les parties.
              </p>
              <p>
                AfriLance conserve tous les droits sur sa plateforme, sa marque et ses contenus.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Responsabilité et Garanties</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                AfriLance agit en tant qu&apos;intermédiaire et ne peut être tenue responsable de la qualité 
                des services fournis par les freelances ou du comportement des utilisateurs.
              </p>
              <p>
                La plateforme est fournie &quot;en l&apos;état&quot; sans garantie de disponibilité continue.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Résiliation</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Chaque utilisateur peut résilier son compte à tout moment. AfriLance se réserve le droit 
                de suspendre ou supprimer un compte en cas de violation des présentes CGU.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Droit Applicable et Juridiction</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Les présentes CGU sont régies par le droit français. Tout litige sera soumis à la 
                juridiction des tribunaux de Paris.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact</h2>
            <div className="space-y-2 text-gray-700">
              <p>
                Pour toute question concernant ces CGU, vous pouvez nous contacter :
              </p>
              <p><strong>Email :</strong> <a href="mailto:legal@afrilance.com" className="text-orange-600 hover:underline">legal@afrilance.com</a></p>
              <p><strong>Adresse :</strong> 123 Avenue de la République, 75011 Paris, France</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
