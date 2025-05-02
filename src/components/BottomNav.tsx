
import { Home, Tv, BookOpen, Play, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-jioblue border-t border-jioblue-light flex justify-between px-2 py-1 z-50">
      <Link to="/" className="flex flex-col items-center py-1 px-3">
        <Home className={`h-5 w-5 ${isActive('/') ? 'text-jiohighlight-light' : 'text-white'}`} />
        <span className={`text-xs font-medium ${isActive('/') ? 'text-jiohighlight-light' : 'text-white'}`}>Home</span>
      </Link>
      <Link to="/trending" className="flex flex-col items-center py-1 px-3">
        <TrendingUp className={`h-5 w-5 ${isActive('/trending') ? 'text-jiohighlight-light' : 'text-white'}`} />
        <span className={`text-xs font-medium ${isActive('/trending') ? 'text-jiohighlight-light' : 'text-white'}`}>Trending</span>
      </Link>
      <Link to="/categories" className="flex flex-col items-center py-1 px-3">
        <BookOpen className={`h-5 w-5 ${isActive('/categories') ? 'text-jiohighlight-light' : 'text-white'}`} />
        <span className={`text-xs font-medium ${isActive('/categories') ? 'text-jiohighlight-light' : 'text-white'}`}>Categories</span>
      </Link>
      <Link to="/live-tv" className="flex flex-col items-center py-1 px-3">
        <Tv className={`h-5 w-5 ${isActive('/live-tv') ? 'text-jiohighlight-light' : 'text-white'}`} />
        <span className={`text-xs font-medium ${isActive('/live-tv') ? 'text-jiohighlight-light' : 'text-white'}`}>Live TV</span>
      </Link>
      <Link to="/shorts" className="flex flex-col items-center py-1 px-3">
        <Play className={`h-5 w-5 ${isActive('/shorts') ? 'text-jiohighlight-light' : 'text-white'}`} />
        <span className={`text-xs font-medium ${isActive('/shorts') ? 'text-jiohighlight-light' : 'text-white'}`}>Shorts</span>
      </Link>
    </div>
  );
}
