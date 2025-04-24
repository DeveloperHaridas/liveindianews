
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-jioblue text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">Jio</span>
              <span className="text-2xl font-bold text-jiohighlight">News</span>
            </Link>
            <p className="mt-2 text-gray-300">
              Your one-stop destination for the latest news from around the world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-jiohighlight transition-colors">Home</Link></li>
              <li><Link to="/trending" className="text-gray-300 hover:text-jiohighlight transition-colors">Trending</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-jiohighlight transition-colors">Categories</Link></li>
              <li><Link to="/premium" className="text-gray-300 hover:text-jiohighlight transition-colors">Premium</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/business" className="text-gray-300 hover:text-jiohighlight transition-colors">Business</Link></li>
              <li><Link to="/category/sports" className="text-gray-300 hover:text-jiohighlight transition-colors">Sports</Link></li>
              <li><Link to="/category/technology" className="text-gray-300 hover:text-jiohighlight transition-colors">Technology</Link></li>
              <li><Link to="/category/entertainment" className="text-gray-300 hover:text-jiohighlight transition-colors">Entertainment</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Jio News. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
