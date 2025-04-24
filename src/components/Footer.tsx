
import { Link } from "react-router-dom";
import { Info, Mail, Shield, Megaphone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-jioblue text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">Live India</span>
              <span className="text-2xl font-bold text-jiohighlight">News</span>
            </Link>
            <p className="mt-2 text-gray-300">
              Your one-stop destination for the latest news from around India and the world.
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
              <li><Link to="/category/education" className="text-gray-300 hover:text-jiohighlight transition-colors">Education</Link></li>
              <li><Link to="/category/health" className="text-gray-300 hover:text-jiohighlight transition-colors">Health</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-jiohighlight transition-colors flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-jiohighlight transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-jiohighlight transition-colors flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-300 hover:text-jiohighlight transition-colors flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Disclaimer</span>
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-gray-300 hover:text-jiohighlight transition-colors flex items-center gap-2">
                  <Megaphone className="h-4 w-4" />
                  <span>Advertise with Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Live India News. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
