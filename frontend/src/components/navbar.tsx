"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-6 w-full">
      {/* Logo */}
      <a href="/">
        <div className="text-2xl font-bold text-orange-600">
          AfriLance
        </div>
      </a>

      {/* Menu */}
      <div
        className={`${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        } max-md:absolute max-md:top-0 max-md:left-0 max-md:transition-all 
        max-md:duration-300 max-md:overflow-hidden max-md:h-full 
        max-md:bg-white/50 max-md:backdrop-blur max-md:flex-col 
        max-md:justify-center flex items-center gap-8 font-medium`}
      >

        <div className="relative group flex items-center gap-1 cursor-pointer">
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
          {/* Dropdown */}
          <div className="absolute bg-white font-normal flex flex-col gap-2 w-max rounded-lg p-4 top-36 left-0 opacity-0 -translate-y-full group-hover:top-44 group-hover:opacity-100 transition-all duration-300">
            <a
              href="#"
              className="hover:translate-x-1 hover:text-orange-500 transition-all"
            >
              Développement Web
            </a>
            <a
              href="#"
              className="hover:translate-x-1 hover:text-orange-500 transition-all"
            >
              Design Graphique
            </a>
            <a
              href="#"
              className="hover:translate-x-1 hover:text-orange-500 transition-all"
            >
              Rédaction
            </a>
            <a
              href="#"
              className="hover:translate-x-1 hover:text-orange-500 transition-all"
            >
              Marketing Digital
            </a>
          </div>
        </div>

        <a href="#" className="hover:text-orange-500 transition-colors">
          Comment ça marche
        </a>
        <a href="#" className="hover:text-orange-500 transition-colors">
          Tarifs
        </a>

        {/* Close button (mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-md aspect-square font-medium transition"
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
      <button className="hidden md:block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition">
        S'inscrire
      </button>

      {/* Open button (mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-md aspect-square font-medium transition"
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