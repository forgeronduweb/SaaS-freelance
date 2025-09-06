"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ResetPassword = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: Success, 3: New Password
    const [formData, setFormData] = useState<{
        email: string;
        newPassword: string;
        confirmPassword: string;
    }>({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email pour réinitialisation:", formData.email);
        setStep(2);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Nouveau mot de passe:", formData);
        // Redirection vers login après succès
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <Image 
                            src="/logo.png" 
                            alt="AfriLance Logo" 
                            width={40} 
                            height={40}
                            className="w-10 h-10"
                        />
                        <span className="text-2xl font-bold text-orange-600">afrilance</span>
                    </Link>
                    <h1 className="text-3xl font-semibold text-slate-800 mb-2">
                        {step === 1 && "Mot de passe oublié"}
                        {step === 2 && "Email envoyé"}
                        {step === 3 && "Nouveau mot de passe"}
                    </h1>
                    <p className="text-slate-600">
                        {step === 1 && "Saisissez votre email pour recevoir un lien de réinitialisation"}
                        {step === 2 && "Vérifiez votre boîte email"}
                        {step === 3 && "Définissez votre nouveau mot de passe"}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Étape 1: Saisie email */}
                    {step === 1 && (
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Adresse email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Envoyer le lien de réinitialisation
                            </button>

                            <div className="text-center">
                                <Link 
                                    href="/login" 
                                    className="text-sm text-orange-600 hover:underline"
                                >
                                    ← Retour à la connexion
                                </Link>
                            </div>
                        </form>
                    )}

                    {/* Étape 2: Confirmation envoi */}
                    {step === 2 && (
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            
                            <div>
                                <p className="text-slate-700 mb-2">
                                    Un email a été envoyé à <strong>{formData.email}</strong>
                                </p>
                                <p className="text-sm text-slate-600">
                                    Cliquez sur le lien dans l&apos;email pour réinitialiser votre mot de passe.
                                    Le lien est valable pendant 15 minutes.
                                </p>
                            </div>

                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <p className="text-sm text-orange-800">
                                    <strong>Vous ne recevez pas l&apos;email ?</strong><br />
                                    Vérifiez vos spams ou 
                                    <button 
                                        onClick={() => setStep(1)}
                                        className="text-orange-600 hover:underline ml-1"
                                    >
                                        réessayez
                                    </button>
                                </p>
                            </div>

                            <Link 
                                href="/login"
                                className="inline-block text-sm text-orange-600 hover:underline"
                            >
                                ← Retour à la connexion
                            </Link>
                        </div>
                    )}

                    {/* Étape 3: Nouveau mot de passe */}
                    {step === 3 && (
                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Nouveau mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-12"
                                        placeholder="Min 8 caractères"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Confirmer le nouveau mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-12"
                                        placeholder="Confirmer le mot de passe"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-4">
                                <p className="text-sm text-slate-600">
                                    <strong>Votre mot de passe doit contenir :</strong>
                                </p>
                                <ul className="text-sm text-slate-600 mt-2 space-y-1">
                                    <li>• Au moins 8 caractères</li>
                                    <li>• Au moins un chiffre</li>
                                    <li>• Au moins un symbole</li>
                                </ul>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Réinitialiser le mot de passe
                            </button>
                        </form>
                    )}
                </div>

                {/* Bouton de test pour simuler l'étape 3 */}
                {step === 2 && (
                    <div className="text-center mt-4">
                        <button 
                            onClick={() => setStep(3)}
                            className="text-xs text-slate-400 hover:text-slate-600"
                        >
                            [Test] Simuler clic sur lien email
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
