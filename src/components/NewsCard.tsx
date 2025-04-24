
import { Link } from "react-router-dom";

interface NewsCardProps {
  id: string;
  headline: string;
  summary?: string;
  category: string;
  imageUrl: string;
  isPremium?: boolean;
}

export function NewsCard({ id, headline, summary, category, imageUrl, isPremium = false }: NewsCardProps) {
  const getCategoryColor = (category: string): string => {
    switch(category.toLowerCase()) {
      case 'business': return 'bg-jiocategory-business';
      case 'sports': return 'bg-jiocategory-sports';
      case 'entertainment': return 'bg-jiocategory-entertainment';
      case 'technology': return 'bg-jiocategory-technology';
      case 'health': return 'bg-jiocategory-health';
      case 'science': return 'bg-jiocategory-science';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="news-card bg-white border border-gray-200 h-full flex flex-col animate-fade-in">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={headline}
          className="w-full h-48 object-cover"
        />
        <div className={`${getCategoryColor(category)} category-badge absolute top-3 left-3`}>
          {category}
        </div>
        {isPremium && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-xs font-bold px-2 py-1 rounded-full text-white">
            PREMIUM
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <Link to={isPremium ? "/premium" : `/news/${id}`} className="flex-grow">
          <h3 className="text-lg font-semibold mb-2 hover:text-jiohighlight transition-colors">
            {headline}
          </h3>
          {summary && <p className="text-gray-600 text-sm line-clamp-3">{summary}</p>}
        </Link>
        <div className="mt-4 text-gray-500 text-xs">
          {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
