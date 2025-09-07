"use client";
import React, { ReactNode, FC, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "freelance" | "client";
  pageTitle?: string;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  userType,
  pageTitle,
}) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const getMenuItems = () => {
    if (userType === "client") {
      return [
        { name: "Dashboard", href: "/dashboard/client", icon: "dashboard" },
        { name: "Missions publiées", href: "/dashboard/client/missions", icon: "missions" },
        { name: "Freelances engagés", href: "/dashboard/client/freelances", icon: "team" },
        { name: "Messages", href: "/dashboard/client/messages", icon: "messages" },
        { name: "Paiements sécurisés", href: "/dashboard/client/paiements", icon: "payments" },
      ];
    } else {
      return [
        { name: "Dashboard", href: "/dashboard/freelance", icon: "dashboard" },
        { name: "Missions en cours", href: "/dashboard/freelance/missions", icon: "missions" },
        { name: "Notifications", href: "/dashboard/freelance/notifications", icon: "notifications" },
        { name: "Solde", href: "/dashboard/freelance/solde", icon: "wallet" },
        { name: "Retraits", href: "/dashboard/freelance/retraits", icon: "payments" },
        { name: "Badges", href: "/dashboard/freelance/badges", icon: "star" },
      ];
    }
  };

  const menuItems = getMenuItems();

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      wallet: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
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
      star: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.dashboard;
  };

  return (
    <div className="min-h-screen bg-slate-50 md:pt-16 pb-16 md:pb-0">
      {/* Header, Sidebar, Mobile Nav, etc. */}
      <main className="md:ml-64 pb-16 md:pb-6 pt-20 p-4 md:p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
