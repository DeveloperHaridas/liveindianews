
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { BottomNav } from "@/components/BottomNav"; 

const Admin = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const { isAuthenticated, isAdmin, checkAdminStatus } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in as admin
    const adminStatus = checkAdminStatus();
    
    if (adminStatus && isAuthenticated) {
      setIsAdminAuthenticated(true);
      toast({
        title: "Admin Access",
        description: "Welcome to the admin dashboard",
      });
    } else {
      setIsAdminAuthenticated(false);
    }
  }, [isAuthenticated, isAdmin, checkAdminStatus, toast]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {isAdminAuthenticated ? (
          <AdminDashboard />
        ) : (
          <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Admin;
