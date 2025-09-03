"use client";
import Navbar from "./navbar";

export default function Hero() {
  return (
    <>
      
      <section
        className="bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] 
        w-full bg-no-repeat bg-cover bg-center text-sm pb-44 border-2 border-slate-200 md:border-0 rounded-lg md:rounded-none mx-2 md:mx-0 mt-2 md:mt-0 font-[var(--font-poppins)]"
      >
      <Navbar />

      {/* Announcement */}
      <div className="flex items-center gap-2 border border-slate-300 hover:border-slate-400/70 rounded-full w-max mx-auto px-4 py-2 mt-40 md:mt-32">
        <span className="text-slate-700">🚀 Nouveau : <span className="text-orange-600 font-medium">Paiements Mobile Money</span> disponibles</span>
        <button className="flex items-center gap-1 font-medium">
          <span>En savoir plus</span>
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
      <h5 className="text-4xl md:text-7xl font-medium max-w-[850px] text-center mx-auto mt-8 text-slate-800">
        La plateforme de <span className="text-orange-600">freelancing africaine</span>
      </h5>

      {/* Subtitle */}
      <p className="text-sm md:text-base mx-auto max-w-2xl text-center mt-6 max-md:px-2 text-slate-600">
        Connectez-vous avec les meilleurs <span className="text-orange-600 font-medium">freelances africains</span>. Paiements sécurisés via Mobile Money, 
        accompagnement personnalisé et visibilité garantie pour tous les talents du continent.
      </p>

      {/* CTA buttons */}
      <div className="mx-auto w-full flex items-center justify-center gap-3 mt-4">
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition">
          Je suis Freelance
        </button>
        <button className="flex items-center gap-2 border border-orange-300 hover:bg-orange-50 text-orange-700 rounded-full px-6 py-3 transition">
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
        </button>
      </div>
      </section>
    </>
  );
}
