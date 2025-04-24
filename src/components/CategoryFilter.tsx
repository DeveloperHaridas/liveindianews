
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onSelectCategory }: CategoryFilterProps) {
  const getCategoryColor = (category: string): string => {
    switch(category.toLowerCase()) {
      case 'business': return 'hover:text-jiocategory-business';
      case 'sports': return 'hover:text-jiocategory-sports';
      case 'entertainment': return 'hover:text-jiocategory-entertainment';
      case 'technology': return 'hover:text-jiocategory-technology';
      case 'health': return 'hover:text-jiocategory-health';
      case 'science': return 'hover:text-jiocategory-science';
      default: return 'hover:text-jiohighlight';
    }
  };
  
  const getActiveCategoryColor = (category: string): string => {
    switch(category.toLowerCase()) {
      case 'business': return 'text-jiocategory-business';
      case 'sports': return 'text-jiocategory-sports';
      case 'entertainment': return 'text-jiocategory-entertainment';
      case 'technology': return 'text-jiocategory-technology';
      case 'health': return 'text-jiocategory-health';
      case 'science': return 'text-jiocategory-science';
      case 'all': return 'text-jiohighlight';
      default: return 'text-jiohighlight';
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button 
        variant="ghost"
        onClick={() => onSelectCategory('all')}
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          activeCategory === 'all' 
            ? `${getActiveCategoryColor('all')} border-jiohighlight bg-blue-50` 
            : "border-gray-200 hover:border-jiohighlight hover:text-jiohighlight"
        )}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant="ghost"
          onClick={() => onSelectCategory(category)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            activeCategory === category 
              ? `${getActiveCategoryColor(category)} border-current bg-blue-50` 
              : `border-gray-200 ${getCategoryColor(category)}`
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
