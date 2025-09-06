import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function ClientFreelancesPage() {
    return (
        <DashboardLayout userType="client" pageTitle="Freelances engagés">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-800">Freelances engagés</h1>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <p className="text-slate-600">Contenu des freelances engagés à implémenter</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
