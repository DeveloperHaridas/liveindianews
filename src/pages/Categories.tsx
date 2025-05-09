import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Book, Heart, Zap, Flag, Globe, Leaf, Newspaper, Building, Clock } from "lucide-react";
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
            isPremium: item.category === "Premium",
            date: item.date,
            source: item.source || item.category // Ensure source exists
          }));
          
          // Combine admin news with default news, prioritizing admin entries
          const combinedNews = [
            ...adminNews, 
            ...defaultNews.filter(d => !adminNews.find((a: any) => String(a.id) === d.id))
          ];
          
          // Sort by date, newest first
          combinedNews.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
          });
          
          setAllNews(combinedNews);
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
  
  // Generate web stories and latest news based on current category
  useEffect(() => {
    // Filter news by active category for web stories
    let categoryNews;
    
    if (activeCategory === "Latest") {
      categoryNews = allNews.slice(0, 10);
    } else if (activeCategory === "Web Stories") {
      // For Web Stories tab, get all Web Stories category articles
      categoryNews = allNews.filter(item => item.category === "Web Stories");
    } else {
      categoryNews = allNews.filter(item => item.category === activeCategory);
    }
    
    // Create web stories from filtered news
    let storyItems;
    
    if (activeCategory === "Web Stories") {
      // If on Web Stories tab, show all Web Stories category articles
      storyItems = allNews
        .filter(item => item.category === "Web Stories")
        .map(item => ({
          id: `story-${item.id}`,
          title: item.headline,
          imageUrl: item.imageUrl,
          timeAgo: getTimeAgo(new Date(item.date)),
          category: item.category
        }));
    } else {
      // For other tabs, just show 5
      storyItems = categoryNews.slice(0, 5).map(item => ({
        id: `story-${item.id}`,
        title: item.headline,
        imageUrl: item.imageUrl,
        timeAgo: getTimeAgo(new Date(item.date)),
        category: item.category
      }));
    }
    
    // Create latest news items
    const latestItems = categoryNews.slice(0, 5).map(item => ({
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
    Premium: Clock,
  };
  
  // Get unique categories from combined news sources
  const getUniqueCategories = () => {
    const defaultCategories = [
      "Latest",
      "India",
      "World",
      "Education",
      "Health",
      "Lifestyle",
      "City",
      "Web Stories",
      "Premium"
    ];
    
    // Get unique categories from news items
    const newsCategories = Array.from(new Set(allNews.map(item => item.category)));
    
    return [
      ...defaultCategories,
      ...newsCategories.filter(cat => 
        !defaultCategories.includes(cat)
      )
    ];
  };
  
  const categories = getUniqueCategories();
  
  // Filter news by active category
  const filteredNews = activeCategory === "Latest" 
    ? allNews.slice(0, 10) 
    : allNews.filter(item => item.category === activeCategory);
  
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
        
        {/* News Grid - Don't show for Web Stories tab */}
        {activeCategory !== "Web Stories" && (
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
        )}
        
        {filteredNews.length === 0 && activeCategory !== "Web Stories" && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found in this category.</p>
          </div>
        )}
        
        {/* Web Stories Section - moved to bottom for all categories */}
        {(webStories.length > 0 || activeCategory === "Web Stories") && (
          <div className="mb-8 mt-12">
            <WebStoriesSection stories={webStories} />
          </div>
        )}
        
        {webStories.length === 0 && activeCategory === "Web Stories" && (
          <div className="text-center py-12">
            <p className="text-gray-500">No web stories found.</p>
          </div>
        )}
        
        {/* Latest News Section - moved to the end before newsletter */}
        {latestNewsItems.length > 0 && activeCategory !== "Web Stories" && (
          <div className="mb-8 mt-12">
            <LatestNews 
              title={`Latest ${activeCategory} Updates`}
              items={latestNewsItems}
            />
          </div>
        )}
        
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
