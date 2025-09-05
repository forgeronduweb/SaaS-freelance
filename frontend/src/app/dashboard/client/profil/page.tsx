"use client";
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';

const ClientProfilPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nom: 'Fatou Sall',
    email: 'fatou.sall@entreprise.com',
    telephone: '+221 77 987 65 43',
    ville: 'Abidjan, Côte d\'Ivoire',
    entreprise: 'TechSolutions CI',
    secteur: 'Technologie',
    taille: '50-100 employés',
    description: 'Entreprise spécialisée dans les solutions digitales pour les PME africaines. Nous accompagnons nos clients dans leur transformation numérique.',
    siteWeb: 'www.techsolutions-ci.com',
    budgetMoyen: 500000,
    projetsPublies: 23,
    freelancesEngages: 15,
    noteGlobale: 4.6,
    secteurActivite: 'Services numériques',
    preferences: {
      typesProjets: ['Développement web', 'Applications mobiles', 'Design UI/UX'],
      budgetRange: '100k - 1M FCFA',
      delaisMoyens: '2-4 semaines',
      languesPreferees: ['Français', 'Anglais']
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profil client sauvegardé:', profileData);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (category: string, field: string, value: string | string[]) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  return (
    <AppLayout userType="client" pageTitle="Profil Entreprise" pageDescription="Gérez les informations de votre entreprise">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">TS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{profileData.entreprise}</h1>
                <p className="text-slate-600">{profileData.secteur}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(profileData.noteGlobale) ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-slate-600 ml-1">({profileData.noteGlobale})</span>
                  </div>
                  <span className="text-sm text-slate-500">• {profileData.taille}</span>
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
            {/* Informations de l'entreprise */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Informations de l&apos;entreprise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nom de l&apos;entreprise</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.entreprise}
                      onChange={(e) => handleInputChange('entreprise', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-slate-600">{profileData.entreprise}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Secteur d&apos;activité</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.secteur}
                      onChange={(e) => handleInputChange('secteur', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-slate-600">{profileData.secteur}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Taille de l&apos;entreprise</label>
                  {isEditing ? (
                    <select
                      value={profileData.taille}
                      onChange={(e) => handleInputChange('taille', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="1-10 employés">1-10 employés</option>
                      <option value="11-50 employés">11-50 employés</option>
                      <option value="50-100 employés">50-100 employés</option>
                      <option value="100-500 employés">100-500 employés</option>
                      <option value="500+ employés">500+ employés</option>
                    </select>
                  ) : (
                    <p className="text-slate-600">{profileData.taille}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Site web</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.siteWeb}
                      onChange={(e) => handleInputChange('siteWeb', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <a href={`https://${profileData.siteWeb}`} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700">
                      {profileData.siteWeb}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Responsable</label>
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

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">À propos de l&apos;entreprise</h2>
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

            {/* Préférences de projet */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Préférences de projet</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Types de projets préférés</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.preferences.typesProjets.map((type, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Budget moyen</label>
                    <p className="text-slate-600">{profileData.preferences.budgetRange}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Délais moyens</label>
                    <p className="text-slate-600">{profileData.preferences.delaisMoyens}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistiques */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Statistiques</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Projets publiés</span>
                  <span className="font-semibold text-slate-800">{profileData.projetsPublies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Freelances engagés</span>
                  <span className="font-semibold text-slate-800">{profileData.freelancesEngages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Note globale</span>
                  <span className="font-semibold text-slate-800">{profileData.noteGlobale}/5</span>
                </div>
              </div>
            </div>

            {/* Budget moyen */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Budget moyen par projet</h3>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={profileData.budgetMoyen}
                    onChange={(e) => handleInputChange('budgetMoyen', parseInt(e.target.value))}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <span className="text-slate-600">FCFA</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-orange-600">{profileData.budgetMoyen.toLocaleString()} FCFA</p>
              )}
            </div>

            {/* Statut de vérification */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Vérifications</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">Email vérifié</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">Téléphone vérifié</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">Entreprise vérifiée</span>
                </div>
              </div>
            </div>

            {/* Langues de communication */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Langues</h3>
              <div className="space-y-2">
                {profileData.preferences.languesPreferees.map((langue, index) => (
                  <div key={index} className="text-slate-600">{langue}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ClientProfilPage;
