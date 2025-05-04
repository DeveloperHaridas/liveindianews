
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, User, Tv, ShieldCheck, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import defaultNews from "@/data/newsData";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isBlurred, setIsBlurred] = useState(true);
  const { isAuthenticated, isAdmin, checkAdminStatus } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsBlurred(false); // Remove blur when menu is toggled
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu after navigation
    setIsBlurred(false); // Remove blur after navigation
  };
  
  useEffect(() => {
    // Check admin status when component mounts or authentication changes
    checkAdminStatus();
  }, [isAuthenticated, checkAdminStatus]);

  // Search functionality
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    // Get news from localStorage
    const newsResults = [];
    try {
      // Search in admin created news
      const adminNewsData = localStorage.getItem("adminNewsData");
      if (adminNewsData) {
        const adminNews = JSON.parse(adminNewsData);
        const filteredAdminNews = adminNews.filter((item: any) =>
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.content?.toLowerCase().includes(query.toLowerCase()) ||
          item.category?.toLowerCase().includes(query.toLowerCase())
        );
        newsResults.push(...filteredAdminNews.map((item: any) => ({
          ...item,
          type: "news",
          url: `/news/${item.id}`
        })));
      }
      
      // Search in default news
      const filteredDefaultNews = defaultNews.filter((item) =>
        item.headline?.toLowerCase().includes(query.toLowerCase()) ||
        item.summary?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      );
      newsResults.push(...filteredDefaultNews.map((item) => ({
        id: item.id,
        title: item.headline,
        content: item.summary,
        category: item.category,
        type: "news",
        url: `/news/${item.id}`
      })));

      // Search in videos
      const videoNewsData = localStorage.getItem("videoNewsData");
      if (videoNewsData) {
        const videoNews = JSON.parse(videoNewsData);
        const filteredVideoNews = videoNews.filter((item: any) =>
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.category?.toLowerCase().includes(query.toLowerCase())
        );
        newsResults.push(...filteredVideoNews.map((item: any) => ({
          ...item,
          type: "video",
          url: `/shorts?video=${item.id}`
        })));
      }
    } catch (error) {
      console.error("Error searching news data:", error);
    }

    setSearchResults(newsResults);
  };

  const handleSelectSearchResult = (url: string) => {
    setOpen(false);
    navigate(url);
    setIsBlurred(false); // Remove blur after search selection
  };

  // Determine navbar classes based on blur state
  const navbarClasses = cn(
    "sticky top-0 z-50 w-full shadow-sm", 
    isBlurred ? "bg-yellow-100/95 backdrop-blur-md" : "bg-yellow-100"
  );
  
  return (
    <header className={navbarClasses} onClick={() => setIsBlurred(false)}>
      <div className="w-full px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={toggleMenu}>
              <Menu className="h-6 w-6 text-jioblue" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-jioblue">Live India</span>
              <span className="text-2xl font-bold text-jiohighlight">News</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-jioblue hover:text-jiohighlight font-medium transition-colors">Home</Link>
            <Link to="/trending" className="px-3 py-2 text-jioblue hover:text-jiohighlight font-medium transition-colors">Trending</Link>
            <Link to="/categories" className="px-3 py-2 text-jioblue hover:text-jiohighlight font-medium transition-colors">Categories</Link>
            <Link to="/live-tv" className="px-3 py-2 text-jioblue hover:text-jiohighlight font-medium transition-colors flex items-center gap-1">
              <Tv className="h-4 w-4" />
              Live TV
            </Link>
            <Link to="/premium" className="px-3 py-2 text-jioblue hover:text-jiohighlight font-medium transition-colors">Premium</Link>
            <Link to="/shorts" className="px-3 py-2 text-jioblue hover:text-jiohighlight font-medium transition-colors flex items-center gap-1">
              <Film className="h-4 w-4" />
              Shorts
            </Link>
            
            <Link 
              to="/admin" 
              className="px-3 py-2 bg-jiohighlight hover:bg-opacity-80 text-white rounded-md flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-jioblue"
              onClick={() => {
                setOpen(true);
                setIsBlurred(false);
              }}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-jioblue"
              onClick={() => {
                navigate(isAdmin ? "/admin" : "/login");
                setIsBlurred(false);
              }}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - Updated with wider width and better blur effect */}
      <div className={cn(
        "md:hidden bg-white absolute left-0 w-full max-w-[320px] h-screen transition-transform duration-300 ease-in-out z-50 shadow-lg",
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-jioblue">Live India</span>
            <span className="text-2xl font-bold text-jiohighlight">News</span>
          </div>
          
          <button 
            onClick={() => handleNavigation("/")}
            className="block w-full text-left px-4 py-3 text-jioblue hover:bg-gray-50 font-medium transition-colors rounded-md"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigation("/trending")}
            className="block w-full text-left px-4 py-3 text-jioblue hover:bg-gray-50 font-medium transition-colors rounded-md"
          >
            Trending
          </button>
          <button 
            onClick={() => handleNavigation("/categories")}
            className="block w-full text-left px-4 py-3 text-jioblue hover:bg-gray-50 font-medium transition-colors rounded-md"
          >
            Categories
          </button>
          <button 
            onClick={() => handleNavigation("/live-tv")}
            className="block w-full text-left px-4 py-3 text-jioblue hover:bg-gray-50 font-medium transition-colors rounded-md flex items-center gap-2"
          >
            <Tv className="h-5 w-5" />
            Live TV
          </button>
          <button 
            onClick={() => handleNavigation("/premium")}
            className="block w-full text-left px-4 py-3 text-jioblue hover:bg-gray-50 font-medium transition-colors rounded-md"
          >
            Premium
          </button>
          <button 
            onClick={() => handleNavigation("/shorts")}
            className="block w-full text-left px-4 py-3 text-jioblue hover:bg-gray-50 font-medium transition-colors rounded-md flex items-center gap-2"
          >
            <Film className="h-5 w-5" />
            Shorts
          </button>
          
          <button 
            onClick={() => handleNavigation("/admin")}
            className="block w-full text-left px-4 py-3 bg-jiohighlight text-white rounded-md flex items-center gap-2 shadow-sm"
          >
            <ShieldCheck className="h-5 w-5" />
            Admin
          </button>
        </div>
      </div>

      {/* Add overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden" 
          onClick={toggleMenu}
        />
      )}

      {/* Search Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search news, videos, and more..." 
          value={searchQuery}
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchResults.length > 0 && (
            <CommandGroup heading="Search Results">
              {searchResults.map((result) => (
                <CommandItem
                  key={`${result.type}-${result.id}`}
                  onSelect={() => handleSelectSearchResult(result.url)}
                  className="flex flex-col items-start"
                >
                  <div className="font-medium">{result.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-white text-xs",
                      result.type === "video" ? "bg-red-500" : "bg-jiohighlight"
                    )}>
                      {result.type === "video" ? "Video" : "News"}
                    </span>
                    <span>{result.category}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  );
}
