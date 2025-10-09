"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        router.push("/dashboard");
        return { success: true };
      }

      throw new Error("Erreur de connexion inconnue");
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur de connexion" 
      };
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    login,
    logout,
  };
}
