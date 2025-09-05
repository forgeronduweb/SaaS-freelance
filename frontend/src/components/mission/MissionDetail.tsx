'use client';

import React, { useState } from 'react';
import ApplicationForm from '@/components/forms/ApplicationForm';
import ContactForm from '@/components/forms/ContactForm';
import AppLayout from '@/components/layout/AppLayout';

interface MissionDetailProps {
  missionId: string;
}

const MissionDetail = ({ missionId }: MissionDetailProps) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Données mockées pour la mission
  const missionData = {
    id: missionId,
    title: "Développement d'une application mobile e-commerce",
    description: "Nous recherchons un développeur expérimenté pour créer une application mobile e-commerce complète pour notre boutique de vêtements traditionnels africains. L'application doit inclure un catalogue produits, un système de panier, des paiements sécurisés via Mobile Money, et un système de livraison.",
    category: "Développement Mobile",
    budget: { min: 800000, max: 1200000 },
    duration: "2-3 mois",
    urgency: "Normale",
    status: "Ouvert",
    postedDate: "2024-01-15",
    deadline: "2024-01-30",
    proposals: 12,
    client: {
      id: "client-1",
      name: "Aminata Traoré",
      company: "AfriStyle Boutique",
      location: "Dakar, Sénégal",
      rating: 4.8,
      reviewsCount: 23,
      projectsCompleted: 15,
      memberSince: "2022",
      avatar: "/api/placeholder/80/80",
      verified: true
    },
    requirements: [
      "Expérience en développement React Native ou Flutter",
      "Connaissance des API de paiement Mobile Money",
      "Portfolio avec applications e-commerce",
      "Maîtrise du français",
      "Disponibilité immédiate"
    ],
    skills: [
      "React Native",
      "Flutter",
      "Node.js",
      "MongoDB",
      "API REST",
      "Mobile Money",
      "UI/UX Design"
    ],
    deliverables: [
      "Application mobile iOS et Android",
      "Panel d'administration web",
      "Documentation technique",
      "Formation de l'équipe",
      "Support post-lancement (1 mois)"
    ],
    additionalInfo: "Nous privilégions les freelances basés en Afrique de l'Ouest pour faciliter la communication et la compréhension du marché local. Une connaissance des habitudes d'achat africaines serait un plus."
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'normale': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ouvert': return 'bg-green-100 text-green-800 border-green-200';
      case 'en cours': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fermé': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <AppLayout userType="freelance" pageTitle="Détails de la mission" pageDescription="Consultez les détails complets de cette mission">
      {/* Header de la mission */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(missionData.status)}`}>
                {missionData.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(missionData.urgency)}`}>
                {missionData.urgency}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              {missionData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span>Publié le {new Date(missionData.postedDate).toLocaleDateString('fr-FR')}</span>
              <span>•</span>
              <span>{missionData.proposals} propositions</span>
              <span>•</span>
              <span>Catégorie: {missionData.category}</span>
            </div>
          </div>
          <div className="ml-6 text-right">
            <div className="text-2xl font-bold text-orange-600">
              {missionData.budget.min.toLocaleString()} - {missionData.budget.max.toLocaleString()} FCFA
            </div>
            <div className="text-sm text-slate-600">
              Durée: {missionData.duration}
            </div>
          </div>
        </div>
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Description du projet</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {missionData.description}
              </p>
            </div>

            {/* Exigences */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Exigences</h2>
              <ul className="space-y-2">
                {missionData.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compétences requises */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Compétences requises</h2>
              <div className="flex flex-wrap gap-2">
                {missionData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Livrables */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Livrables attendus</h2>
              <ul className="space-y-2">
                {missionData.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-slate-600">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Informations additionnelles */}
            {missionData.additionalInfo && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-orange-800 mb-4">Informations additionnelles</h2>
                <p className="text-orange-700 leading-relaxed">
                  {missionData.additionalInfo}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="space-y-4">
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Postuler à cette mission
                </button>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Contacter le client
                </button>
              </div>
            </div>

            {/* Informations client */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">À propos du client</h3>
              <div className="flex items-start space-x-4">
                <img
                  src={missionData.client.avatar}
                  alt={missionData.client.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-slate-800">{missionData.client.name}</h4>
                    {missionData.client.verified && (
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{missionData.client.company}</p>
                  <p className="text-sm text-slate-500">{missionData.client.location}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Note moyenne</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">{missionData.client.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(missionData.client.rating) ? 'text-yellow-400' : 'text-slate-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-slate-500">({missionData.client.reviewsCount})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Projets terminés</span>
                  <span className="font-medium">{missionData.client.projectsCompleted}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Membre depuis</span>
                  <span className="font-medium">{missionData.client.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Détails de la mission */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Détails de la mission</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Date limite de candidature</span>
                  <span className="font-medium">{new Date(missionData.deadline).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Propositions reçues</span>
                  <span className="font-medium">{missionData.proposals}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Durée estimée</span>
                  <span className="font-medium">{missionData.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Budget</span>
                  <span className="font-medium text-orange-600">
                    {missionData.budget.min.toLocaleString()} - {missionData.budget.max.toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Modals */}
      {showApplicationForm && (
        <ApplicationForm
          missionId={missionData.id}
          missionTitle={missionData.title}
          clientName={missionData.client.name}
          onClose={() => setShowApplicationForm(false)}
        />
      )}

      {showContactForm && (
        <ContactForm
          recipientName={missionData.client.name}
          recipientType="client"
          recipientId={missionData.client.id}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </AppLayout>
  );
};

export default MissionDetail;
