"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { useAuth } from "../../../hooks/useAuth";

const FreelanceMissions = () => {
    const { user, loading } = useAuth();
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/missions', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setMissions(data.data?.missions || []);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des missions:', error);
            }
        };

        if (user) {
            fetchMissions();
        }
    }, [user]);

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
        <DashboardLayout userType="freelance" pageTitle="Missions">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Missions Disponibles</h1>
                    <p className="text-slate-600 mt-1">Trouvez des missions qui correspondent à vos compétences</p>
                </div>

                {/* Missions List */}
                <div className="bg-white rounded-lg border border-slate-200">
                    <div className="p-4 md:p-6">
                        <div className="space-y-4">
                            {missions.length > 0 ? (
                                missions.map((mission: any) => (
                                    <div key={mission.id} className="border border-slate-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-slate-800">{mission.title}</h3>
                                                <p className="text-sm text-slate-600 mt-1">{mission.category}</p>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <p className="font-semibold text-orange-600">{mission.budget} FCFA</p>
                                                <p className="text-sm text-slate-500">{mission.deadline}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{mission.description}</p>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div className="flex items-center space-x-2">
                                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                                    {mission.status === 'OPEN' ? 'Ouvert' : mission.status}
                                                </span>
                                            </div>
                                            <button className="w-full sm:w-auto px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors touch-manipulation min-h-[44px]">
                                                Postuler
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-800 mb-2">Aucune mission disponible</h3>
                                    <p className="text-slate-500">Les nouvelles missions apparaîtront ici</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FreelanceMissions;
