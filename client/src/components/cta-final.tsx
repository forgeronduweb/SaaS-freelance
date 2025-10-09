"use client";
import React from "react";
import Link from "next/link";

const CTAFinal = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-slate-50 to-orange-50">
            <div className="px-4 md:px-16 lg:px-24 xl:px-32">
                <div className="text-center">
                    <div className="bg-gradient-to-r from-orange-600/30 to-orange-500/40 rounded-2xl p-1 shadow-xl">
                        <div className="flex flex-col items-center justify-center text-center py-12 md:py-16 rounded-2xl bg-white border border-orange-100">  
                    <div className="flex items-center justify-center bg-white px-3 py-1.5 shadow gap-1 rounded-full text-xs">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 0L9.5 5.5L15 7.5L9.5 9.5L7.5 15L5.5 9.5L0 7.5L5.5 5.5Z" fill="#ea580c"/>
                        </svg>
                        <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent font-medium">Déjà +-- freelances inscrits</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-4xl font-medium mt-4 text-slate-800">
                        Rejoins la 1&egrave;re plateforme de <br />
                        <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">freelances africains</span> 
                        de confiance
                    </h2>
                    
                    <p className="text-slate-600 mt-4 max-w-lg max-md:text-sm">
                        Inscris-toi gratuitement et commence à trouver des missions ou des talents dès aujourd&apos;hui. 100% gratuit pour commencer.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link href="/signup/freelance">
                            <button 
                                type="button" 
                                className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-sm px-8 py-3 rounded-xl font-medium hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
                            > 
                                Je suis Freelance
                            </button>
                        </Link>
                        
                        <Link href="/signup/client">
                            <button 
                                type="button" 
                                className="bg-white text-orange-600 border-2 border-orange-600 text-sm px-8 py-3 rounded-xl font-medium hover:bg-orange-50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
                            > 
                                Je cherche un freelance
                            </button>
                        </Link>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTAFinal;
