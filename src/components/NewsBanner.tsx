
import { Link } from "react-router-dom";

interface NewsBannerProps {
  headline: string;
  category: string;
  imageUrl: string;
  id: string;
  source?: string; // Adding source prop
}

export function NewsBanner({ headline, category, imageUrl, id, source }: NewsBannerProps) {
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
    <div className="relative overflow-hidden rounded-lg h-[350px] md:h-[450px] w-full bg-jioblue animate-fade-in shadow-lg">
      <img 
        src={imageUrl} 
        alt={headline}
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
        <div className={`${getCategoryColor(category)} category-badge self-start mb-3`}>
          {category}
        </div>
        <Link to={`/news/${id}`}>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 hover:text-jiohighlight transition-colors">
            {headline}
          </h1>
        </Link>
        <div className="flex justify-between items-center">
          <p className="text-white/80 text-sm md:text-base">
            {new Date().toLocaleDateString()}
          </p>
          {source && <p className="text-white font-medium text-sm md:text-base">{source}</p>}
        </div>
      </div>
    </div>
  );
}
