
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { WebStoriesSection } from "@/components/WebStoriesSection";
import { LatestNews } from "@/components/LatestNews";
import news from "@/data/newsData";

const Trending = () => {
  const [webStories, setWebStories] = useState([]);
  const [latestNewsItems, setLatestNewsItems] = useState([]);
  
  // In a real app, we would sort by popularity metrics
  // For this demo, we'll just use the existing news data
  const trendingNews = [...news].sort(() => 0.5 - Math.random());
  
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
  
  // Generate web stories and latest news
  useEffect(() => {
    // Create web stories
    const storyItems = trendingNews.slice(0, 5).map(item => ({
      id: `story-${item.id}`,
      title: item.headline,
      imageUrl: item.imageUrl,
      timeAgo: getTimeAgo(new Date(item.date)),
      category: item.category
    }));
    
    // Create latest news items
    const latestItems = trendingNews.slice(5, 10).map(item => ({
      id: item.id,
      headline: item.headline,
      timeAgo: getTimeAgo(new Date(item.date)),
      imageUrl: item.imageUrl,
      category: item.category
    }));
    
    setWebStories(storyItems);
    setLatestNewsItems(latestItems);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Trending Now</h1>
          <p className="text-gray-600 mt-2">
            The most popular stories people are reading right now
          </p>
        </div>
        
        {/* Top Trending */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {trendingNews.slice(0, 2).map(item => (
            <div key={item.id} className="relative group overflow-hidden rounded-lg h-[300px]">
              <img 
                src={item.imageUrl} 
                alt={item.headline}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-jiohighlight transition-colors">
                  {item.headline}
                </h2>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-white/70 text-sm">
                    <span className="mr-2">Trending</span>
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                    <span>{Math.floor(Math.random() * 5000) + 500} readers</span>
                  </div>
                  {item.source && (
                    <span className="text-white text-sm font-medium">{item.source}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* More Trending News */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingNews.slice(2).map(item => (
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
        
        {/* Web Stories Section - Added at the bottom */}
        {webStories.length > 0 && (
          <div className="mt-12">
            <WebStoriesSection stories={webStories} />
          </div>
        )}
        
        {/* Latest News Section - Added at the bottom before newsletter */}
        {latestNewsItems.length > 0 && (
          <div className="mt-12">
            <LatestNews 
              title="Latest Updates"
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

export default Trending;
