
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface WebStoryCardProps {
  id: string;
  title: string;
  imageUrl: string;
  timeAgo?: string;
  category?: string;
}

export function WebStoryCard({ id, title, imageUrl, timeAgo, category }: WebStoryCardProps) {
  return (
    <Link to={`/web-stories/${id}`} className="group">
      <div className="relative aspect-[9/16] overflow-hidden rounded-lg">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 flex flex-col justify-end p-3">
          {category && (
            <span className="text-xs text-white/80 mb-1">{category}</span>
          )}
          <h3 className="text-sm font-medium text-white line-clamp-2">
            {title}
          </h3>
          {timeAgo && (
            <span className="text-xs text-white/70 mt-1">{timeAgo}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
