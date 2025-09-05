"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
    children: React.ReactNode;
    userType: 'freelance' | 'client';
    pageTitle?: string;
}

const DashboardLayout = ({ children, userType, pageTitle }: DashboardLayoutProps) => {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

    const freelanceMenuItems = [
        { href: '/dashboard/freelance', label: 'Tableau de bord', icon: 'dashboard' },
        { href: '/missions', label: 'Trouver des missions', icon: 'missions' },
        { href: '/messages/freelance', label: 'Messagerie', icon: 'messages' },
        { href: '/dashboard/freelance/solde', label: 'Solde & Retraits', icon: 'wallet' },
        { href: '/dashboard/freelance/profil', label: 'Mon Profil', icon: 'profile' },
        { href: '/', label: 'Retour à l\'accueil', icon: 'home' },
    ];

    const clientMenuItems = [
        { href: '/dashboard/client', label: 'Tableau de bord', icon: 'dashboard' },
        { href: '/freelances', label: 'Trouver des freelances', icon: 'team' },
        { href: '/dashboard/client/missions', label: 'Mes missions', icon: 'missions' },
        { href: '/messages/client', label: 'Messagerie', icon: 'messages' },
        { href: '/dashboard/client/paiements', label: 'Paiements', icon: 'payments' },
        { href: '/', label: 'Retour à l\'accueil', icon: 'home' },
    ];

    const menuItems = userType === 'freelance' ? freelanceMenuItems : clientMenuItems;

    const getIcon = (iconName: string) => {
        const icons = {
            dashboard: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                </svg>
            ),
            missions: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
            notifications: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12M7 7l3.12 3.12M21 21l-6-6" />
                </svg>
            ),
            wallet: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            profile: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            team: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            messages: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            payments: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
            home: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        };
        return icons[iconName as keyof typeof icons] || icons.dashboard;
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-16">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-slate-200 z-50">
                <div className="px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            {/* Menu hamburger mobile */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-slate-600 hover:text-orange-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            
                            <Link href="/" className="text-xl font-bold text-orange-600">
                                AfriLance
                            </Link>
                            <div className="hidden md:block">
                                <span className="text-sm text-slate-500">
                                    {pageTitle || `Dashboard ${userType === 'freelance' ? 'Freelance' : 'Client'}`}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-slate-600 hover:text-orange-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                            </button>
                            
                            <div className="relative">
                                <button 
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors w-full text-left"
                                >
                                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-800 truncate">{user?.fullName || 'Utilisateur'}</p>
                                        <p className="text-xs text-slate-600 truncate">{user?.email || ''}</p>
                                    </div>
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isUserMenuOpen && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-10" 
                                            onClick={() => setIsUserMenuOpen(false)}
                                        ></div>
                                        <div className="absolute right-0 top-full mt-2 w-56 p-4 bg-white border border-slate-300/30 text-slate-500 rounded-md font-medium shadow-lg z-20">
                                            <ul className="flex flex-col gap-2">
                                                <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-orange-50 hover:text-orange-600 transition">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <Link href={userType === 'freelance' ? '/dashboard/freelance/profil' : '/dashboard/client/profil'}>Mon Profil</Link>
                                                </li>
                                                <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-slate-100 transition">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 16 16">
                                                        <path d="M8.001 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="currentColor" strokeOpacity=".9" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M12.935 10a1.1 1.1 0 0 0 .22 1.213l.04.04a1.332 1.332 0 0 1-.433 2.176 1.33 1.33 0 0 1-1.454-.289l-.04-.04a1.1 1.1 0 0 0-1.213-.22 1.1 1.1 0 0 0-.667 1.007V14a1.333 1.333 0 1 1-2.667 0v-.06a1.1 1.1 0 0 0-.72-1.007 1.1 1.1 0 0 0-1.213.22l-.04.04a1.334 1.334 0 1 1-1.887-1.886l.04-.04a1.1 1.1 0 0 0 .22-1.214 1.1 1.1 0 0 0-1.006-.666H2A1.333 1.333 0 0 1 2 6.72h.06A1.1 1.1 0 0 0 3.068 6a1.1 1.1 0 0 0-.22-1.213l-.04-.04A1.333 1.333 0 1 1 4.695 2.86l.04.04a1.1 1.1 0 0 0 1.213.22h.053a1.1 1.1 0 0 0 .667-1.007V2a1.333 1.333 0 1 1 2.667 0v.06A1.1 1.1 0 0 0 10 3.067a1.1 1.1 0 0 0 1.214-.22l.04-.04a1.334 1.334 0 1 1 1.886 1.886l-.04.04a1.1 1.1 0 0 0-.22 1.214V6a1.1 1.1 0 0 0 1.007.667H14a1.333 1.333 0 1 1 0 2.666h-.60a1.1 1.1 0 0 0-1.006.667" stroke="currentColor" strokeOpacity="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <Link href={userType === 'freelance' ? '/dashboard/freelance/settings' : '/dashboard/client/settings'}>Paramètres</Link>
                                                </li>
                                                <div className="w-full h-px bg-slate-300/50 my-2"></div>
                                                <li>
                                                    <button 
                                                        onClick={() => {
                                                            setIsUserMenuOpen(false);
                                                            logout();
                                                            window.location.href = '/';
                                                        }}
                                                        className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left rounded"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Déconnexion
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar Desktop */}
                <aside className="hidden md:block fixed left-0 top-16 w-64 bg-white shadow-sm h-[calc(100vh-4rem)] overflow-y-auto z-40">
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                isActive
                                                    ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600'
                                                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                                            }`}
                                        >
                                            {getIcon(item.icon)}
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>

                {/* Sidebar Mobile */}
                {isMobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <div 
                            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setIsMobileMenuOpen(false)}
                        ></div>
                        
                        {/* Mobile Menu */}
                        <aside className="md:hidden fixed left-0 top-16 w-80 bg-white shadow-lg h-[calc(100vh-4rem)] overflow-y-auto z-50 transform transition-transform duration-300">
                            <nav className="p-4">
                                <ul className="space-y-2">
                                    {menuItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                                        isActive
                                                            ? 'bg-orange-50 text-orange-600 border-r-4 border-orange-600'
                                                            : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                                                    }`}
                                                >
                                                    {getIcon(item.icon)}
                                                    {item.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </aside>
                    </>
                )}

                {/* Main Content */}
                <main className="flex-1 md:ml-64 p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
