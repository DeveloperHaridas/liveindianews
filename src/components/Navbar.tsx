
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, User, Tv, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, checkAdminStatus } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    // Check admin status when component mounts or authentication changes
    checkAdminStatus();
  }, [isAuthenticated, checkAdminStatus]);
  
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
            <Link to="/live-tv" className="px-3 py-2 hover:text-jiohighlight transition-colors flex items-center gap-1">
              <Tv className="h-4 w-4" />
              Live TV
            </Link>
            <Link to="/trending" className="px-3 py-2 hover:text-jiohighlight transition-colors">Trending</Link>
            <Link to="/categories" className="px-3 py-2 hover:text-jiohighlight transition-colors">Categories</Link>
            <Link to="/premium" className="px-3 py-2 hover:text-jiohighlight transition-colors">Premium</Link>
            
            {/* Admin Link - Always visible for quick access */}
            <Link 
              to="/admin" 
              className="px-3 py-2 bg-jiohighlight hover:bg-opacity-80 text-white rounded-md flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white">
              <Search className="h-5 w-5" />
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
      
      <div className={cn(
        "md:hidden bg-jioblue-light absolute w-full transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-64 py-2" : "max-h-0 py-0 overflow-hidden"
      )}>
        <div className="container mx-auto px-4 space-y-2">
          <Link 
            to="/" 
            className="block px-3 py-2 text-white hover:bg-jioblue transition-colors rounded-md"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link 
            to="/live-tv" 
            className="block px-3 py-2 text-white hover:bg-jioblue transition-colors rounded-md flex items-center gap-2"
            onClick={toggleMenu}
          >
            <Tv className="h-4 w-4" />
            Live TV
          </Link>
          <Link 
            to="/trending" 
            className="block px-3 py-2 text-white hover:bg-jioblue transition-colors rounded-md"
            onClick={toggleMenu}
          >
            Trending
          </Link>
          <Link 
            to="/categories" 
            className="block px-3 py-2 text-white hover:bg-jioblue transition-colors rounded-md"
            onClick={toggleMenu}
          >
            Categories
          </Link>
          <Link 
            to="/premium" 
            className="block px-3 py-2 text-white hover:bg-jioblue transition-colors rounded-md"
            onClick={toggleMenu}
          >
            Premium
          </Link>
          
          {/* Admin Link in mobile menu - Always visible */}
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
    </header>
  );
}
