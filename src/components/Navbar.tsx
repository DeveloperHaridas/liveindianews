
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, User, Tv, ShieldCheck, Film, X, Home, TrendingUp, LayoutGrid, Globe2, GraduationCap, Newspaper, Monitor, Music, Dumbbell, Heart, Stethoscope, Building2, Crown, MapPin, PhoneCall } from "lucide-react";
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
    setIsBlurred(false);
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsBlurred(false);
  };
  
  useEffect(() => {
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
    setIsBlurred(false);
  };

  // Determine navbar classes based on blur state
  const navbarClasses = cn(
    "sticky top-0 z-50 w-full shadow-sm", 
    isBlurred ? "bg-white/95 backdrop-blur-md" : "bg-white"
  );
  
  return (
    <header className={navbarClasses} onClick={() => setIsBlurred(false)}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <Button variant="ghost" size="icon" className="mr-2" onClick={toggleMenu}>
                <Menu className="h-6 w-6 text-jioblue" />
              </Button>
            )}
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
      
      {/* Mobile menu - only render when isMobile is true */}
      {isMobile && (
        <div className={cn(
          "fixed inset-0 z-50 transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="w-4/5 max-w-[300px] h-full bg-gradient-to-b from-black to-gray-900 text-white">
            <div className="flex justify-between items-center p-5 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">Live India</span>
                <span className="text-2xl font-bold text-jiohighlight">News</span>
              </div>
              <Button variant="ghost" size="icon" className="text-white" onClick={toggleMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto">
              {/* Main Navigation */}
              <div className="p-5 border-b border-gray-800">
                <div className="space-y-0">
                  <button 
                    onClick={() => handleNavigation("/")}
                    className="w-full flex items-center gap-3 text-left py-3 border-b border-gray-800 text-white hover:text-jiohighlight"
                  >
                    <Home className="h-5 w-5" /> Home
                  </button>
                  <button 
                    onClick={() => handleNavigation("/trending")}
                    className="w-full flex items-center gap-3 text-left py-3 border-b border-gray-800 text-white hover:text-jiohighlight"
                  >
                    <TrendingUp className="h-5 w-5" /> Trending
                  </button>
                  <button 
                    onClick={() => handleNavigation("/live-tv")}
                    className="w-full flex items-center gap-3 text-left py-3 border-b border-gray-800 text-white hover:text-jiohighlight"
                  >
                    <Tv className="h-5 w-5" /> Live TV
                  </button>
                  <button 
                    onClick={() => handleNavigation("/premium")}
                    className="w-full flex items-center gap-3 text-left py-3 border-b border-gray-800 text-white hover:text-jiohighlight"
                  >
                    <Crown className="h-5 w-5" /> 
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent font-semibold">Premium</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation("/shorts")}
                    className="w-full flex items-center gap-3 text-left py-3 border-b border-gray-800 text-white hover:text-jiohighlight"
                  >
                    <Film className="h-5 w-5" /> Shorts Videos
                  </button>
                  <button 
                    onClick={() => handleNavigation("/admin")}
                    className="w-full flex items-center gap-3 text-left py-3 border-b border-gray-800 bg-jiohighlight/10 text-white hover:bg-jiohighlight/20"
                  >
                    <ShieldCheck className="h-5 w-5" /> Admin
                  </button>
                  <button 
                    onClick={() => handleNavigation("/contact")}
                    className="w-full flex items-center gap-3 text-left py-3 border-b border-gray-800 text-white hover:text-jiohighlight"
                  >
                    <PhoneCall className="h-5 w-5" /> Contact Us
                  </button>
                </div>
              </div>
              
              {/* Categories Section */}
              <div className="p-5 border-b border-gray-800">
                <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" /> SECTIONS
                </h3>
                <div className="space-y-0">
                  <button 
                    onClick={() => handleNavigation("/categories/india")}
                    className="w-full flex items-center gap-3 text-left py-2 border-b border-gray-700/50 text-white/90 hover:text-jiohighlight"
                  >
                    <MapPin className="h-4 w-4" /> India
                  </button>
                  <button 
                    onClick={() => handleNavigation("/categories/world")}
                    className="w-full flex items-center gap-3 text-left py-2 border-b border-gray-700/50 text-white/90 hover:text-jiohighlight"
                  >
                    <Globe2 className="h-4 w-4" /> World
                  </button>
                  <button 
                    onClick={() => handleNavigation("/categories/education")}
                    className="w-full flex items-center gap-3 text-left py-2 border-b border-gray-700/50 text-white/90 hover:text-jiohighlight"
                  >
                    <GraduationCap className="h-4 w-4" /> Education
                  </button>
                  <button 
                    onClick={() => handleNavigation("/web-stories")}
                    className="w-full flex items-center gap-3 text-left py-2 border-b border-gray-700/50 text-white/90 hover:text-jiohighlight"
                  >
                    <Newspaper className="h-4 w-4" /> Web Stories
                  </button>
                  <button 
                    onClick={() => handleNavigation("/categories/technology")}
                    className="w-full flex items-center gap-3 text-left py-2 border-b border-gray-700/50 text-white/90 hover:text-jiohighlight"
                  >
                    <Monitor className="h-4 w-4" /> Technology
                  </button>
                  <button 
                    onClick={() => handleNavigation("/categories/entertainment")}
                    className="w-full flex items-center gap-3 text-left py-2 border-b border-gray-700/50 text-white/90 hover:text-jiohighlight"
                  >
                    <Music className="h-4 w-4" /> Entertainment
                  </button>
                  <button 
                    onClick={() => handleNavigation("/categories/sports")}
                    className="w-full flex items-center gap-3 text-left py-2 border-b border-gray-700/50 text-white/90 hover:text-jiohighlight"
                  >
                    <Dumbbell className="h-4 w-4" /> Sports
                  </button>
                  <button 
                    onClick={() => handleNavigation("/categories/lifestyle")}
                    className="w-full flex items-center gap-3 text-left py-2 border-b border-gray-700/50 text-white/90 hover:text-jiohighlight"
                  >
                    <Heart className="h-4 w-4" /> Lifestyle
                  </button>
                  <button 
                    onClick={() => handleNavigation("/categories/health")}
                    className="w-full flex items-center gap-3 text-left py-2 border-b border-gray-700/50 text-white/90 hover:text-jiohighlight"
                  >
                    <Stethoscope className="h-4 w-4" /> Health
                  </button>
                  <button 
                    onClick={() => handleNavigation("/categories/business")}
                    className="w-full flex items-center gap-3 text-left py-2 border-b border-gray-700/50 text-white/90 hover:text-jiohighlight"
                  >
                    <Building2 className="h-4 w-4" /> Business
                  </button>
                  <button 
                    onClick={() => handleNavigation("/categories/city")}
                    className="w-full flex items-center gap-3 text-left py-2 border-b border-gray-700/50 text-white/90 hover:text-jiohighlight"
                  >
                    <MapPin className="h-4 w-4" /> City
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Semi-transparent overlay to close the menu when clicking outside */}
          <div 
            className="absolute inset-0 bg-black/50 -z-10"
            onClick={toggleMenu} 
          />
        </div>
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
