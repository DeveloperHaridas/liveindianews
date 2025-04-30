
import { Newspaper } from "lucide-react";
import { WebStoryCard } from "./WebStoryCard";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface WebStory {
  id: string;
  title: string;
  imageUrl: string;
  timeAgo?: string;
  category?: string;
}

interface WebStoriesSectionProps {
  stories: WebStory[];
}

export function WebStoriesSection({ stories }: WebStoriesSectionProps) {
  const navigate = useNavigate();

  if (stories.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-jiohighlight" />
          Web Stories
        </h2>
        <Button 
          onClick={() => navigate('/web-stories')} 
          variant="outline"
          className="text-sm"
        >
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {stories.map((story) => (
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
    </div>
  );
}
