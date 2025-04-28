
import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (provider?: string) => void;
  logout: () => void;
  checkAdminStatus: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const auth = localStorage.getItem("authenticated");
    const adminStatus = localStorage.getItem("isAdmin");
    
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    
    if (adminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);
  
  const checkAdminStatus = (): boolean => {
    const adminStatus = localStorage.getItem("isAdmin");
    return adminStatus === "true";
  };
  
  const login = (provider?: string) => {
    localStorage.setItem("authenticated", "true");
    if (provider) {
      localStorage.setItem("provider", provider);
    }
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("provider");
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setIsAdmin(false);
    window.location.href = "/";
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, checkAdminStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
