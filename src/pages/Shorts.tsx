
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VideoNewsCard } from "@/components/VideoNewsCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { useToast } from "@/components/ui/use-toast";

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

// Sample video news data for fallback
const sampleVideoNews = [
  { 
    id: "1", 
    title: "Breaking: Major Political Developments", 
    category: "Politics",
    duration: "2:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1554177255-61502b352de3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    videoUrl: "https://example.com/video1.mp4",
    date: "2025-04-25",
    source: "JioNews"
  },
  { 
    id: "2", 
    title: "Tech Innovation: New AI Breakthrough", 
    category: "Technology",
    duration: "3:12",
    thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    videoUrl: "https://example.com/video2.mp4",
    date: "2025-04-24",
    source: "Tech Today"
  },
  { 
    id: "3", 
    title: "Sports Highlights: Weekend Tournament", 
    category: "Sports",
    duration: "1:58",
    thumbnailUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    videoUrl: "https://example.com/video3.mp4",
    date: "2025-04-23",
    source: "Sports Network"
  },
];

const Shorts = () => {
  const [videoNews, setVideoNews] = useState<VideoNews[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Load video news from localStorage (admin panel data)
  useEffect(() => {
    const loadVideoNews = () => {
      setIsLoading(true);
      try {
        // First, try to get the data from localStorage
        const storedVideoNews = localStorage.getItem("videoNewsData");
        
        if (storedVideoNews) {
          // Parse and validate the stored data
          const parsedVideoNews = JSON.parse(storedVideoNews);
          
          // Check if data is an array and has at least one item with required properties
          const isValidData = Array.isArray(parsedVideoNews) && 
            parsedVideoNews.length > 0 && 
            parsedVideoNews.every(item => 
              item.id && item.title && item.thumbnailUrl && item.videoUrl
            );
          
          if (isValidData) {
            console.log("Loaded valid video news from localStorage:", parsedVideoNews);
            setVideoNews(parsedVideoNews);
          } else {
            console.warn("Invalid video news data format, using sample data");
            setVideoNews(sampleVideoNews);
            // Store the sample data as a fallback
            localStorage.setItem("videoNewsData", JSON.stringify(sampleVideoNews));
          }
        } else {
          // Fallback to sample data if no admin data exists
          console.log("No video news in localStorage, using sample data");
          setVideoNews(sampleVideoNews);
          // Store the sample data as a fallback
          localStorage.setItem("videoNewsData", JSON.stringify(sampleVideoNews));
        }
      } catch (error) {
        console.error("Error loading video news data:", error);
        toast({
          title: "Error",
          description: "Failed to load video content. Using default videos.",
          variant: "destructive",
        });
        // Fall back to sample data
        setVideoNews(sampleVideoNews);
        // Store the sample data as a fallback
        localStorage.setItem("videoNewsData", JSON.stringify(sampleVideoNews));
      }
      setIsLoading(false);
    };
    
    // Initial load
    loadVideoNews();
    
    // Listen for storage changes (when admin updates videos)
    window.addEventListener("storage", loadVideoNews);
    
    // Add custom event listener for programmatic updates
    window.addEventListener("videoNewsUpdated", loadVideoNews);
    
    // Set an interval to check data integrity every hour
    const dataCheckInterval = setInterval(() => {
      const storedData = localStorage.getItem("videoNewsData");
      if (!storedData) {
        console.log("Video data missing, restoring defaults");
        localStorage.setItem("videoNewsData", JSON.stringify(sampleVideoNews));
        loadVideoNews();
      }
    }, 3600000); // 1 hour
    
    return () => {
      window.removeEventListener("storage", loadVideoNews);
      window.removeEventListener("videoNewsUpdated", loadVideoNews);
      clearInterval(dataCheckInterval);
    };
  }, [toast]);
  
  // Get categories from video news data
  const categories = Array.from(new Set(videoNews.map(item => item.category)));
  
  // Filter video news based on active category
  const filteredVideos = activeCategory === "all" 
    ? videoNews
    : videoNews.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">News Shorts</h1>
        </div>
        
        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-500">Loading video news...</p>
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <VideoNewsCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 border rounded-lg">
            <p className="text-lg text-gray-500">No videos available in this category.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shorts;
