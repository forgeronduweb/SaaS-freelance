"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ClientSignup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<{
        fullName: string;
        companyName: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        companyLogo: File | null;
        acceptTerms: boolean;
    }>({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        companyLogo: null,
        acceptTerms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({
            ...prev,
            companyLogo: file
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        // Validation des mots de passe
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            setIsLoading(false);
            return;
        }
        
        if (formData.password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            setIsLoading(false);
            return;
        }
        
        if (!formData.acceptTerms) {
            setError("Vous devez accepter les conditions d'utilisation");
            setIsLoading(false);
            return;
        }

        try {
            // Préparer les données pour l'API
            const registrationData = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                role: 'CLIENT',
                companyName: formData.companyName
            };

            console.log('Envoi des données:', registrationData);

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            console.log('Réponse reçue:', response.status, response.statusText);

            const data = await response.json();
            console.log('Données reçues:', data);

            if (!response.ok) {
                console.error('Erreur API:', data);
                setError(data.message || `Erreur HTTP: ${response.status}`);
                return;
            }

            // Stocker le token et les informations utilisateur
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirection vers le dashboard client
            router.push('/dashboard/client');
        } catch (error) {
            console.error('Erreur d\'inscription:', error);
            setError('Erreur de connexion. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-4 md:px-16 lg:px-24 xl:px-32 md:py-6 w-full z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-orange-50/30 to-transparent'
            }`}>
                {/* Logo */}
                <Link href="/">
                    <Image 
                        src="/logo.png" 
                        alt="AfriLance Logo" 
                        width={32} 
                        height={32}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                    />
                </Link>

            </nav>

            {/* Contenu principal avec padding-top pour compenser la navbar fixe */}
            <div className="max-w-lg mx-auto px-4 pt-16 sm:pt-20 pb-8 sm:pb-12">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">
                        Créer mon compte Client
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600">
                        Trouvez les meilleurs freelances africains pour vos projets
                    </p>
                </div>

                {/* Formulaire */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {/* Informations de base */}
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                                    Nom complet *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Votre nom complet"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                                    Nom de l&apos;entreprise
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Nom de votre entreprise (optionnel)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="+225 XX XX XX XX (optionnel)"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Utile pour le support client
                                </p>
                            </div>
                        </div>

                        {/* Sécurité */}
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                                Sécurité
                            </h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                                    Mot de passe *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10 sm:pr-12"
                                        placeholder="Min 8 caractères"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                                    >
                                        {showPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                                    Confirmer le mot de passe *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10 sm:pr-12"
                                        placeholder="Confirmer le mot de passe"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                                    >
                                        {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Logo entreprise */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                                Logo de l&apos;entreprise
                            </h3>
                            <p className="text-sm text-slate-600">
                                Optionnel mais recommandé pour renforcer votre crédibilité
                            </p>
                            
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center">
                                    {formData.companyLogo ? (
                                        <Image 
                                            src={URL.createObjectURL(formData.companyLogo)} 
                                            alt="Logo" 
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    )}
                                </div>
                                <label className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                                    Choisir un logo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Conditions */}
                        <div className="space-y-4">
                            <label className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500 mt-1"
                                    required
                                />
                                <span className="text-sm text-slate-700">
                                    J&apos;accepte les{" "}
                                    <Link href="/terms" className="text-orange-600 hover:underline">
                                        Conditions Générales d&apos;Utilisation
                                    </Link>{" "}
                                    et la{" "}
                                    <Link href="/privacy" className="text-orange-600 hover:underline">
                                        Politique de confidentialité
                                    </Link>
                                </span>
                            </label>
                        </div>

                        {/* Bouton de soumission */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                        >
                            {isLoading ? 'Création en cours...' : 'Créer mon compte Client'}
                        </button>
                    </form>

                    {/* Lien vers connexion */}
                    <div className="text-center mt-6 pt-6 border-t border-slate-200">
                        <p className="text-slate-600">
                            Vous avez déjà un compte ?{" "}
                            <Link href="/login" className="text-orange-600 hover:underline font-medium">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientSignup;
