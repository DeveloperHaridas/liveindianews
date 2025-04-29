import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsBanner } from "@/components/NewsBanner";
import { NewsCard } from "@/components/NewsCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Crown } from "lucide-react";
import defaultNews from "@/data/newsData";

interface NewsItem {
  id: string;
  headline: string;
  summary?: string;
  content?: string;
  category: string;
  imageUrl: string;
  isPremium?: boolean;
  date: string;
  source: string;
}

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [news, setNews] = useState<NewsItem[]>(defaultNews);
  
  // Load news from localStorage (set by admin panel)
  useEffect(() => {
    const loadNews = () => {
      const adminNewsData = localStorage.getItem("adminNewsData");
      
      if (adminNewsData) {
        // Convert admin news format to match the expected format
        const adminNews = JSON.parse(adminNewsData).map((item: any) => ({
          id: String(item.id),
          headline: item.title,
          summary: item.content?.substring(0, 120) + "...",
          content: item.content,
          category: item.category,
          imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          isPremium: false,
          date: item.date,
          source: item.source
        }));
        
        // Combine admin news with default news, prioritizing admin entries
        const combinedNews = [
          ...adminNews, 
          ...defaultNews.filter(d => !adminNews.find((a: any) => String(a.id) === d.id))
        ];
        
        setNews(combinedNews);
      }
    };
    
    loadNews();
    
    // Listen for storage changes (when admin updates news)
    window.addEventListener("storage", loadNews);
    
    // Also add a custom event listener for direct updates
    window.addEventListener("newsUpdated", loadNews);
    
    return () => {
      window.removeEventListener("storage", loadNews);
      window.removeEventListener("newsUpdated", loadNews);
    }
  }, []);

  // Get the featured news (first article)
  const featuredNews = news[0];

  // Get categories from news data
  const categories = Array.from(new Set(news.map(item => item.category)));

  // Filter news based on active category
  const filteredNews = activeCategory === "all" 
    ? news.slice(1) // Skip the featured news
    : news.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase() && item.id !== featuredNews.id);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Premium Banner */}
        <div className="mb-8 relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-premium">
            <Crown className="h-4 w-4 text-premium-gold" />
            <span className="text-sm font-medium">Premium News Network</span>
          </div>
          <NewsBanner 
            headline={featuredNews.headline}
            category={featuredNews.category}
            imageUrl={featuredNews.imageUrl}
            id={featuredNews.id}
          />
        </div>

        {/* Category Filter with Premium Styling */}
        <div className="premium-card p-4 rounded-lg mb-8">
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(item => (
            <NewsCard
              key={item.id}
              id={item.id}
              headline={item.headline}
              summary={item.summary}
              category={item.category}
              imageUrl={item.imageUrl}
              isPremium={item.isPremium}
            />
          ))}
        </div>

        {/* Premium Newsletter Signup */}
        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
