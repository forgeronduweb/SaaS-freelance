'use client';

import React, { useState } from 'react';

interface ApplicationFormProps {
  missionId: string;
  missionTitle: string;
  clientName: string;
  onSubmit?: (data: ApplicationData) => void;
  onClose?: () => void;
}

interface ApplicationData {
  coverLetter: string;
  proposedBudget: string;
  deliveryTime: string;
  attachments: File[];
}

const ApplicationForm = ({ missionId, missionTitle, clientName, onSubmit, onClose }: ApplicationFormProps) => {
  const [formData, setFormData] = useState<ApplicationData>({
    coverLetter: '',
    proposedBudget: '',
    deliveryTime: '',
    attachments: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ApplicationData>>({});

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...fileArray] }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ApplicationData> = {};

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'La lettre de motivation est requise';
    } else if (formData.coverLetter.length < 50) {
      newErrors.coverLetter = 'La lettre de motivation doit contenir au moins 50 caractères';
    }

    if (!formData.proposedBudget.trim()) {
      newErrors.proposedBudget = 'Le budget proposé est requis';
    } else if (isNaN(Number(formData.proposedBudget)) || Number(formData.proposedBudget) <= 0) {
      newErrors.proposedBudget = 'Veuillez entrer un montant valide';
    }

    if (!formData.deliveryTime.trim()) {
      newErrors.deliveryTime = 'Le délai de livraison est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simuler l'envoi de la candidature
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      // Réinitialiser le formulaire
      setFormData({
        coverLetter: '',
        proposedBudget: '',
        deliveryTime: '',
        attachments: []
      });
      
      alert('Votre candidature a été envoyée avec succès !');
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi de la candidature. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Postuler à cette mission</h2>
            <p className="text-sm text-slate-600 mt-1">{missionTitle}</p>
            <p className="text-sm text-slate-500">Client: {clientName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Lettre de motivation */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Lettre de motivation *
            </label>
            <textarea
              value={formData.coverLetter}
              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
              placeholder="Expliquez pourquoi vous êtes le candidat idéal pour cette mission..."
              rows={6}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.coverLetter ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.coverLetter && (
              <p className="mt-1 text-sm text-red-600">{errors.coverLetter}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">
              {formData.coverLetter.length}/500 caractères
            </p>
          </div>

          {/* Budget proposé */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Budget proposé (FCFA) *
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.proposedBudget}
                onChange={(e) => handleInputChange('proposedBudget', e.target.value)}
                placeholder="Ex: 150000"
                min="0"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.proposedBudget ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              <span className="absolute right-3 top-2 text-slate-500 text-sm">FCFA</span>
            </div>
            {errors.proposedBudget && (
              <p className="mt-1 text-sm text-red-600">{errors.proposedBudget}</p>
            )}
          </div>

          {/* Délai de livraison */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Délai de livraison *
            </label>
            <select
              value={formData.deliveryTime}
              onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.deliveryTime ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Sélectionnez un délai</option>
              <option value="1-3 jours">1-3 jours</option>
              <option value="1 semaine">1 semaine</option>
              <option value="2 semaines">2 semaines</option>
              <option value="1 mois">1 mois</option>
              <option value="2-3 mois">2-3 mois</option>
              <option value="Plus de 3 mois">Plus de 3 mois</option>
            </select>
            {errors.deliveryTime && (
              <p className="mt-1 text-sm text-red-600">{errors.deliveryTime}</p>
            )}
          </div>

          {/* Pièces jointes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Pièces jointes (optionnel)
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-orange-600 hover:text-orange-700 font-medium"
              >
                Cliquez pour ajouter des fichiers
              </label>
              <p className="text-xs text-slate-500 mt-1">
                PDF, DOC, DOCX, JPG, PNG (max 5MB par fichier)
              </p>
            </div>

            {/* Liste des fichiers */}
            {formData.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                    <span className="text-sm text-slate-700 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
