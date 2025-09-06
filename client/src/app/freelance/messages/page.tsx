"use client";
import React from "react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";

const FreelanceMessages = () => {
    return (
        <DashboardLayout userType="freelance" pageTitle="Messages">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Messages</h1>
                    <p className="text-slate-600 mt-1">Communiquez avec vos clients</p>
                </div>

                {/* Messages Content */}
                <div className="bg-white rounded-lg border border-slate-200">
                    <div className="p-4 md:p-6">
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.991 8.991 0 01-4.92-1.487L3 21l2.487-5.08A8.991 8.991 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-slate-800 mb-2">Aucun message</h3>
                            <p className="text-slate-500">Vos conversations avec les clients apparaîtront ici</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FreelanceMessages;
