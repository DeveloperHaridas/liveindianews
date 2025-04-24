
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import news from "@/data/newsData";
import { cn } from "@/lib/utils";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("Business");
  
  // Get unique categories
  const categories = Array.from(new Set(news.map(item => item.category)));
  
  // Filter news by active category
  const filteredNews = news.filter(item => item.category === activeCategory);
  
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
  
  const getCategoryHoverColor = (category: string): string => {
    switch(category.toLowerCase()) {
      case 'business': return 'hover:bg-jiocategory-business hover:text-white';
      case 'sports': return 'hover:bg-jiocategory-sports hover:text-white';
      case 'entertainment': return 'hover:bg-jiocategory-entertainment hover:text-white';
      case 'technology': return 'hover:bg-jiocategory-technology hover:text-white';
      case 'health': return 'hover:bg-jiocategory-health hover:text-white';
      case 'science': return 'hover:bg-jiocategory-science hover:text-white';
      default: return 'hover:bg-gray-500 hover:text-white';
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">News Categories</h1>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full transition-colors",
                getCategoryHoverColor(category),
                activeCategory === category 
                  ? `${getCategoryColor(category)} text-white` 
                  : "bg-gray-100"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Category Banner */}
        <div className={`${getCategoryColor(activeCategory)} rounded-lg p-6 mb-8 text-white`}>
          <h2 className="text-2xl font-bold">{activeCategory} News</h2>
          <p className="opacity-80">
            Latest updates and top stories from the world of {activeCategory.toLowerCase()}
          </p>
        </div>
        
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(item => (
            <NewsCard
              key={item.id}
              id={item.id}
              headline={item.headline}
              summary={item.summary}
              category={item.category}
              imageUrl={item.imageUrl}
              isPremium={item.isPremium}
            />
          ))}
        </div>
        
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found in this category.</p>
          </div>
        )}
        
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
