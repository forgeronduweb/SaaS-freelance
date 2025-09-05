'use client';

import React, { useState } from 'react';

interface ContactFormProps {
  recipientName: string;
  recipientType: 'freelance' | 'client';
  recipientId: string;
  onSubmit?: (data: ContactData) => void;
  onClose?: () => void;
}

interface ContactData {
  subject: string;
  message: string;
  contactMethod: 'message' | 'email' | 'phone';
  urgency: 'low' | 'medium' | 'high';
}

const ContactForm = ({ recipientName, recipientType, onSubmit, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactData>({
    subject: '',
    message: '',
    contactMethod: 'message',
    urgency: 'medium'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactData>>({});

  const handleInputChange = (field: keyof ContactData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactData> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'Le sujet doit contenir au moins 5 caractères';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 20) {
      newErrors.message = 'Le message doit contenir au moins 20 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simuler l'envoi du message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      // Réinitialiser le formulaire
      setFormData({
        subject: '',
        message: '',
        contactMethod: 'message',
        urgency: 'medium'
      });
      
      alert('Votre message a été envoyé avec succès !');
      
      if (onClose) {
        onClose();
      }
    } catch {
      alert('Erreur lors de l&apos;envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const urgencyColors = {
    low: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    high: 'text-red-600 bg-red-50 border-red-200'
  };

  const urgencyLabels = {
    low: 'Faible',
    medium: 'Normale',
    high: 'Urgente'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Contacter {recipientType === 'freelance' ? 'le freelance' : 'le client'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">{recipientName}</p>
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
          {/* Méthode de contact */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Méthode de contact préférée
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="contactMethod"
                  value="message"
                  checked={formData.contactMethod === 'message'}
                  onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm font-medium">Message</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={formData.contactMethod === 'email'}
                  onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">Email</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={formData.contactMethod === 'phone'}
                  onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm font-medium">Téléphone</span>
                </div>
              </label>
            </div>
          </div>

          {/* Niveau d'urgence */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Niveau d'urgence
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(urgencyLabels).map(([value, label]) => (
                <label
                  key={value}
                  className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.urgency === value
                      ? urgencyColors[value as keyof typeof urgencyColors]
                      : 'border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="urgency"
                    value={value}
                    checked={formData.urgency === value}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sujet */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sujet *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Ex: Demande de devis pour développement web"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.subject ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Message *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Décrivez votre demande en détail..."
              rows={6}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.message ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">
              {formData.message.length}/1000 caractères
            </p>
          </div>

          {/* Info sur la réponse */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-orange-800">Temps de réponse estimé</h4>
                <p className="text-sm text-orange-700 mt-1">
                  {recipientType === 'freelance' 
                    ? 'Les freelances répondent généralement sous 24h'
                    : 'Les clients répondent généralement sous 48h'
                  }
                </p>
              </div>
            </div>
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
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
