"use client";
import React from "react";
import Link from "next/link";
import ContactForm from '@/components/forms/ContactForm';

interface FreelanceCardProps {
    freelance: {
        id: string;
        name: string;
        title: string;
        avatar?: string;
        skills: string[];
        rating: number;
        totalReviews: number;
        hourlyRate: string;
        availability: string;
        location: string;
        completedProjects: number;
    };
}

const FreelanceCard = ({ freelance }: FreelanceCardProps) => {
    const [showContactForm, setShowContactForm] = React.useState(false);
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-slate-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {freelance.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-800 truncate">{freelance.name}</h3>
                    <p className="text-orange-600 font-medium mb-2">{freelance.title}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{freelance.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex">{renderStars(Math.floor(freelance.rating))}</div>
                        <span className="text-sm font-medium text-slate-700">{freelance.rating}</span>
                        <span className="text-sm text-slate-500">({freelance.totalReviews})</span>
                    </div>
                </div>
            </div>

            {/* Compétences clés (3 max) */}
            <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                    {freelance.skills.slice(0, 3).map((skill, index) => (
                        <span
                            key={index}
                            className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-sm font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                    {freelance.skills.length > 3 && (
                        <span className="text-sm text-slate-500">
                            +{freelance.skills.length - 3} autres
                        </span>
                    )}
                </div>
            </div>

            {/* Informations rapides */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                    <span className="text-slate-600">Tarif horaire</span>
                    <p className="font-medium text-slate-800">{freelance.hourlyRate}</p>
                </div>
                <div>
                    <span className="text-slate-600">Projets terminés</span>
                    <p className="font-medium text-slate-800">{freelance.completedProjects}</p>
                </div>
            </div>

            {/* Disponibilité */}
            <div className="mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">{freelance.availability}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <Link href={`/freelances/${freelance.id}`} className="flex-1">
                    <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                        Voir profil
                    </button>
                </Link>
                <button 
                    onClick={() => setShowContactForm(true)}
                    className="border border-orange-600 text-orange-600 py-2 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            </div>

            {/* Modal de contact */}
            {showContactForm && (
                <ContactForm
                    recipientName={freelance.name}
                    recipientType="freelance"
                    recipientId={freelance.id}
                    onClose={() => setShowContactForm(false)}
                />
            )}
        </div>
    );
};

export default FreelanceCard;
