
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsBanner } from "@/components/NewsBanner";
import { NewsCard } from "@/components/NewsCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import news from "@/data/newsData";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Get the featured news (first article)
  const featuredNews = news[0];

  // Get categories from news data
  const categories = Array.from(new Set(news.map(item => item.category)));

  // Filter news based on active category
  const filteredNews = activeCategory === "all" 
    ? news.slice(1) // Skip the featured news
    : news.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase() && item.id !== featuredNews.id);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Featured News Banner */}
        <div className="mb-8">
          <NewsBanner 
            headline={featuredNews.headline}
            category={featuredNews.category}
            imageUrl={featuredNews.imageUrl}
            id={featuredNews.id}
          />
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

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

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
