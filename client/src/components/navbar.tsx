"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-2 md:px-16 lg:px-24 xl:px-32 md:py-3 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-orange-50/30 to-transparent'
    }`}>
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center gap-2 text-xl sm:text-xl md:text-2xl font-bold text-black">
          <Image 
            src="/logo.png" 
            alt="AfriLance Logo" 
            width={32} 
            height={32}
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
          />
          afrilance
        </div>
      </Link>

      {/* Menu */}
      <div
        className={`${
          isOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"
        } max-md:fixed max-md:top-0 max-md:left-0 max-md:h-screen max-md:w-full 
        max-md:bg-white max-md:transition-transform max-md:duration-300 max-md:z-50 
       
        max-md:flex max-md:flex-col max-md:justify-start max-md:pt-32 max-md:pb-8 max-md:px-6 
        md:flex md:items-center md:gap-8 font-medium`}
      >

        {/* Logo mobile - même position que navbar */}
        <div className="md:hidden absolute top-6 left-6">
          <div className="flex items-center gap-2 text-xl sm:text-xl md:text-2xl font-bold text-black">
            <Image 
              src="/logo.png" 
              alt="AfriLance Logo" 
              width={32} 
              height={32}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
            afrilance
          </div>
        </div>

        {/* Navigation principale */}
        <div className="max-md:flex max-md:flex-col max-md:gap-6 max-md:w-full md:flex md:items-center md:gap-8">
          {/* Services - Mobile (clic) */}
          <div className="w-full max-md:border-b max-md:border-slate-200 max-md:pb-6 md:hidden">
            <div 
              className="flex items-center gap-1 cursor-pointer text-xl font-semibold hover:text-orange-500 transition-colors"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <span>Services</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                  stroke="#ea580c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Services List Mobile - affichage au clic */}
            <div className={`overflow-hidden transition-all duration-300 ${
              servicesOpen ? 'max-h-96 mt-4' : 'max-h-0'
            }`}>
              <div className="flex flex-col gap-4 pl-4 bg-white/90 backdrop-blur-lg rounded-lg p-4">
                <a
                  href="#services"
                  className="text-slate-600 hover:text-orange-500 transition-colors text-lg"
                >
                  Développement Web
                </a>
                <a
                  href="#services"
                  className="text-slate-600 hover:text-orange-500 transition-colors text-lg"
                >
                  Design Graphique
                </a>
                <a
                  href="#services"
                  className="text-slate-600 hover:text-orange-500 transition-colors text-lg"
                >
                  Rédaction
                </a>
                <a
                  href="#services"
                  className="text-slate-600 hover:text-orange-500 transition-colors text-lg"
                >
                  Marketing Digital
                </a>
              </div>
            </div>
          </div>
          
          {/* Services - Desktop (hover) */}
          <div className="relative group hidden md:flex items-center gap-1 cursor-pointer text-lg">
            <span>Services</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                stroke="#ea580c"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Desktop Dropdown */}
            <div className="absolute bg-white/90 backdrop-blur-lg font-normal flex flex-col w-max rounded-lg p-6 top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl border border-slate-100 z-10 min-w-48">
              <a
                href="#services"
                className="text-slate-600 hover:text-orange-500 transition-colors text-lg py-2 px-2 rounded hover:bg-orange-50 whitespace-nowrap"
              >
                Développement Web
              </a>
              <a
                href="#services"
                className="text-slate-600 hover:text-orange-500 transition-colors text-lg py-2 px-2 rounded hover:bg-orange-50 whitespace-nowrap"
              >
                Design Graphique
              </a>
              <a
                href="#services"
                className="text-slate-600 hover:text-orange-500 transition-colors text-lg py-2 px-2 rounded hover:bg-orange-50 whitespace-nowrap"
              >
                Rédaction
              </a>
              <a
                href="#services"
                className="text-slate-600 hover:text-orange-500 transition-colors text-lg py-2 px-2 rounded hover:bg-orange-50 whitespace-nowrap"
              >
                Marketing Digital
              </a>
            </div>
          </div>

          <a href="#how-it-works" className="hover:text-orange-500 transition-colors max-md:text-xl max-md:font-semibold max-md:w-full max-md:border-b max-md:border-slate-200 max-md:pb-6 md:text-lg">
            Comment ça marche
          </a>
          <a href="#pricing" className="hover:text-orange-500 transition-colors max-md:text-xl max-md:font-semibold max-md:w-full max-md:border-b max-md:border-slate-200 max-md:pb-6 md:text-lg">
            Tarifs
          </a>
        </div>
        
        {/* Mobile CTA */}
        <Link href="/login" className="md:hidden w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-full font-medium transition text-xl mt-12 text-center block" style={{marginTop: 'calc(3rem + 70px)'}}>
          Connexion
        </Link>

        {/* Close button (mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-6 right-6 bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-full aspect-square font-medium transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* Desktop CTA */}
      <Link href="/login" className="hidden md:block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition text-base md:text-lg">
        Connexion
      </Link>

      {/* Open button (mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-md font-medium transition flex-shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12h16" />
          <path d="M4 18h16" />
          <path d="M4 6h16" />
        </svg>
      </button>
    </nav>
  );
}