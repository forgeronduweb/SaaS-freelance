"use client";
import Link from "next/link";
import Navbar from "./navbar";

export default function Hero() {
  return (
    <>
      
      <section
        className="bg-gradient-to-b from-orange-50/30 via-white to-white bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] 
        w-screen bg-no-repeat bg-cover bg-center text-sm pb-16 md:pb-44 border-0 rounded-none m-0 font-[var(--font-poppins)] min-h-screen flex flex-col justify-center items-center overflow-hidden"
      >
      <div className="w-full">
        <Navbar />
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 space-y-8 md:space-y-12 mt-16 md:mt-20">

        {/* Announcement */}
        <div className="flex items-center gap-1 sm:gap-2 border border-slate-300 hover:border-slate-400/70 rounded-full w-max mx-auto px-2 sm:px-4 py-1.5 sm:py-2 max-w-[95vw]">
        <span className="text-slate-700 text-base sm:text-base">
          <span className="hidden sm:inline">🚀 Nouveau : </span>
          <span className="sm:hidden">🚀 </span>
          <span className="text-orange-600 font-medium">Mobile Money</span>
          <span className="hidden sm:inline"> disponibles</span>
        </span>
        <button className="flex items-center gap-1 font-medium text-base sm:text-base">
          <span className="hidden sm:inline">En savoir plus</span>
          <span className="sm:hidden">+</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden sm:block"
          >
            <path
              d="M3.959 9.5h11.083m0 0L9.501 3.958M15.042 9.5l-5.541 5.54"
              stroke="#ea580c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

        {/* Title */}
        <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-7xl font-medium max-w-[90vw] md:max-w-[850px] text-center mx-auto text-slate-800 leading-tight">
          La plateforme de <span className="text-orange-600">freelancing africaine</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-base mx-auto max-w-[90vw] md:max-w-2xl text-center text-slate-600 leading-relaxed">
          Connectez-vous avec les meilleurs <span className="text-orange-600 font-medium">freelances africains</span>. Paiements sécurisés via Mobile Money, accompagnement personnalisé et visibilité garantie.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[90vw] sm:max-w-none">
          <Link href="/signup/freelance" className="w-auto bg-orange-600 hover:bg-orange-700 text-white px-12 sm:px-14 py-2.5 sm:py-3 rounded-full font-medium transition text-base md:text-base flex items-center justify-center">
            <span>Je suis Freelance</span>
          </Link>
          <Link href="/quote-request" className="w-auto flex items-center justify-center gap-2 border border-orange-300 hover:bg-orange-50 text-orange-700 rounded-full px-8 sm:px-10 py-2.5 sm:py-3 transition text-base md:text-base">
            <span>Je cherche un Freelance</span>
          <svg
            width="6"
            height="8"
            viewBox="0 0 6 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25.5 4.75 4l-3.5 3.5"
              stroke="#ea580c"
              strokeOpacity=".7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            </svg>
          </Link>
        </div>
      </div>
      </section>
    </>
  );
}
