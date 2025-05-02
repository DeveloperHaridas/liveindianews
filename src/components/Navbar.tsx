
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, User, Tv, ShieldCheck, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
  const { isAuthenticated, isAdmin, checkAdminStatus } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
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
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-jioblue shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={toggleMenu}>
              <Menu className="h-6 w-6 text-white" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">Live India</span>
              <span className="text-2xl font-bold text-jiohighlight">News</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4 text-white">
            <Link to="/" className="px-3 py-2 hover:text-jiohighlight transition-colors">Home</Link>
            <Link to="/trending" className="px-3 py-2 hover:text-jiohighlight transition-colors">Trending</Link>
            <Link to="/categories" className="px-3 py-2 hover:text-jiohighlight transition-colors">Categories</Link>
            <Link to="/live-tv" className="px-3 py-2 hover:text-jiohighlight transition-colors flex items-center gap-1">
              <Tv className="h-4 w-4" />
              Live TV
            </Link>
            <Link to="/premium" className="px-3 py-2 hover:text-jiohighlight transition-colors">Premium</Link>
            <Link to="/shorts" className="px-3 py-2 hover:text-jiohighlight transition-colors flex items-center gap-1">
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
              className="text-white"
              onClick={() => setOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white"
              onClick={() => navigate(isAdmin ? "/admin" : "/login")}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - Updated to position on left side */}
      <div className={cn(
        "md:hidden bg-jioblue absolute left-0 w-full max-w-[280px] h-screen transition-transform duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 space-y-4">
          <Link 
            to="/" 
            className="block px-3 py-2 text-white hover:bg-jioblue-light transition-colors rounded-md"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link 
            to="/trending" 
            className="block px-3 py-2 text-white hover:bg-jioblue-light transition-colors rounded-md"
            onClick={toggleMenu}
          >
            Trending
          </Link>
          <Link 
            to="/categories" 
            className="block px-3 py-2 text-white hover:bg-jioblue-light transition-colors rounded-md"
            onClick={toggleMenu}
          >
            Categories
          </Link>
          <Link 
            to="/live-tv" 
            className="block px-3 py-2 text-white hover:bg-jioblue-light transition-colors rounded-md flex items-center gap-2"
            onClick={toggleMenu}
          >
            <Tv className="h-4 w-4" />
            Live TV
          </Link>
          <Link 
            to="/premium" 
            className="block px-3 py-2 text-white hover:bg-jioblue-light transition-colors rounded-md"
            onClick={toggleMenu}
          >
            Premium
          </Link>
          <Link 
            to="/shorts" 
            className="block px-3 py-2 text-white hover:bg-jioblue-light transition-colors rounded-md flex items-center gap-2"
            onClick={toggleMenu}
          >
            <Film className="h-4 w-4" />
            Shorts
          </Link>
          
          <Link 
            to="/admin" 
            className="block px-3 py-2 bg-jiohighlight text-white rounded-md flex items-center gap-2"
            onClick={toggleMenu}
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
        </div>
      </div>

      {/* Add overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
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
                      result.type === "video" ? "bg-red-500" : "bg-blue-500"
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

