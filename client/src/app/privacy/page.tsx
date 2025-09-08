"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Politique de Confidentialité</h1>
          <p className="text-gray-600 mt-2">Dernière mise à jour : 7 septembre 2025</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                AfriLance s&apos;engage à protéger la confidentialité et la sécurité des données personnelles 
                de ses utilisateurs. Cette politique explique comment nous collectons, utilisons, stockons 
                et protégeons vos données personnelles.
              </p>
              <p>
                Cette politique de confidentialité décrit comment AfriLance collecte, utilise et protège 
                vos données personnelles lors de l&apos;utilisation de notre plateforme de freelancing. 
                Nous nous engageons à respecter votre vie privée et à protéger vos informations 
                conformément au Règlement Général sur la Protection des Données (RGPD) 
                et aux lois applicables en matière de protection des données.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Données Collectées</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">2.1 Données d&apos;inscription</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Mot de passe (crypté)</li>
                <li>Pays de résidence</li>
              </ul>
              
              <h3 className="text-lg font-semibold">2.2 Données professionnelles</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Compétences et domaines d&apos;expertise</li>
                <li>Portfolio et réalisations</li>
                <li>Tarifs et disponibilités</li>
                <li>Évaluations et commentaires</li>
              </ul>
              
              <h3 className="text-lg font-semibold">2.3 Données de paiement</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Informations Mobile Money</li>
                <li>Historique des transactions</li>
                <li>Données de facturation</li>
              </ul>
              
              <h3 className="text-lg font-semibold">2.4 Données techniques</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adresse IP</li>
                <li>Cookies et données de navigation</li>
                <li>Informations sur l&apos;appareil utilisé</li>
                <li>Logs de connexion</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Utilisation des Données</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">3.1 Finalités principales</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Création et gestion de votre compte utilisateur</li>
                <li>Mise en relation entre freelances et clients</li>
                <li>Traitement des paiements et transactions</li>
                <li>Communication entre utilisateurs</li>
                <li>Support client et assistance technique</li>
              </ul>
              
              <h3 className="text-lg font-semibold">3.2 Finalités secondaires</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Envoi de newsletters (avec consentement)</li>
                <li>Analyses statistiques et études de marché</li>
                <li>Prévenir la fraude et assurer la sécurité</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Base Légale du Traitement</h2>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Exécution du contrat :</strong> Gestion de votre compte et des services</li>
                <li><strong>Intérêt légitime :</strong> Amélioration des services et prévention de la fraude</li>
                <li><strong>Consentement :</strong> Marketing et communications promotionnelles</li>
                <li><strong>Obligation légale :</strong> Conformité fiscale et réglementaire</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Partage des Données</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">5.1 Partage interne</h3>
              <p>
                Vos données de profil public sont visibles par les autres utilisateurs de la plateforme 
                pour faciliter les mises en relation professionnelles.
              </p>
              
              <h3 className="text-lg font-semibold">5.2 Partenaires de confiance</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prestataires de paiement Mobile Money</li>
                <li>Services d&apos;hébergement et de sécurité</li>
                <li>Outils d&apos;analyse et de performance</li>
              </ul>
              
              <h3 className="text-lg font-semibold">5.3 Obligations légales</h3>
              <p>
                Nous ne vendons jamais vos données personnelles à des tiers. Nous pouvons partager 
                vos informations uniquement dans les cas prévus par la loi pour protéger nos droits 
                et ceux de nos utilisateurs.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Sécurité des Données</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">6.1 Mesures techniques</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Chiffrement SSL/TLS pour toutes les communications</li>
                <li>Cryptage des mots de passe</li>
                <li>Sauvegardes régulières et sécurisées</li>
                <li>Surveillance continue des accès</li>
              </ul>
              
              <h3 className="text-lg font-semibold">6.2 Mesures organisationnelles</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accès limité aux données sur la base du besoin d&apos;en connaître</li>
                <li>Formation du personnel à la protection des données</li>
                <li>Audits de sécurité réguliers</li>
                <li>Procédures de réponse aux incidents</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Vos Droits</h2>
            <div className="space-y-4 text-gray-700">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Droit d&apos;accès :</strong> Consulter vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
                <li><strong>Droit à l&apos;effacement :</strong> Demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> Restreindre le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
                <li><strong>Droit d&apos;opposition :</strong> Vous opposer au traitement de vos données</li>
                <li><strong>Droit de retrait du consentement :</strong> Retirer votre consentement à tout moment</li>
              </ul>
              
              <p className="mt-4">
                Pour exercer vos droits, contactez-nous à l&apos;adresse : 
                <a href="mailto:dpo@afrilance.com" className="text-orange-600 hover:underline ml-1">
                  dpo@afrilance.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">8.1 Types de cookies utilisés</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cookies essentiels : Nécessaires au fonctionnement du site</li>
                <li><strong>Cookies de performance :</strong> Analyse de l&apos;utilisation du site</li>
                <li><strong>Cookies de fonctionnalité :</strong> Mémorisation de vos préférences</li>
                <li><strong>Cookies publicitaires :</strong> Personnalisation des annonces (avec consentement)</li>
              </ul>
              
              <h3 className="text-lg font-semibold">8.2 Gestion des cookies</h3>
              <p>
                Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur 
                ou notre centre de préférences.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Conservation des Données</h2>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Données de compte actif :</strong> Pendant toute la durée d&apos;utilisation du service</li>
                <li><strong>Données de compte fermé :</strong> 3 ans après la fermeture</li>
                <li><strong>Données de transaction :</strong> 10 ans pour les obligations comptables</li>
                <li><strong>Données de support :</strong> 3 ans après la résolution du problème</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Transferts Internationaux</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Nos données sont principalement stockées en Afrique et dans l&apos;Union Européenne. 
                Si nous devons transférer vos données vers des pays tiers, nous nous assurons 
                que des garanties appropriées sont en place pour protéger vos données.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Modifications de la Politique</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Cette politique peut être mise à jour pour refléter les changements dans nos 
                pratiques ou pour des raisons légales. Nous vous informerons de tout changement 
                important qui vous sera notifié par email ou via la plateforme.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Délégué à la Protection des Données (DPO) :</strong></p>
              <p><strong>Email :</strong> <a href="mailto:dpo@afrilance.com" className="text-orange-600 hover:underline">dpo@afrilance.com</a></p>
              <p><strong>Adresse :</strong> 123 Avenue de la République, 75011 Paris, France</p>
              
              <p className="mt-4">
                <strong>Autorité de contrôle :</strong> Vous avez également le droit de déposer une plainte 
                auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés).
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
