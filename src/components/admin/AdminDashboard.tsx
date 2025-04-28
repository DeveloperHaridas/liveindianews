
import { useState } from "react";
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

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("news");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel",
    });
    navigate("/");
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
      
      <Tabs defaultValue="news" value={activeTab} onValueChange={setActiveTab}>
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
