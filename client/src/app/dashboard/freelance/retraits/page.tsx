import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function FreelanceRetraitsPage() {
    return (
        <DashboardLayout userType="freelance" pageTitle="Retraits">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-800">Retraits</h1>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <p className="text-slate-600">Contenu des retraits à implémenter</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
