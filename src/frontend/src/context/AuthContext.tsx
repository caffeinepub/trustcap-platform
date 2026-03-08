import type React from "react";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  userName: string;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userName: "TrustCap User1",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("trustcap_logged_in") === "true";
  });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("trustcap_logged_in", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("trustcap_logged_in");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userName: "TrustCap User1" }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
