'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface NewMissionFormProps {
  userType?: 'freelance' | 'client';
}

const NewMissionForm = ({ userType = 'client' }: NewMissionFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    skills: '',
    budget: '',
    budgetType: 'forfait',
    deadline: '',
    urgency: 'normal',
    attachments: [] as File[]
  });

  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Développement Web',
    'Développement Mobile', 
    'Design',
    'Marketing',
    'Rédaction',
    'Conseil IT',
    'Traduction'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation basique
    if (!formData.title || !formData.description || !formData.category || !formData.budget || !formData.deadline) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    setIsLoading(true)

    try {
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Vous devez être connecté pour créer une mission')
        return
      }

      // Convertir les compétences en tableau
      const skillsArray = formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : []

      // Préparer les données pour l'API
      const missionData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        skills: skillsArray,
        budget: parseFloat(formData.budget),
        deadline: formData.deadline,
        isUrgent: formData.urgency === 'urgent',
        requirements: formData.description,
        deliverables: `Livrable pour: ${formData.title}`,
        estimatedDuration: formData.urgency === 'urgent' ? '1-3 jours' : '1-2 semaines',
        experienceLevel: 'INTERMEDIATE',
        location: 'Afrique',
        isRemote: true,
        attachments: []
      }

      console.log('Envoi des données à l\'API:', missionData)

      const response = await fetch('/api/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(missionData)
      })

      const result = await response.json()

      if (result.success) {
        alert('Mission créée avec succès!')
        console.log('Mission créée:', result.data.mission)
        
        // Réinitialiser le formulaire
        setFormData({
          title: '',
          category: '',
          description: '',
          skills: '',
          budget: '',
          budgetType: 'forfait',
          deadline: '',
          urgency: 'normal',
          attachments: []
        })

        // Rediriger vers le dashboard client
        setTimeout(() => {
          window.location.href = '/dashboard/client'
        }, 1500)
      } else {
        alert(`Erreur lors de la création: ${result.error || result.message}`)
        console.error('Erreur API:', result)
      }

    } catch (error) {
      console.error('Erreur lors de la création de la mission:', error)
      alert('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout userType={userType} pageTitle="Nouvelle Mission">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">Créer une nouvelle mission</h1>
          <p className="text-slate-600">Décrivez votre projet pour attirer les meilleurs freelances</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-6 space-y-6">
            {/* Titre de la mission */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Titre de la mission *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Développement d'une application mobile e-commerce"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Catégorie *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description détaillée *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités attendues, contraintes techniques..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                required
              />
            </div>

            {/* Compétences requises */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Compétences requises *
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="Ex: React Native, Node.js, Mobile Money API (séparez par des virgules)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
              <p className="text-sm text-slate-500 mt-1">Séparez les compétences par des virgules</p>
            </div>

            {/* Budget et type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Budget (FCFA) *
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Ex: 500000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Type de budget *
                </label>
                <select
                  name="budgetType"
                  value={formData.budgetType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="forfait">Prix forfaitaire</option>
                  <option value="horaire">Tarif horaire</option>
                </select>
              </div>
            </div>

            {/* Délai et urgence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Délai souhaité *
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Niveau d&apos;urgence
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Fichiers joints */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Fichiers joints (optionnel)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-slate-600 mb-2">Glissez-déposez vos fichiers ici ou</p>
                <button type="button" className="text-orange-600 hover:text-orange-700 font-medium">
                  Parcourir les fichiers
                </button>
                <p className="text-sm text-slate-500 mt-2">PDF, DOC, JPG, PNG (max 10MB)</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Enregistrer comme brouillon
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création en cours...
                </span>
              ) : (
                'Publier la mission'
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewMissionForm;
