"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 py-4 md:px-16 lg:px-24 xl:px-32 md:py-6 w-screen relative z-50">
      {/* Logo */}
      <Link href="/">
        <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600">
          AfriLance
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
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600">AfriLance</div>
        </div>

        {/* Navigation principale */}
        <div className="max-md:flex max-md:flex-col max-md:gap-6 max-md:w-full md:flex md:items-center md:gap-8">
          {/* Services - Mobile (clic) */}
          <div className="w-full max-md:border-b max-md:border-slate-200 max-md:pb-6 md:hidden">
            <div 
              className="flex items-center gap-1 cursor-pointer text-lg font-semibold hover:text-orange-500 transition-colors"
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
              <div className="flex flex-col gap-4 pl-4">
                <a
                  href="#"
                  className="text-slate-600 hover:text-orange-500 transition-colors text-base"
                >
                  Développement Web
                </a>
                <a
                  href="#"
                  className="text-slate-600 hover:text-orange-500 transition-colors text-base"
                >
                  Design Graphique
                </a>
                <a
                  href="#"
                  className="text-slate-600 hover:text-orange-500 transition-colors text-base"
                >
                  Rédaction
                </a>
                <a
                  href="#"
                  className="text-slate-600 hover:text-orange-500 transition-colors text-base"
                >
                  Marketing Digital
                </a>
              </div>
            </div>
          </div>
          
          {/* Services - Desktop (hover) */}
          <div className="relative group hidden md:flex items-center gap-1 cursor-pointer">
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
            <div className="absolute bg-white font-normal flex flex-col w-max rounded-lg p-6 top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl border border-slate-100 z-10 min-w-48">
              <a
                href="#"
                className="text-slate-600 hover:text-orange-500 transition-colors text-base py-2 px-2 rounded hover:bg-orange-50 whitespace-nowrap"
              >
                Développement Web
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-orange-500 transition-colors text-base py-2 px-2 rounded hover:bg-orange-50 whitespace-nowrap"
              >
                Design Graphique
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-orange-500 transition-colors text-base py-2 px-2 rounded hover:bg-orange-50 whitespace-nowrap"
              >
                Rédaction
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-orange-500 transition-colors text-base py-2 px-2 rounded hover:bg-orange-50 whitespace-nowrap"
              >
                Marketing Digital
              </a>
            </div>
          </div>

          <a href="#" className="hover:text-orange-500 transition-colors max-md:text-lg max-md:font-semibold max-md:w-full max-md:border-b max-md:border-slate-200 max-md:pb-6">
            Comment ça marche
          </a>
          <a href="#" className="hover:text-orange-500 transition-colors max-md:text-lg max-md:font-semibold max-md:w-full max-md:border-b max-md:border-slate-200 max-md:pb-6">
            Tarifs
          </a>
        </div>
        
        {/* Mobile CTA */}
        <button className="md:hidden w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-full font-medium transition text-lg mt-12" style={{marginTop: 'calc(3rem + 50px)'}}>
          S&apos;inscrire
        </button>

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
      <button className="hidden md:block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition text-sm md:text-base">
        S&apos;inscrire
      </button>

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