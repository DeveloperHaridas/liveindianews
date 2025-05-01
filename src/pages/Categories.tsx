import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Book, Heart, Zap, Flag, Globe, Leaf, Newspaper, Building, Clock, Video } from "lucide-react";
import defaultNews from "@/data/newsData";
import { cn } from "@/lib/utils";
import { WebStoriesSection } from "@/components/WebStoriesSection";
import { LatestNews } from "@/components/LatestNews";

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

interface WebStory {
  id: string;
  title: string;
  imageUrl: string;
  timeAgo?: string;
  category?: string;
}

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("Latest");
  const [allNews, setAllNews] = useState<NewsItem[]>(defaultNews);
  const [webStories, setWebStories] = useState<WebStory[]>([]);
  const [latestNewsItems, setLatestNewsItems] = useState<any[]>([]);
  const [videoNews, setVideoNews] = useState<any[]>([]);
  
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
            ...defaultNews.filter(d => !adminNews.find((a: any) => String(a.id) === d.id))
          ];
          
          setAllNews(combinedNews);
        } catch (error) {
          console.error("Error parsing admin news data:", error);
        }
      }
    };
    
    // Load video news
    const loadVideoNews = () => {
      const videoNewsData = localStorage.getItem("videoNewsData");
      
      if (videoNewsData) {
        try {
          setVideoNews(JSON.parse(videoNewsData));
        } catch (error) {
          console.error("Error parsing video news data:", error);
          setVideoNews([]);
        }
      }
    };
    
    // Initial load
    loadNews();
    loadVideoNews();
    
    // Listen for storage changes (when admin updates news)
    window.addEventListener("storage", () => {
      loadNews();
      loadVideoNews();
    });
    
    // Also add a custom event listener for direct updates
    window.addEventListener("newsUpdated", loadNews);
    window.addEventListener("videoNewsUpdated", loadVideoNews);
    
    return () => {
      window.removeEventListener("storage", loadNews);
      window.removeEventListener("newsUpdated", loadNews);
      window.removeEventListener("videoNewsUpdated", loadVideoNews);
    }
  }, []);
  
  // Generate web stories and latest news based on current category
  useEffect(() => {
    // Create web stories from news with "Web Stories" category
    const webStoriesNews = activeCategory === "Web Stories" 
      ? allNews.filter(item => item.category === "Web Stories")
      : allNews.filter(item => item.category === "Web Stories").slice(0, 5);
    
    const storyItems = webStoriesNews.map(item => ({
      id: `story-${item.id}`,
      title: item.headline,
      imageUrl: item.imageUrl,
      timeAgo: getTimeAgo(new Date(item.date)),
      category: item.category
    }));
    
    // Create latest news items from "Latest" category
    const latestNews = activeCategory === "Latest" 
      ? allNews.filter(item => item.category === "Latest")
      : allNews.filter(item => item.category === "Latest").slice(0, 5);
    
    const latestItems = latestNews.map(item => ({
      id: item.id,
      headline: item.headline,
      timeAgo: getTimeAgo(new Date(item.date)),
      imageUrl: item.imageUrl,
      category: item.category
    }));
    
    setWebStories(storyItems);
    setLatestNewsItems(latestItems);
  }, [activeCategory, allNews]);

  const categoryIcons = {
    Education: Book,
    Health: Heart,
    Latest: Zap,
    India: Flag,
    World: Globe,
    Lifestyle: Leaf,
    "Web Stories": Newspaper,
    City: Building,
  };
  
  // Get unique categories from combined news sources
  const getUniqueCategories = () => {
    const defaultCategories = [
      "Latest",
      "Web Stories",
      "India",
      "World",
      "Education",
      "Health",
      "Lifestyle",
      "City"
    ];
    
    // Get unique categories from news items
    const newsCategories = Array.from(new Set(allNews.map(item => item.category)));
    
    // Get video categories
    const videoCategories = Array.from(new Set(videoNews.map(item => item.category)));
    
    // Combine all categories
    return Array.from(new Set([
      ...defaultCategories,
      ...newsCategories,
      ...videoCategories
    ]));
  };
  
  const categories = getUniqueCategories();
  
  // Filter news by active category
  const getFilteredContent = () => {
    if (activeCategory === "Latest") {
      return allNews.filter(item => item.category === "Latest");
    } else if (activeCategory === "Web Stories") {
      return allNews.filter(item => item.category === "Web Stories");
    } else {
      return allNews.filter(item => item.category === activeCategory);
    }
  };
  
  const filteredNews = getFilteredContent();
  
  // Filter videos by active category
  const filteredVideos = videoNews.filter(video => 
    video.category === activeCategory
  );
  
  // Get category color based on category name
  const getCategoryColor = (category: string): string => {
    switch(category.toLowerCase()) {
      case 'education': return 'bg-blue-500';
      case 'health': return 'bg-red-500';
      case 'latest': return 'bg-yellow-500';
      case 'india': return 'bg-orange-500';
      case 'world': return 'bg-purple-500';
      case 'lifestyle': return 'bg-green-500';
      case 'web stories': return 'bg-pink-500';
      case 'city': return 'bg-indigo-500';
      case 'business': return 'bg-jiocategory-business';
      case 'sports': return 'bg-jiocategory-sports';
      case 'entertainment': return 'bg-jiocategory-entertainment';
      case 'technology': return 'bg-jiocategory-technology';
      case 'science': return 'bg-jiocategory-science';
      default: return 'bg-gray-500';
    }
  };
  
  // Get category hover color based on category name
  const getCategoryHoverColor = (category: string): string => {
    switch(category.toLowerCase()) {
      case 'education': return 'hover:bg-blue-500 hover:text-white';
      case 'health': return 'hover:bg-red-500 hover:text-white';
      case 'latest': return 'hover:bg-yellow-500 hover:text-white';
      case 'india': return 'hover:bg-orange-500 hover:text-white';
      case 'world': return 'hover:bg-purple-500 hover:text-white';
      case 'lifestyle': return 'hover:bg-green-500 hover:text-white';
      case 'web stories': return 'hover:bg-pink-500 hover:text-white';
      case 'city': return 'hover:bg-indigo-500 hover:text-white';
      case 'business': return 'hover:bg-jiocategory-business hover:text-white';
      case 'sports': return 'hover:bg-jiocategory-sports hover:text-white';
      case 'entertainment': return 'hover:bg-jiocategory-entertainment hover:text-white';
      case 'technology': return 'hover:bg-jiocategory-technology hover:text-white';
      case 'science': return 'hover:bg-jiocategory-science hover:text-white';
      default: return 'hover:bg-gray-500 hover:text-white';
    }
  };
  
  // Helper function to calculate time ago
  function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
    }
    if (diffHours > 0) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    }
    if (diffMins > 0) {
      return diffMins === 1 ? '1 minute ago' : `${diffMins} minutes ago`;
    }
    return 'Just now';
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">News Categories</h1>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full transition-colors flex items-center gap-2",
                  getCategoryHoverColor(category),
                  activeCategory === category 
                    ? `${getCategoryColor(category)} text-white` 
                    : "bg-gray-100"
                )}
              >
                {IconComponent && <IconComponent className="w-4 h-4" />}
                {category}
              </button>
            );
          })}
        </div>
        
        {/* Category Banner */}
        <div className={`${getCategoryColor(activeCategory)} rounded-lg p-6 mb-8 text-white`}>
          <h2 className="text-2xl font-bold">{activeCategory} News</h2>
          <p className="opacity-80">
            Latest updates and top stories from {activeCategory.toLowerCase()}
          </p>
        </div>
        
        {/* Web Stories Section - show prominently for Web Stories category */}
        {activeCategory === "Web Stories" ? (
          <div className="mb-8">
            <WebStoriesSection stories={webStories} />
          </div>
        ) : webStories.length > 0 && (
          <div className="mb-8">
            <WebStoriesSection stories={webStories} />
          </div>
        )}

        {/* Latest News Section - show prominently for Latest category */}
        {activeCategory === "Latest" ? (
          <div className="mb-8">
            <LatestNews 
              title="Latest Updates"
              items={latestNewsItems}
            />
          </div>
        ) : latestNewsItems.length > 0 && activeCategory !== "Web Stories" && (
          <div className="mb-8">
            <LatestNews 
              title={`Latest ${activeCategory} Updates`}
              items={latestNewsItems.filter(item => item.category === activeCategory)}
            />
          </div>
        )}
        
        {/* Video News Section - show for any category that has videos */}
        {filteredVideos.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Video className="h-5 w-5 text-jiohighlight" />
              {activeCategory} Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVideos.map((video) => (
                <div key={video.id} className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-2">{video.title}</h3>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                      <span>{video.source || video.category}</span>
                      <span>{getTimeAgo(new Date(video.date))}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* News Grid - show for all categories */}
        {filteredNews.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">{activeCategory} Articles</h2>
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
          </>
        )}
        
        {filteredNews.length === 0 && filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No content found in this category.</p>
          </div>
        )}
        
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
