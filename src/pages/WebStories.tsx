import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WebStoryCard } from "@/components/WebStoryCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { LatestNews } from "@/components/LatestNews";
import defaultNews from "@/data/newsData";
import { Newspaper } from "lucide-react";

const placeholderImages = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop"
];

interface WebStory {
  id: string;
  title: string;
  imageUrl: string;
  timeAgo?: string;
  category?: string;
  content?: string[];
}

const WebStories = () => {
  const { id } = useParams();
  const [stories, setStories] = useState<WebStory[]>([]);
  const [currentStory, setCurrentStory] = useState<WebStory | null>(null);
  const [latestNewsItems, setLatestNewsItems] = useState<any[]>([]);
  
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
  
  useEffect(() => {
    // Generate web stories based on news data and additional stories
    const generateStories = () => {
      // Load admin-added news data
      const adminNewsData = localStorage.getItem("adminNewsData");
      let adminNews: any[] = [];
      
      if (adminNewsData) {
        try {
          // Filter to only get Web Stories category news
          adminNews = JSON.parse(adminNewsData)
            .filter((item: any) => item.category === "Web Stories")
            .map((item: any) => ({
              id: `story-${item.id}`,
              title: item.title,
              imageUrl: item.imageUrl || placeholderImages[0],
              timeAgo: getTimeAgo(new Date(item.date)),
              category: item.category,
              content: item.content ? [item.content] : ["No content available"]
            }));
        } catch (error) {
          console.error("Error parsing admin news data:", error);
        }
      }
      
      // Create stories from existing news
      const newsStories = defaultNews
        .filter(item => item.category === "Web Stories")
        .slice(0, 5)
        .map((item, index) => ({
          id: `story-${item.id}`,
          title: item.headline,
          imageUrl: item.imageUrl,
          timeAgo: getTimeAgo(new Date(item.date)),
          category: item.category,
          content: [
            "This is the first page of the web story.",
            "Here's some more interesting information about this story.",
            "Final thoughts and conclusion about this topic."
          ]
        }));
      
      // Create latest news items
      const latestItems = defaultNews
        .slice(0, 5)
        .map(item => ({
          id: item.id,
          headline: item.headline,
          timeAgo: getTimeAgo(new Date(item.date)),
          imageUrl: item.imageUrl,
          category: item.category
        }));
        
      setLatestNewsItems(latestItems);
      
      // Add additional stories with placeholder images if needed
      const additionalStories = [
        {
          id: 'story-101',
          title: 'The Future of AI in Journalism',
          imageUrl: placeholderImages[0],
          timeAgo: '2 hours ago',
          category: 'Web Stories',
          content: [
            "AI is transforming how news is created and distributed.",
            "Automated reporting is becoming more common for data-heavy stories.",
            "Ethical considerations remain at the forefront of AI journalism."
          ]
        },
        {
          id: 'story-102',
          title: 'Top 10 Travel Destinations for 2025',
          imageUrl: placeholderImages[1],
          timeAgo: '4 hours ago',
          category: 'Lifestyle',
          content: [
            "Sustainable tourism is driving travel trends for 2025.",
            "Remote work hubs are becoming popular destinations.",
            "Cultural immersion experiences top the list for travelers."
          ]
        },
        {
          id: 'story-103',
          title: 'Breakthrough in Renewable Energy Storage',
          imageUrl: placeholderImages[2],
          timeAgo: '5 hours ago',
          category: 'Science',
          content: [
            "New battery technology extends storage capacity by 300%.",
            "This could revolutionize how we use renewable energy.",
            "Commercial applications expected within the next two years."
          ]
        },
        {
          id: 'story-104',
          title: 'Global Economic Outlook for Next Quarter',
          imageUrl: placeholderImages[3],
          timeAgo: '8 hours ago',
          category: 'Business',
          content: [
            "Analysts predict moderate growth across major economies.",
            "Inflation concerns begin to ease as supply chains stabilize.",
            "Tech sector continues to lead market gains despite challenges."
          ]
        },
        {
          id: 'story-105',
          title: 'New Health Study Reveals Benefits of Mediterranean Diet',
          imageUrl: placeholderImages[4],
          timeAgo: '12 hours ago',
          category: 'Health',
          content: [
            "Long-term study confirms heart health benefits.",
            "Cognitive function improvements observed in participants.",
            "Simple dietary changes that can make a big difference."
          ]
        }
      ];
      
      // Combine all stories, prioritizing admin-added ones
      const allStories = [...adminNews, ...newsStories];
      
      // Add additional stories only if we don't have enough
      if (allStories.length < 5) {
        allStories.push(...additionalStories.slice(0, 5 - allStories.length));
      }
      
      // Sort by date (newest first) - convert timeAgo to a sortable value
      allStories.sort((a, b) => {
        // This is a simple comparison - newer items appear first
        if (a.timeAgo && b.timeAgo) {
          if (a.timeAgo.includes('Just now')) return -1;
          if (b.timeAgo.includes('Just now')) return 1;
          
          const aValue = a.timeAgo.match(/(\d+)/);
          const bValue = b.timeAgo.match(/(\d+)/);
          
          if (aValue && bValue) {
            const aNum = parseInt(aValue[0], 10);
            const bNum = parseInt(bValue[0], 10);
            
            if (a.timeAgo.includes('minute') && b.timeAgo.includes('hour')) return -1;
            if (a.timeAgo.includes('hour') && b.timeAgo.includes('minute')) return 1;
            if (a.timeAgo.includes('minute') && b.timeAgo.includes('day')) return -1;
            if (a.timeAgo.includes('day') && b.timeAgo.includes('minute')) return 1;
            if (a.timeAgo.includes('hour') && b.timeAgo.includes('day')) return -1;
            if (a.timeAgo.includes('day') && b.timeAgo.includes('hour')) return 1;
            
            return aNum - bNum; // Lower number (more recent) comes first
          }
        }
        return 0;
      });
      
      setStories(allStories);
      
      // Set current story if id is provided
      if (id) {
        const story = allStories.find(s => s.id === id);
        if (story) {
          setCurrentStory(story);
        }
      }
    };
    
    generateStories();
    
    // Listen for storage changes (when admin updates news)
    window.addEventListener("storage", generateStories);
    window.addEventListener("newsUpdated", generateStories);
    
    return () => {
      window.removeEventListener("storage", generateStories);
      window.removeEventListener("newsUpdated", generateStories);
    };
  }, [id]);
  
  // If viewing a specific story
  if (id && currentStory) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={currentStory.imageUrl} 
                alt={currentStory.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-4">
                <div className="text-xs font-medium text-jiohighlight mb-2">
                  {currentStory.category}
                </div>
                <h1 className="text-xl font-bold mb-4">{currentStory.title}</h1>
                
                {currentStory.content?.map((text, index) => (
                  <p key={index} className="text-gray-700 mb-3">{text}</p>
                ))}
                
                <div className="text-xs text-gray-500 mt-4">
                  {currentStory.timeAgo}
                </div>
              </div>
            </div>
          </div>
          
          {/* Latest News Section - added to the bottom before newsletter */}
          {latestNewsItems.length > 0 && (
            <div className="mt-12">
              <LatestNews 
                title="Latest Updates"
                items={latestNewsItems}
              />
            </div>
          )}
          
          {/* Add newsletter signup at the end */}
          <div className="mt-12">
            <NewsletterSignup />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // List all stories
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Newspaper className="h-6 w-6 text-jiohighlight" />
          <h1 className="text-3xl font-bold">Web Stories</h1>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {stories.map(story => (
            <WebStoryCard
              key={story.id}
              id={story.id}
              title={story.title}
              imageUrl={story.imageUrl}
              timeAgo={story.timeAgo}
              category={story.category}
            />
          ))}
        </div>
        
        {/* Latest News Section - added to the bottom before newsletter */}
        {latestNewsItems.length > 0 && (
          <div className="mt-12">
            <LatestNews 
              title="Latest Updates"
              items={latestNewsItems}
            />
          </div>
        )}
        
        {/* Add newsletter signup at the end */}
        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WebStories;
