'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';

interface Mission {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';
  skills: string[];
  proposals: number;
  freelancer?: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  createdAt: string;
}

const ClientMissions = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'open' | 'in_progress' | 'completed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMission, setNewMission] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    deadline: '',
    skills: [] as string[],
    skillInput: ''
  });

  // Récupération des missions du client connecté
  useEffect(() => {
    const fetchUserMissions = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/missions?clientId=${user.id}&limit=100`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Missions récupérées:', data);
          setMissions(data.data?.missions || []);
        } else {
          console.error('Erreur lors de la récupération des missions - Status:', response.status);
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserMissions();
  }, [user?.id]);

  // Données mockées pour les missions (fallback si pas de données API)
  const mockMissions: Mission[] = [
    {
      id: '1',
      title: 'Développement d\'une application mobile e-commerce',
      description: 'Nous cherchons un développeur expérimenté pour créer une application mobile de e-commerce avec paiement mobile money intégré.',
      budget: 2500000,
      deadline: '2024-03-15',
      status: 'in_progress',
      skills: ['React Native', 'Node.js', 'Mobile Money API'],
      proposals: 12,
      freelancer: {
        id: 'f1',
        name: 'Aminata Diallo',
        avatar: '/api/placeholder/40/40',
        rating: 4.9
      },
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Design UI/UX pour plateforme web',
      description: 'Création d\'une interface moderne et intuitive pour notre plateforme de gestion des ressources humaines.',
      budget: 800000,
      deadline: '2024-02-28',
      status: 'open',
      skills: ['Figma', 'UI/UX Design', 'Prototyping'],
      proposals: 8,
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Rédaction de contenu marketing',
      description: 'Rédaction d\'articles de blog et de contenu marketing pour notre site web dans le secteur de l\'agriculture.',
      budget: 300000,
      deadline: '2024-02-10',
      status: 'completed',
      skills: ['Rédaction', 'Marketing digital', 'SEO'],
      proposals: 15,
      freelancer: {
        id: 'f2',
        name: 'Ibrahim Koné',
        avatar: '/api/placeholder/40/40',
        rating: 4.7
      },
      createdAt: '2024-01-10'
    },
    {
      id: '4',
      title: 'Développement site web vitrine',
      description: 'Site web moderne et responsive pour une entreprise de construction à Dakar.',
      budget: 1200000,
      deadline: '2024-03-01',
      status: 'draft',
      skills: ['WordPress', 'PHP', 'Responsive Design'],
      proposals: 0,
      createdAt: '2024-01-25'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-700';
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'in_progress': return 'bg-orange-100 text-orange-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'open': return 'Ouverte';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredMissions = activeTab === 'all' 
    ? (Array.isArray(missions) ? missions : [])
    : (Array.isArray(missions) ? missions.filter(mission => mission.status === activeTab) : []);

  const stats = {
    total: Array.isArray(missions) ? missions.length : 0,
    draft: Array.isArray(missions) ? missions.filter(m => m.status === 'draft').length : 0,
    open: Array.isArray(missions) ? missions.filter(m => m.status === 'open').length : 0,
    in_progress: Array.isArray(missions) ? missions.filter(m => m.status === 'in_progress').length : 0,
    completed: Array.isArray(missions) ? missions.filter(m => m.status === 'completed').length : 0,
  };

  const handleCreateMission = async () => {
    try {
      // Validation basique
      if (!newMission.title || !newMission.description || !newMission.category || !newMission.budget || !newMission.deadline) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }

      const missionData = {
        title: newMission.title,
        description: newMission.description,
        category: newMission.category,
        budget: parseFloat(newMission.budget),
        deadline: newMission.deadline,
        skills: newMission.skills || [],
        isRemote: true,
        attachments: []
      };

      // Appel API pour créer la mission
      const response = await fetch('/api/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(missionData)
      });

      console.log('Status de la réponse:', response.status);
      console.log('Headers de la réponse:', [...response.headers.entries()]);
      
      if (!response.ok) {
        const responseText = await response.text();
        console.log('Réponse brute:', responseText);
        
        let errorMessage = `Erreur HTTP ${response.status}`;
        let errorData: any = {};
        
        try {
          if (responseText) {
            errorData = JSON.parse(responseText);
            console.error('Erreur API détaillée:', errorData);
            errorMessage = errorData.error || errorMessage;
          } else {
            console.error('Réponse vide du serveur');
            errorMessage = 'Réponse vide du serveur';
          }
        } catch (e) {
          console.error('Impossible de parser la réponse d\'erreur:', e);
          errorMessage = responseText || errorMessage;
        }
        
        alert(`Erreur: ${errorMessage}`);
        return;
      }

      const result = await response.json();
      console.log('Mission créée:', result);
      
      // Ajouter la nouvelle mission à la liste locale
      if (result.data && result.data.mission) {
        setMissions(prev => [result.data.mission, ...(Array.isArray(prev) ? prev : [])]);
      }
      
      // Reset du formulaire
      setNewMission({
        title: '',
        description: '',
        category: '',
        budget: '',
        deadline: '',
        skills: [],
        skillInput: ''
      });
      setShowCreateModal(false);
      
      alert('Mission créée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création de la mission');
    }
  };

  const addSkill = () => {
    if (newMission.skillInput.trim() && !newMission.skills.includes(newMission.skillInput.trim())) {
      setNewMission(prev => ({
        ...prev,
        skills: [...prev.skills, prev.skillInput.trim()],
        skillInput: ''
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setNewMission(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <DashboardLayout 
      userType="client" 
      pageTitle="Mes Missions"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Mes Missions</h1>
            <p className="text-slate-600 mt-1">Gérez vos projets et suivez leur progression</p>
          </div>
        </div>

        {/* Stats Cards - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
            <div className="text-sm text-slate-600">Total</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-2xl font-bold text-slate-500">{stats.draft}</div>
            <div className="text-sm text-slate-600">Brouillons</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-2xl font-bold text-blue-600">{stats.open}</div>
            <div className="text-sm text-slate-600">Ouvertes</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-2xl font-bold text-orange-600">{stats.in_progress}</div>
            <div className="text-sm text-slate-600">En cours</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-slate-600">Terminées</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="border-b border-slate-200">
            <nav className="flex overflow-x-auto">
              {[
                { key: 'all', label: 'Toutes', count: stats.total },
                { key: 'draft', label: 'Brouillons', count: stats.draft },
                { key: 'open', label: 'Ouvertes', count: stats.open },
                { key: 'in_progress', label: 'En cours', count: stats.in_progress },
                { key: 'completed', label: 'Terminées', count: stats.completed },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Missions List */}
          <div className="divide-y divide-slate-200">
            {filteredMissions.length > 0 ? (
              filteredMissions.map((mission) => (
                <div key={mission.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-slate-800 truncate pr-4">
                          {mission.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(mission.status)}`}>
                          {getStatusLabel(mission.status)}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 mb-3 line-clamp-2">
                        {mission.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          {formatCurrency(mission.budget)}
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Échéance: {formatDate(mission.deadline)}
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {mission.proposals} propositions
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {(mission.skills || []).map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {mission.freelancer && (
                        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                          <img
                            src={mission.freelancer.avatar}
                            alt={mission.freelancer.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-slate-800">{mission.freelancer.name}</div>
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {mission.freelancer.rating}/5
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-orange-600 hover:text-orange-700 p-1">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex lg:flex-col gap-2 lg:items-end">
                      <button className="text-slate-600 hover:text-orange-600 p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="text-slate-600 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-medium text-slate-800 mb-2">Aucune mission</h3>
                <p className="text-slate-600 mb-4">
                  {activeTab === 'all' 
                    ? 'Vous n\'avez pas encore créé de missions'
                    : `Aucune mission ${getStatusLabel(activeTab).toLowerCase()}`
                  }
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors hidden sm:inline-block"
                >
                  Créer ma première mission
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal de création de mission */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-slate-50 flex items-start justify-center z-50 overflow-y-auto">
            <div className="w-full max-w-lg mx-4 my-4 sm:my-8">
              {/* Header */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div></div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Nouvelle mission</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 touch-manipulation"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm sm:text-base text-slate-600 px-4">
                  Décrivez votre projet pour trouver le freelance idéal
                </p>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Titre */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Titre de la mission *
                  </label>
                  <input
                    type="text"
                    value={newMission.title}
                    onChange={(e) => setNewMission(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base touch-manipulation"
                    placeholder="Ex: Développement d'une application mobile"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newMission.description}
                    onChange={(e) => setNewMission(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none text-base touch-manipulation"
                    placeholder="Décrivez votre projet en détail..."
                    required
                  />
                </div>

                {/* Catégorie et Budget */}
                <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                      Catégorie *
                    </label>
                    <select
                      value={newMission.category}
                      onChange={(e) => setNewMission(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base touch-manipulation"
                      required
                    >
                      <option value="">Choisir une catégorie</option>
                      <option value="development">Développement</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="writing">Rédaction</option>
                      <option value="translation">Traduction</option>
                      <option value="data">Data & Analytics</option>
                      <option value="mobile">Mobile</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                      Budget (FCFA) *
                    </label>
                    <input
                      type="number"
                      value={newMission.budget}
                      onChange={(e) => setNewMission(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base touch-manipulation"
                      placeholder="500000"
                      required
                    />
                  </div>
                </div>

                {/* Date limite */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Date limite *
                  </label>
                  <input
                    type="date"
                    value={newMission.deadline}
                    onChange={(e) => setNewMission(prev => ({ ...prev, deadline: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base touch-manipulation"
                    required
                  />
                </div>

                {/* Compétences */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Compétences requises
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <input
                      type="text"
                      value={newMission.skillInput}
                      onChange={(e) => setNewMission(prev => ({ ...prev, skillInput: e.target.value }))}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base touch-manipulation"
                      placeholder="React, Node.js..."
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium text-base touch-manipulation min-h-[44px]"
                    >
                      Ajouter
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newMission.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-orange-600 hover:text-orange-800 ml-1 touch-manipulation"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="w-full sm:flex-1 py-3 px-4 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-base touch-manipulation min-h-[44px]"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateMission}
                    className="w-full sm:flex-1 py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium text-base touch-manipulation min-h-[44px]"
                  >
                    Créer la mission
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bouton flottant carré en bas à droite pour mobile */}
        {!showCreateModal && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="fixed bottom-20 right-6 w-14 h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 md:hidden touch-manipulation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClientMissions;
