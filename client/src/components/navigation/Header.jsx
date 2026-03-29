import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import theme from "../../theme";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  const gradient = `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed w-full z-50 transition-all duration-300"
      style={{
        background:
          scrollY > 50 ? "rgba(255,255,255,0.9)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(10px)" : "none",
        boxShadow:
          scrollY > 50 ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="Collex" className="h-10 w-auto" />

            <span
              className="text-2xl font-bold"
              style={{ color: theme.colors.textDark }}
            >
              Collex
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">

            {["features", "how-it-works", "categories", "contact"].map(
              (item, i) => (
                <a
                  key={i}
                  href={`#${item}`}
                  className="text-sm font-medium transition"
                  style={{ color: theme.colors.textLight }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = theme.colors.primary)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = theme.colors.textLight)
                  }
                >
                  {item.replace("-", " ").toUpperCase()}
                </a>
              )
            )}

            {/* CTA BUTTON */}
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-2 text-white rounded-full shadow-md transition"
              style={{ background: gradient }}
            >
              Join Now
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X style={{ color: theme.colors.textDark }} />
            ) : (
              <Menu style={{ color: theme.colors.textDark }} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div
          className="md:hidden border-t px-4 py-4 space-y-4"
          style={{ background: theme.colors.background }}
        >
          {["features", "how-it-works", "categories", "contact"].map(
            (item, i) => (
              <a
                key={i}
                href={`#${item}`}
                className="block text-sm"
                style={{ color: theme.colors.textLight }}
              >
                {item.replace("-", " ").toUpperCase()}
              </a>
            )
          )}

          <button
            onClick={() => navigate("/signin")}
            className="w-full py-2 text-white rounded-full"
            style={{ background: gradient }}
          >
            Join Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;