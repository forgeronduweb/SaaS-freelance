"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FreelanceSignup = () => {
    const [formData, setFormData] = useState<{
        fullName: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        categories: string[];
        country: string;
        city: string;
        profilePhoto: File | null;
        portfolio: File[];
        acceptTerms: boolean;
    }>({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        categories: [],
        country: "",
        city: "",
        profilePhoto: null,
        portfolio: [],
        acceptTerms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const serviceCategories = [
        "Développement Web & Mobile",
        "Design Graphique",
        "Rédaction & Traduction",
        "Marketing Digital"
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCategoryChange = (category: string) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const files = Array.from(e.target.files || []);
        if (type === 'portfolio') {
            setFormData(prev => ({
                ...prev,
                portfolio: [...prev.portfolio, ...files].slice(0, 3) // Max 3 pour gratuit
            }));
        } else if (type === 'photo') {
            setFormData(prev => ({
                ...prev,
                profilePhoto: files[0]
            }));
        }
    };

    const removePortfolioItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            portfolio: prev.portfolio.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique de soumission
        console.log("Données du formulaire:", formData);
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
            <div className="max-w-2xl mx-auto px-4 pt-16 sm:pt-20 pb-8 sm:pb-12">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">
                        Créer mon profil Freelance
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600">
                        Rejoignez des milliers de freelances africains sur AfriLance
                    </p>
                </div>

                {/* Formulaire */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {/* Informations personnelles */}
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                                Informations personnelles
                            </h3>
                            
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        Téléphone *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="+225 XX XX XX XX"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                                        Pays
                                    </label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    >
                                        <option value="">Sélectionner un pays</option>
                                        <option value="CI">Côte d&apos;Ivoire</option>
                                        <option value="SN">Sénégal</option>
                                        <option value="ML">Mali</option>
                                        <option value="BF">Burkina Faso</option>
                                        <option value="GH">Ghana</option>
                                        <option value="NG">Nigeria</option>
                                        <option value="CM">Cameroun</option>
                                        <option value="MA">Maroc</option>
                                        <option value="TN">Tunisie</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                                        Ville
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Votre ville"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sécurité */}
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                                Sécurité
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div>

                        {/* Services proposés */}
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                                Services proposés *
                            </h3>
                            <p className="text-sm text-slate-600">Sélectionnez vos domaines de compétence</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {serviceCategories.map((category) => (
                                    <label key={category} className="flex items-center p-3 border border-slate-300 rounded-lg hover:bg-orange-50 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.categories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                            className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
                                        />
                                        <span className="ml-3 text-sm text-slate-700">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Photo de profil */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                                Photo de profil *
                            </h3>
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                                    {formData.profilePhoto ? (
                                        <Image 
                                            src={URL.createObjectURL(formData.profilePhoto)} 
                                            alt="Photo de profil" 
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                    ) : (
                                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    )}
                                </div>
                                <label className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                                    Choisir une photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, 'photo')}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Portfolio */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                                Portfolio (max 3 projets en gratuit)
                            </h3>
                            
                            <div className="space-y-3">
                                {formData.portfolio.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                        <span className="text-sm text-slate-700">{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removePortfolioItem(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                
                                {formData.portfolio.length < 3 && (
                                    <label className="cursor-pointer border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                                        <div className="space-y-2">
                                            <svg className="w-8 h-8 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="text-sm text-slate-600">Ajouter un projet</p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,.pdf,.doc,.docx"
                                            onChange={(e) => handleFileUpload(e, 'portfolio')}
                                            className="hidden"
                                        />
                                    </label>
                                )}
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
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                        >
                            Créer mon profil Freelance
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

export default FreelanceSignup;
