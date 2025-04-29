
import { useState, useEffect } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { NewsManagement } from "@/components/admin/NewsManagement";
import { LiveStreamManagement } from "@/components/admin/LiveStreamManagement";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("news");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // Load last active tab from localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("adminActiveTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  
  // Save active tab to localStorage when it changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    localStorage.setItem("adminActiveTab", newTab);
  };
  
  const handleLogout = () => {
    logout(); // Use the logout function from auth context
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <Tabs defaultValue="news" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="news">News Management</TabsTrigger>
          <TabsTrigger value="livestreams">Live Streams</TabsTrigger>
        </TabsList>
        <TabsContent value="news" className="mt-6">
          <NewsManagement />
        </TabsContent>
        <TabsContent value="livestreams" className="mt-6">
          <LiveStreamManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
