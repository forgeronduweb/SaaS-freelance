"use client";
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';

const FreelanceProfilPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nom: 'Amadou Diallo',
    email: 'amadou.diallo@email.com',
    telephone: '+221 77 123 45 67',
    ville: 'Dakar, Sénégal',
    titre: 'Développeur Full Stack Senior',
    description: 'Développeur passionné avec 5 ans d\'expérience en développement web. Spécialisé en React, Node.js et MongoDB. J\'aide les entreprises à digitaliser leurs processus.',
    competences: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    tarifHoraire: 15000,
    disponibilite: 'Disponible',
    langues: ['Français (Natif)', 'Anglais (Courant)', 'Wolof (Natif)'],
    experience: '5 ans',
    projetsCompletes: 47,
    noteGlobale: 4.8,
    certifications: [
      'Certification React - Meta',
      'Node.js Certified Developer',
      'MongoDB Certified Developer'
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Ici on sauvegarderait les données
    console.log('Profil sauvegardé:', profileData);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCompetenceAdd = (competence: string) => {
    if (competence && !profileData.competences.includes(competence)) {
      setProfileData(prev => ({
        ...prev,
        competences: [...prev.competences, competence]
      }));
    }
  };

  const handleCompetenceRemove = (competence: string) => {
    setProfileData(prev => ({
      ...prev,
      competences: prev.competences.filter(c => c !== competence)
    }));
  };

  return (
    <AppLayout userType="freelance" pageTitle="Mon Profil" pageDescription="Gérez vos informations personnelles et professionnelles">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AD</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{profileData.nom}</h1>
                <p className="text-slate-600">{profileData.titre}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(profileData.noteGlobale) ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-slate-600 ml-1">({profileData.noteGlobale})</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Sauvegarder
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Modifier le profil
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations personnelles */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Informations personnelles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-slate-600">{profileData.nom}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-slate-600">{profileData.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-slate-600">{profileData.telephone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Localisation</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.ville}
                      onChange={(e) => handleInputChange('ville', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-slate-600">{profileData.ville}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Description professionnelle */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Description professionnelle</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Titre professionnel</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.titre}
                      onChange={(e) => handleInputChange('titre', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-slate-600">{profileData.titre}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  {isEditing ? (
                    <textarea
                      value={profileData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-slate-600">{profileData.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Compétences */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Compétences</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.competences.map((competence, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                  >
                    {competence}
                    {isEditing && (
                      <button
                        onClick={() => handleCompetenceRemove(competence)}
                        className="text-orange-600 hover:text-orange-800"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ajouter une compétence"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCompetenceAdd(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistiques */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Statistiques</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Projets complétés</span>
                  <span className="font-semibold text-slate-800">{profileData.projetsCompletes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Note globale</span>
                  <span className="font-semibold text-slate-800">{profileData.noteGlobale}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Expérience</span>
                  <span className="font-semibold text-slate-800">{profileData.experience}</span>
                </div>
              </div>
            </div>

            {/* Tarification */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Tarification</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tarif horaire</label>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={profileData.tarifHoraire}
                      onChange={(e) => handleInputChange('tarifHoraire', parseInt(e.target.value))}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <span className="text-slate-600">FCFA/h</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-orange-600">{profileData.tarifHoraire.toLocaleString()} FCFA/h</p>
                )}
              </div>
            </div>

            {/* Disponibilité */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Disponibilité</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-600">{profileData.disponibilite}</span>
              </div>
            </div>

            {/* Langues */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Langues</h3>
              <div className="space-y-2">
                {profileData.langues.map((langue, index) => (
                  <div key={index} className="text-slate-600">{langue}</div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Certifications</h3>
              <div className="space-y-2">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="text-sm text-slate-600 bg-slate-50 p-2 rounded">{cert}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default FreelanceProfilPage;
