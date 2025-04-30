
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { BottomNav } from "./components/BottomNav";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Premium from "./pages/Premium";
import Categories from "./pages/Categories";
import Trending from "./pages/Trending";
import NewsDetail from "./pages/NewsDetail";
import NotFound from "./pages/NotFound";
import LiveTV from "./pages/LiveTV";
import Shorts from "./pages/Shorts";
import Admin from "./pages/Admin";
import WebStories from "./pages/WebStories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="pb-[60px] md:pb-0"> {/* Add padding for bottom navigation */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/live-tv" element={<LiveTV />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/web-stories" element={<WebStories />} />
              <Route path="/web-stories/:id" element={<WebStories />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
