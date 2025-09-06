"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { useAuth } from "../../hooks/useAuth";

interface FreelanceProfileProps {
    freelanceId?: string;
}

const FreelanceProfile: React.FC<FreelanceProfileProps> = ({ freelanceId }) => {
    const { user, loading } = useAuth();
    const [profileData, setProfileData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (user) {
            setProfileData(user);
            setFormData({
                fullName: user.fullName || '',
                title: user.title || '',
                bio: user.bio || '',
                location: user.location || '',
                hourlyRate: user.hourlyRate || '',
                skills: user.skills || [],
                phone: user.phone || '',
                website: user.website || '',
                linkedin: user.linkedin || '',
                github: user.github || ''
            });
        }
    }, [user]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setProfileData(updatedUser.data);
                setIsEditing(false);
                alert('Profil mis à jour avec succès !');
            } else {
                alert('Erreur lors de la mise à jour du profil');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la mise à jour du profil');
        }
    };

    const addSkill = (skill: string) => {
        if (skill && !formData.skills.includes(skill)) {
            setFormData({
                ...formData,
                skills: [...formData.skills, skill]
            });
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((skill: string) => skill !== skillToRemove)
        });
    };

    if (loading) {
        return (
            <DashboardLayout userType="freelance">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout userType="freelance" pageTitle="Mon Profil">
            <div className="space-y-6">
                {/* Header avec bouton d'édition */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Mon Profil</h1>
                        <p className="text-slate-600 mt-1">Gérez vos informations professionnelles</p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="w-full sm:w-auto px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium touch-manipulation min-h-[44px]"
                    >
                        {isEditing ? 'Annuler' : 'Modifier le profil'}
                    </button>
                </div>

                {/* Profil principal */}
                <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-orange-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                                {profileData?.fullName ? profileData.fullName.split(' ').map((n: string) => n[0]).join('') : 'U'}
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center sm:text-left">
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Nom complet</label>
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Titre professionnel</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Biographie</label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Localisation</label>
                                            <input
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Tarif horaire (FCFA)</label>
                                            <input
                                                type="number"
                                                value={formData.hourlyRate}
                                                onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            onClick={handleSave}
                                            className="flex-1 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium touch-manipulation min-h-[44px]"
                                        >
                                            Sauvegarder
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium touch-manipulation min-h-[44px]"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                                        {profileData?.fullName || 'Nom non défini'}
                                    </h1>
                                    <p className="text-lg text-orange-600 font-medium mb-2">
                                        {profileData?.title || 'Titre non défini'}
                                    </p>
                                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 mb-4">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{formData.location || 'Localisation non définie'}</span>
                                    </div>
                                    <div className="flex items-center justify-center sm:justify-start gap-6 mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-slate-800">{profileData?.rating || 0}/5</span>
                                            <span className="text-slate-600">({profileData?.totalReviews || 0} avis)</span>
                                        </div>
                                        <div className="text-slate-600">
                                            {profileData?.completedProjects || 0} projets terminés
                                        </div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">
                                        {profileData?.bio || 'Aucune biographie définie'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Compétences */}
                <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-800">Compétences</h2>
                        {isEditing && (
                            <div className="flex gap-2 mt-2 sm:mt-0">
                                <input
                                    type="text"
                                    placeholder="Nouvelle compétence"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            addSkill((e.target as HTMLInputElement).value);
                                            (e.target as HTMLInputElement).value = '';
                                        }
                                    }}
                                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.skills?.map((skill: string, index: number) => (
                            <span
                                key={index}
                                className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                            >
                                {skill}
                                {isEditing && (
                                    <button
                                        onClick={() => removeSkill(skill)}
                                        className="text-orange-500 hover:text-orange-700"
                                    >
                                        ×
                                    </button>
                                )}
                            </span>
                        ))}
                        {(!formData.skills || formData.skills.length === 0) && (
                            <p className="text-slate-500">Aucune compétence définie</p>
                        )}
                    </div>
                </div>

                {/* Informations de contact */}
                <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-6">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Informations de contact</h2>
                    {isEditing ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Site web</label>
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn</label>
                                <input
                                    type="url"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">GitHub</label>
                                <input
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-slate-600">Email</span>
                                <p className="font-medium text-slate-800">{profileData?.email || 'Non défini'}</p>
                            </div>
                            <div>
                                <span className="text-sm text-slate-600">Téléphone</span>
                                <p className="font-medium text-slate-800">{formData.phone || 'Non défini'}</p>
                            </div>
                            <div>
                                <span className="text-sm text-slate-600">Tarif horaire</span>
                                <p className="font-medium text-slate-800">
                                    {formData.hourlyRate ? `${formData.hourlyRate} FCFA` : 'Non défini'}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-slate-600">Site web</span>
                                <p className="font-medium text-slate-800">{formData.website || 'Non défini'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FreelanceProfile;
