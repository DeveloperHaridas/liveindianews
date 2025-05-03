
import { Home, Tv, BookOpen, Play, TrendingUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/60 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.03)] flex justify-between px-2 py-1 z-50">
      <button 
        onClick={() => handleNavigation("/")}
        className="flex flex-col items-center py-1 px-3 w-full focus:outline-none"
      >
        <Home className={`h-5 w-5 ${isActive('/') ? 'text-jiohighlight' : 'text-gray-500'}`} />
        <span className={`text-xs font-medium ${isActive('/') ? 'text-jiohighlight' : 'text-gray-600'}`}>Home</span>
      </button>
      <button 
        onClick={() => handleNavigation("/trending")}
        className="flex flex-col items-center py-1 px-3 w-full focus:outline-none"
      >
        <TrendingUp className={`h-5 w-5 ${isActive('/trending') ? 'text-jiohighlight' : 'text-gray-500'}`} />
        <span className={`text-xs font-medium ${isActive('/trending') ? 'text-jiohighlight' : 'text-gray-600'}`}>Trending</span>
      </button>
      <button 
        onClick={() => handleNavigation("/categories")}
        className="flex flex-col items-center py-1 px-3 w-full focus:outline-none"
      >
        <BookOpen className={`h-5 w-5 ${isActive('/categories') ? 'text-jiohighlight' : 'text-gray-500'}`} />
        <span className={`text-xs font-medium ${isActive('/categories') ? 'text-jiohighlight' : 'text-gray-600'}`}>Categories</span>
      </button>
      <button 
        onClick={() => handleNavigation("/live-tv")}
        className="flex flex-col items-center py-1 px-3 w-full focus:outline-none"
      >
        <Tv className={`h-5 w-5 ${isActive('/live-tv') ? 'text-jiohighlight' : 'text-gray-500'}`} />
        <span className={`text-xs font-medium ${isActive('/live-tv') ? 'text-jiohighlight' : 'text-gray-600'}`}>Live TV</span>
      </button>
      <button 
        onClick={() => handleNavigation("/shorts")}
        className="flex flex-col items-center py-1 px-3 w-full focus:outline-none relative"
      >
        <Play className={`h-5 w-5 ${isActive('/shorts') ? 'text-jiohighlight' : 'text-gray-500'}`} />
        <span className={`text-xs font-medium ${isActive('/shorts') ? 'text-jiohighlight' : 'text-gray-600'}`}>Shorts</span>
        {isActive('/shorts') && (
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-jiohighlight rounded-t-full"></span>
        )}
      </button>
    </div>
  );
}
