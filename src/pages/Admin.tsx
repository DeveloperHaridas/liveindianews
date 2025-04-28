
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const { isAuthenticated, isAdmin, checkAdminStatus } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in as admin
    const adminStatus = checkAdminStatus();
    console.log("Admin status check:", { isAuthenticated, adminStatus });
    
    if (isAuthenticated && adminStatus) {
      setIsAdminAuthenticated(true);
    } else if (isAuthenticated && !adminStatus) {
      // User is authenticated but not as admin
      setIsAdminAuthenticated(false);
    } else if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access admin features",
        variant: "destructive"
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate, checkAdminStatus, toast]);
  
  const handleAdminLogin = () => {
    console.log("Admin login successful");
    setIsAdminAuthenticated(true);
  };
  
  const handleAdminLogout = () => {
    console.log("Admin logout");
    setIsAdminAuthenticated(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {isAdminAuthenticated ? (
          <AdminDashboard onLogout={handleAdminLogout} />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
