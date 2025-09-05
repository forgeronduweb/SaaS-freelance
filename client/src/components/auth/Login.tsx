"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

const Login = () => {
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
        rememberMe: boolean;
    }>({
        email: "",
        password: "",
        rememberMe: false
    });

    const [showPassword, setShowPassword] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            console.log('Tentative de connexion avec:', { email: formData.email, password: '***' });
            
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });

            const data = await response.json();
            console.log('Réponse de connexion:', data);

            if (data.success) {
                console.log('Connexion réussie, données reçues:', data.data);
                
                // Vérifier la structure des données
                if (!data.data?.token || !data.data?.user) {
                    console.error('Structure de données invalide:', data);
                    setError('Réponse du serveur invalide');
                    return;
                }
                
                console.log('Token reçu:', data.data.token);
                console.log('Utilisateur:', data.data.user);
                
                // Stocker le token et les infos utilisateur
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                
                // Définir le cookie pour le middleware avec SameSite
                document.cookie = `token=${data.data.token}; path=/; max-age=604800; SameSite=Lax; Secure=false`;
                console.log('Cookie défini avec token:', data.data.token.substring(0, 20) + '...');
                
                // Faire un appel API pour définir le cookie côté serveur aussi
                try {
                    await fetch('/api/auth/set-cookie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: data.data.token }),
                    });
                } catch (e) {
                    console.log('Erreur lors de la définition du cookie serveur:', e);
                }
                
                // Attendre un peu pour que le cookie soit défini
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Rediriger selon le rôle avec router.push au lieu de window.location
                const targetUrl = data.data.user?.role === 'FREELANCE' ? '/dashboard/freelance' : 
                                 data.data.user?.role === 'CLIENT' ? '/dashboard/client' : '/dashboard';
                
                console.log('Redirection vers:', targetUrl);
                
                // Test simple : redirection avec window.location
                window.location.href = targetUrl;
            } else {
                setError(data.error || data.message || 'Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
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

                {/* Boutons d'inscription */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link 
                        href="/signup/freelance"
                        className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
                    >
                        Je suis Freelance
                    </Link>
                    <Link 
                        href="/signup/client"
                        className="px-2 sm:px-4 py-1 sm:py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-medium rounded-md sm:rounded-lg transition-colors"
                    >
                        <span className="sm:hidden">Client</span>
                        <span className="hidden sm:inline">Je cherche un Freelance</span>
                    </Link>
                </div>

            </nav>

            {/* Contenu principal avec padding-top pour compenser la navbar fixe */}
            <div className="flex items-center justify-center min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12 px-4">
                <div className="max-w-sm w-full">
                    {/* Header */}
                    <div className="text-center mb-4 sm:mb-6">
                        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-1 sm:mb-2">
                            Connexion
                        </h1>
                        <p className="text-slate-600 text-xs sm:text-sm">
                            Accédez à votre espace AfriLance
                        </p>
                    </div>

                    {/* Formulaire */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                                    Email
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
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? (
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs sm:text-sm">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                                    />
                                    <span className="ml-2 text-slate-600">Se souvenir de moi</span>
                                </label>
                                <Link href="/forgot-password" className="text-orange-600 hover:text-orange-500">
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Connexion...
                                    </>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>
                        </form>

                        {/* Séparateur */}
                        <div className="my-4 sm:my-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-300" />
                                </div>
                                <div className="relative flex justify-center text-xs sm:text-sm">
                                    <span className="px-2 bg-white text-slate-500">ou</span>
                                </div>
                            </div>
                        </div>

                        {/* Boutons sociaux */}
                        <div className="space-y-2 sm:space-y-3">
                            <button className="w-full flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition duration-200">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span className="text-slate-700 font-medium text-sm sm:text-base">Continuer avec Google</span>
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-600">
                            En vous connectant, vous acceptez nos{" "}
                            <Link href="/terms" className="text-orange-600 hover:underline">
                                Conditions d&apos;utilisation
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
