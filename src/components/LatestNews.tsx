
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface LatestNewsItemProps {
  id: string;
  headline: string;
  timeAgo: string;
  imageUrl?: string;
  category?: string;
}

export function LatestNewsItem({ id, headline, timeAgo, imageUrl, category }: LatestNewsItemProps) {
  return (
    <Link to={`/news/${id}`} className="group flex items-center gap-3 py-3">
      {imageUrl && (
        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
          <img src={imageUrl} alt={headline} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-grow">
        {category && (
          <div className="text-xs font-medium text-jiohighlight mb-1">{category}</div>
        )}
        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-jiohighlight transition-colors">
          {headline}
        </h3>
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
          <Clock size={12} />
          <span>{timeAgo}</span>
        </div>
      </div>
    </Link>
  );
}

interface LatestNewsProps {
  items: Array<{
    id: string;
    headline: string;
    timeAgo: string;
    imageUrl?: string;
    category?: string;
  }>;
  title: string;
}

export function LatestNews({ items, title }: LatestNewsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <Clock className="h-5 w-5 text-jiohighlight" />
        {title}
      </h2>
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <LatestNewsItem
            key={item.id}
            id={item.id}
            headline={item.headline}
            timeAgo={item.timeAgo}
            imageUrl={item.imageUrl}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
}
