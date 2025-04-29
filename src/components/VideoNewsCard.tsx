
import { Video, Clock } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface VideoNews {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  date: string;
  description?: string;
}

interface VideoNewsCardProps {
  video: VideoNews;
}

export function VideoNewsCard({ video }: VideoNewsCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const getCategoryColor = (category: string): string => {
    switch(category.toLowerCase()) {
      case 'politics': return 'bg-blue-500';
      case 'sports': return 'bg-jiocategory-sports';
      case 'technology': return 'bg-jiocategory-technology';
      case 'health': return 'bg-jiocategory-health';
      case 'science': return 'bg-jiocategory-science';
      case 'entertainment': return 'bg-jiocategory-entertainment';
      case 'business': return 'bg-jiocategory-business';
      default: return 'bg-gray-500';
    }
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <>
      <div 
        className="video-news-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="bg-white/90 rounded-full p-3">
              <Video className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className={`${getCategoryColor(video.category)} absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded text-white`}>
            {video.category}
          </div>
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs flex items-center gap-1 px-2 py-1 rounded">
            <Clock className="h-3 w-3" />
            {video.duration}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
          {video.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
          )}
          <div className="text-gray-400 text-xs">
            {formatDate(video.date)}
          </div>
        </div>
      </div>
      
      {/* Video Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black">
          <div className="relative pt-[56.25%] w-full">
            <iframe 
              src={video.videoUrl} 
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          </div>
          <div className="p-4 bg-white">
            <DialogTitle className="mb-2">{video.title}</DialogTitle>
            {video.description && <p className="text-gray-700 text-sm">{video.description}</p>}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
