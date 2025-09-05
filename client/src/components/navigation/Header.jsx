import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 bg-gradient-to-br flex items-center justify-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                {/* <span className="text-white font-bold text-lg">C</span>
                 */}
                <img
                  src={Logo}
                  alt="Collex Logo"
                  className="object-contain h-16 w-auto"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900">Collex</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                How it Works
              </a>
              <a
                href="#categories"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Categories
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
              <button
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-cyan-600 transition-all cursor-pointer"
                onClick={() => navigate("/signIn")}
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#features"
                className="block text-gray-700 hover:text-blue-600"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-700 hover:text-blue-600"
              >
                How it Works
              </a>
              <a
                href="#categories"
                className="block text-gray-700 hover:text-blue-600"
              >
                Categories
              </a>
              <a
                href="#contact"
                className="block text-gray-700 hover:text-blue-600"
              >
                Contact
              </a>
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 rounded-full">
                Join Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
