
import { Home, Tv, BookOpen, Play, TrendingUp } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-jioblue border-t border-jioblue-light flex justify-between px-2 py-1 z-50">
      <button 
        onClick={() => handleNavigation("/")}
        className="flex flex-col items-center py-1 px-3 w-full focus:outline-none"
      >
        <Home className={`h-5 w-5 ${isActive('/') ? 'text-jiohighlight-light' : 'text-white'}`} />
        <span className={`text-xs font-medium ${isActive('/') ? 'text-jiohighlight-light' : 'text-white'}`}>Home</span>
      </button>
      <button 
        onClick={() => handleNavigation("/trending")}
        className="flex flex-col items-center py-1 px-3 w-full focus:outline-none"
      >
        <TrendingUp className={`h-5 w-5 ${isActive('/trending') ? 'text-jiohighlight-light' : 'text-white'}`} />
        <span className={`text-xs font-medium ${isActive('/trending') ? 'text-jiohighlight-light' : 'text-white'}`}>Trending</span>
      </button>
      <button 
        onClick={() => handleNavigation("/categories")}
        className="flex flex-col items-center py-1 px-3 w-full focus:outline-none"
      >
        <BookOpen className={`h-5 w-5 ${isActive('/categories') ? 'text-jiohighlight-light' : 'text-white'}`} />
        <span className={`text-xs font-medium ${isActive('/categories') ? 'text-jiohighlight-light' : 'text-white'}`}>Categories</span>
      </button>
      <button 
        onClick={() => handleNavigation("/live-tv")}
        className="flex flex-col items-center py-1 px-3 w-full focus:outline-none"
      >
        <Tv className={`h-5 w-5 ${isActive('/live-tv') ? 'text-jiohighlight-light' : 'text-white'}`} />
        <span className={`text-xs font-medium ${isActive('/live-tv') ? 'text-jiohighlight-light' : 'text-white'}`}>Live TV</span>
      </button>
      <button 
        onClick={() => handleNavigation("/shorts")}
        className="flex flex-col items-center py-1 px-3 w-full focus:outline-none"
      >
        <Play className={`h-5 w-5 ${isActive('/shorts') ? 'text-jiohighlight-light' : 'text-white'}`} />
        <span className={`text-xs font-medium ${isActive('/shorts') ? 'text-jiohighlight-light' : 'text-white'}`}>Shorts</span>
      </button>
    </div>
  );
}
