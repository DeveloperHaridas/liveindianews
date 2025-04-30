
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsBanner } from "@/components/NewsBanner";
import { NewsCard } from "@/components/NewsCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Crown, Film } from "lucide-react";
import defaultNews from "@/data/newsData";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

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

interface VideoNews {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  date: string;
  description?: string;
  source?: string;
}

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  // Add source to defaultNews if missing
  const defaultNewsWithSource = defaultNews.map(item => ({
    ...item,
    source: item.source || item.category // Use category as fallback if source is missing
  }));
  
  const [news, setNews] = useState<NewsItem[]>(defaultNewsWithSource);
  const [featuredVideos, setFeaturedVideos] = useState<VideoNews[]>([]);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Load news from localStorage (set by admin panel)
  useEffect(() => {
    const loadNews = () => {
      const adminNewsData = localStorage.getItem("adminNewsData");
      
      if (adminNewsData) {
        try {
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
            source: item.source || item.category // Ensure source exists
          }));
          
          // Combine admin news with default news, prioritizing admin entries
          const combinedNews = [
            ...adminNews, 
            ...defaultNewsWithSource.filter(d => !adminNews.find((a: any) => String(a.id) === d.id))
          ];
          
          setNews(combinedNews);
        } catch (error) {
          console.error("Error parsing admin news data:", error);
        }
      }
    };
    
    // Initial load
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

  // Load featured videos for the shorts section (desktop only)
  useEffect(() => {
    if (isMobile) return; // Skip for mobile

    const loadFeaturedVideos = () => {
      const videoNewsData = localStorage.getItem("videoNewsData");
      if (videoNewsData) {
        try {
          const videoNews = JSON.parse(videoNewsData);
          // Just get the first 4 videos as featured
          setFeaturedVideos(videoNews.slice(0, 4));
        } catch (error) {
          console.error("Error parsing video news data:", error);
          // Fallback to empty array
          setFeaturedVideos([]);
        }
      }
    };

    loadFeaturedVideos();
    
    // Listen for storage changes (when admin updates videos)
    window.addEventListener("storage", loadFeaturedVideos);
    window.addEventListener("videoNewsUpdated", loadFeaturedVideos);
    
    return () => {
      window.removeEventListener("storage", loadFeaturedVideos);
      window.removeEventListener("videoNewsUpdated", loadFeaturedVideos);
    };
  }, [isMobile]);

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
            source={featuredNews.source}
          />
        </div>

        {/* Shorts Section - Only for Desktop */}
        {!isMobile && featuredVideos.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Film className="h-5 w-5 text-jiohighlight" />
                Featured Shorts
              </h2>
              <Button 
                onClick={() => navigate('/shorts')} 
                variant="outline"
                className="text-sm"
              >
                View All
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {featuredVideos.map((video) => (
                <div 
                  key={video.id}
                  className="relative rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => navigate(`/shorts?video=${video.id}`)}
                >
                  <div className="aspect-video">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                    <span className="text-xs text-white/75">{video.category}</span>
                    <h3 className="text-sm font-medium text-white line-clamp-2">{video.title}</h3>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
              source={item.source}
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
