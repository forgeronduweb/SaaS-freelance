"use client";
import React, { useState, useEffect } from "react";

interface FormData {
    fullName: string;
    email: string;
    company: string;
    phone: string;
    projectType: string;
    budget: string;
    deadline: string;
    objectives: string;
    features: string[];
    reference: string;
    attachment: File | null;
}

interface ValidationErrors {
    [key: string]: string;
}

const QuoteForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        budget: "",
        deadline: "",
        objectives: "",
        features: [],
        reference: "",
        attachment: null
    });
    
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        setShowAnimation(true);
        const timer = setTimeout(() => setShowAnimation(false), 300);
        return () => clearTimeout(timer);
    }, [currentStep]);

    const projectTypes = [
        { 
            id: "web-dev", 
            name: "Développement Web", 
            icon: "🌐",
            description: "Sites web, applications web, e-commerce"
        },
        { 
            id: "mobile-dev", 
            name: "Développement Mobile", 
            icon: "📱",
            description: "Applications iOS, Android, React Native"
        },
        { 
            id: "design", 
            name: "Design & UI/UX", 
            icon: "🎨",
            description: "Interface utilisateur, branding, logos"
        },
        { 
            id: "marketing", 
            name: "Marketing Digital", 
            icon: "📈",
            description: "SEO, réseaux sociaux, publicité en ligne"
        },
        { 
            id: "content", 
            name: "Rédaction de Contenu", 
            icon: "✍️",
            description: "Articles, copywriting, traduction"
        },
        { 
            id: "data", 
            name: "Data & Analytics", 
            icon: "📊",
            description: "Analyse de données, BI, reporting"
        },
        { 
            id: "consulting", 
            name: "Conseil & Stratégie", 
            icon: "💼",
            description: "Conseil business, audit, formation"
        },
        { 
            id: "other", 
            name: "Autre", 
            icon: "🔧",
            description: "Décrivez votre projet spécifique"
        }
    ];

    const budgetRanges = [
        { range: "< 100k", label: "Moins de 100 000 FCFA", description: "Projet simple" },
        { range: "100k-300k", label: "100 000 - 300 000 FCFA", description: "Projet standard" },
        { range: "300k-500k", label: "300 000 - 500 000 FCFA", description: "Projet avancé" },
        { range: "500k-1M", label: "500 000 - 1 000 000 FCFA", description: "Projet complexe" },
        { range: "1M-2M", label: "1 000 000 - 2 000 000 FCFA", description: "Projet premium" },
        { range: "> 2M", label: "Plus de 2 000 000 FCFA", description: "Projet entreprise" }
    ];

    const commonFeatures = [
        "Interface responsive (mobile/desktop)",
        "Système d'authentification",
        "Base de données",
        "Paiement en ligne",
        "Tableau de bord admin",
        "API REST",
        "Notifications push",
        "Chat en temps réel",
        "Géolocalisation",
        "Intégration réseaux sociaux",
        "Système de commentaires",
        "Multi-langues"
    ];

    const steps = [
        {
            id: "contact",
            title: "Vos informations de contact",
            subtitle: "Pour que nos freelances puissent vous contacter",
            icon: "👋"
        },
        {
            id: "projectType",
            title: "Quel type de projet ?",
            subtitle: "Choisissez la catégorie qui correspond le mieux",
            icon: "🎯"
        },
        {
            id: "budget",
            title: "Votre budget estimé",
            subtitle: "Cela nous aide à vous proposer les bons profils",
            icon: "💰"
        },
        {
            id: "timeline",
            title: "Délai souhaité",
            subtitle: "Quand souhaitez-vous commencer et finir ?",
            icon: "⏰"
        },
        {
            id: "details",
            title: "Détails du projet",
            subtitle: "Décrivez vos objectifs et besoins",
            icon: "📝"
        },
        {
            id: "features",
            title: "Fonctionnalités souhaitées",
            subtitle: "Sélectionnez les fonctionnalités importantes",
            icon: "⚡"
        },
        {
            id: "extras",
            title: "Informations complémentaires",
            subtitle: "Références et fichiers (optionnel)",
            icon: "📎"
        }
    ];

    // Validation functions
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone);
    };

    const validateStep = (stepId: string): boolean => {
        setErrors({});
        
        switch (stepId) {
            case "contact":
                const newErrors: ValidationErrors = {};
                if (!formData.fullName.trim()) newErrors.fullName = "Le nom est requis";
                if (!formData.email.trim()) newErrors.email = "L'email est requis";
                else if (!validateEmail(formData.email)) newErrors.email = "Email invalide";
                if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
                else if (!validatePhone(formData.phone)) newErrors.phone = "Numéro invalide";
                
                setErrors(newErrors);
                return Object.keys(newErrors).length === 0;
                
            case "projectType":
                return formData.projectType !== "";
                
            case "budget":
                return formData.budget !== "";
                
            case "timeline":
                return formData.deadline !== "";
                
            case "details":
                return formData.objectives.trim().length >= 20;
                
            default:
                return true;
        }
    };

    const handleInputChange = (field: keyof FormData, value: string | File | null | string[]) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear errors when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const handleNext = () => {
        const currentStepData = steps[currentStep];
        if (validateStep(currentStepData.id)) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
            setShowAnimation(false);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
        setShowAnimation(false);
    };

    const handleSubmit = async () => {
        if (!validateStep(steps[currentStep].id)) return;
        
        setIsLoading(true);
        
        // Simulation d'envoi avec données complètes
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Données du formulaire:", formData);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Erreur lors de l'envoi:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setCurrentStep(0);
        setErrors({});
        setFormData({
            fullName: "",
            email: "",
            company: "",
            phone: "",
            projectType: "",
            budget: "",
            deadline: "",
            objectives: "",
            features: [],
            reference: "",
            attachment: null
        });
    };

    const toggleFeature = (feature: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
                <div className="max-w-2xl w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-800 mb-6">Demande envoyée avec succès !</h2>
                    <p className="text-xl text-slate-600 leading-relaxed mb-8">
                        Merci pour votre demande ! Votre projet a bien été enregistré et sera partagé avec nos freelances vérifiés. 
                        Vous recevrez prochainement des propositions directement par email depuis <strong>propositio@mail.com</strong>.
                    </p>
                    <button
                        onClick={resetForm}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-medium transition-colors text-lg"
                    >
                        Nouvelle demande
                    </button>
                </div>
            </div>
        );
    }

    const currentStepData = steps[currentStep];
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col">
            {/* Barre de progression */}
            <div className="w-full bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">
                            Étape {currentStep + 1} sur {steps.length}
                        </span>
                        <span className="text-sm font-medium text-orange-600">
                            {Math.round(progress)}% terminé
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                            className="bg-orange-600 h-2 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-2xl w-full">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                            {currentStepData.title}
                        </h1>
                        <p className="text-xl text-slate-600">
                            {currentStepData.subtitle}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                        {/* Champ de saisie selon le type */}
                        {currentStepData.type === "text" && (
                            <input
                                type="text"
                                value={formData[currentStepData.id as keyof FormData] as string}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder={currentStepData.placeholder}
                                className="w-full px-6 py-4 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                autoFocus
                            />
                        )}

                        {currentStepData.type === "email" && (
                            <input
                                type="email"
                                value={formData[currentStepData.id as keyof FormData] as string}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder={currentStepData.placeholder}
                                className="w-full px-6 py-4 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                autoFocus
                            />
                        )}

                        {currentStepData.type === "select" && (
                            <div className="space-y-3">
                                {currentStepData.options?.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleInputChange(option)}
                                        className={`w-full p-4 text-left border-2 rounded-lg transition-all hover:border-orange-300 ${
                                            formData[currentStepData.id as keyof FormData] === option
                                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                : 'border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <span className="text-lg">{option}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentStepData.type === "date" && (
                            <input
                                type="date"
                                value={formData[currentStepData.id as keyof FormData] as string}
                                onChange={(e) => handleInputChange(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-6 py-4 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                autoFocus
                            />
                        )}

                        {currentStepData.type === "textarea" && (
                            <textarea
                                value={formData[currentStepData.id as keyof FormData] as string}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder={currentStepData.placeholder}
                                rows={6}
                                className="w-full px-6 py-4 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                                autoFocus
                            />
                        )}

                        {currentStepData.type === "file" && (
                            <div>
                                <input
                                    type="file"
                                    onChange={(e) => handleInputChange(e.target.files?.[0] || null)}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                                    className="w-full px-6 py-4 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                />
                                <p className="text-sm text-slate-500 mt-3">
                                    Formats acceptés: PDF, DOC, DOCX, JPG, PNG, ZIP (max 10MB)
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Boutons de navigation */}
                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Précédent
                        </button>

                        {currentStep === steps.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || (currentStepData.required && !isCurrentStepValid())}
                                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                        Envoi...
                                    </>
                                ) : (
                                    <>
                                        Envoyer ma demande
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={currentStepData.required && !isCurrentStepValid()}
                                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                            >
                                Suivant
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteForm;
