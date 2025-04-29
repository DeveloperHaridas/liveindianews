import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import news from "@/data/newsData";
import { useAuth } from "@/hooks/useAuth";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Find the article with the matching ID
  const article = news.find(item => item.id === id);
  
  // Get related articles in the same category
  const relatedArticles = article 
    ? news.filter(item => item.category === article.category && item.id !== article.id).slice(0, 3)
    : [];
  
  // If article doesn't exist, show not found
  if (!article) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">
              Sorry, the article you're looking for doesn't exist or may have been removed.
            </p>
            <Button onClick={() => navigate("/")} variant="outline">
              Return to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If it's a premium article and user is not authenticated, show login prompt
  if (article.isPremium && !isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <img 
              src={article.imageUrl} 
              alt={article.headline}
              className="w-full h-[350px] object-cover rounded-lg mb-6"
            />
            <h1 className="text-3xl font-bold mb-4">{article.headline}</h1>
            <p className="text-gray-600 mb-2">{article.summary}</p>
            
            {/* Premium content blur overlay */}
            <div className="relative mt-8">
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <div className="bg-jioblue text-white p-2 rounded-full mb-4">
                  PREMIUM
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Article</h3>
                <p className="text-gray-600 mb-6 text-center max-w-md">
                  Sign in to access premium content and read the full article
                </p>
                <Button 
                  onClick={() => navigate("/login")} 
                  className="bg-jiohighlight hover:bg-jiohighlight-light"
                >
                  Sign in to continue reading
                </Button>
              </div>
              <div className="h-[200px] overflow-hidden">
                <p className="text-lg leading-relaxed text-gray-700">
                  {article.content.substring(0, 150)}...
                </p>
              </div>
            </div>
          </div>
          
          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map(item => (
                  <NewsCard
                    key={item.id}
                    id={item.id}
                    headline={item.headline}
                    category={item.category}
                    imageUrl={item.imageUrl}
                    isPremium={item.isPremium}
                  />
                ))}
              </div>
            </div>
          )}
          
          <NewsletterSignup />
        </main>
        <Footer />
      </div>
    );
  }
  
  // Normal article display
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className={`${article.isPremium ? 'bg-yellow-500' : getCategoryColor(article.category)} category-badge mb-4`}>
            {article.isPremium ? 'PREMIUM' : article.category}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{article.headline}</h1>
          
          <div className="flex justify-between items-center mb-6 text-gray-500">
            <span>Published on {new Date(article.date).toLocaleDateString()}</span>
            {article.source && (
              <span className="font-medium">{article.source}</span>
            )}
          </div>
          
          <img 
            src={article.imageUrl} 
            alt={article.headline}
            className="w-full h-[400px] object-cover rounded-lg mb-6"
          />
          
          <p className="text-lg font-medium text-gray-700 mb-6">
            {article.summary}
          </p>
          
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">
              {article.content}
            </p>
          </div>
        </div>
        
        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(item => (
                <NewsCard
                  key={item.id}
                  id={item.id}
                  headline={item.headline}
                  category={item.category}
                  imageUrl={item.imageUrl}
                  isPremium={item.isPremium}
                  source={item.source}
                />
              ))}
            </div>
          </div>
        )}
        
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
};

// Helper function to get category colors
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

export default NewsDetail;
