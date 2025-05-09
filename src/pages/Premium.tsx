
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import defaultNews from "@/data/newsData";
import { useAuth } from "@/hooks/useAuth";

const Premium = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [premiumNews, setPremiumNews] = useState<any[]>([]);
  
  // Load premium articles
  useEffect(() => {
    const loadPremiumArticles = () => {
      // Get default premium articles
      const defaultPremiumNews = defaultNews.filter(item => item.isPremium);
      
      // Get admin-added premium articles
      const adminNewsData = localStorage.getItem("adminNewsData");
      let adminPremiumNews: any[] = [];
      
      if (adminNewsData) {
        try {
          adminPremiumNews = JSON.parse(adminNewsData)
            .filter((item: any) => item.category === "Premium")
            .map((item: any) => ({
              id: String(item.id),
              headline: item.title,
              summary: item.content?.substring(0, 120) + "...",
              content: item.content,
              category: item.category,
              imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop",
              source: item.source,
              isPremium: true,
              date: item.date
            }));
        } catch (error) {
          console.error("Error parsing admin news data:", error);
        }
      }
      
      // Combine and sort by date (newest first)
      const allPremiumNews = [...adminPremiumNews, ...defaultPremiumNews];
      allPremiumNews.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      setPremiumNews(allPremiumNews);
    };
    
    loadPremiumArticles();
    
    // Listen for storage changes (when admin updates news)
    window.addEventListener("storage", loadPremiumArticles);
    window.addEventListener("newsUpdated", loadPremiumArticles);
    
    return () => {
      window.removeEventListener("storage", loadPremiumArticles);
      window.removeEventListener("newsUpdated", loadPremiumArticles);
    };
  }, []);
  
  useEffect(() => {
    // If not authenticated, redirect after a brief delay
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold mb-4">Premium Content</h1>
            <p className="text-gray-600 mb-6">
              Please log in to access premium content
            </p>
            <Button onClick={() => navigate("/login")} className="bg-jiohighlight hover:bg-jiohighlight-light">
              Sign in
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-jioblue to-jiohighlight rounded-lg p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Premium Content</h1>
            <p className="text-xl opacity-90">
              Exclusive in-depth articles and analysis
            </p>
          </div>
        </div>
        
        {/* Premium News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {premiumNews.length > 0 ? (
            premiumNews.map(item => (
              <NewsCard
                key={item.id}
                id={item.id}
                headline={item.headline}
                summary={item.summary}
                category={item.category}
                imageUrl={item.imageUrl}
                isPremium={false} // We're already in premium, so no need to mark them
                source={item.source}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500">No premium articles available yet.</p>
            </div>
          )}
        </div>
        
        {/* Benefits List */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Premium Benefits</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-jiohighlight font-bold mr-2">✓</span>
              <span>Unlimited access to premium articles</span>
            </li>
            <li className="flex items-start">
              <span className="text-jiohighlight font-bold mr-2">✓</span>
              <span>Ad-free reading experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-jiohighlight font-bold mr-2">✓</span>
              <span>Exclusive newsletters and content</span>
            </li>
            <li className="flex items-start">
              <span className="text-jiohighlight font-bold mr-2">✓</span>
              <span>Early access to special features</span>
            </li>
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Premium;
