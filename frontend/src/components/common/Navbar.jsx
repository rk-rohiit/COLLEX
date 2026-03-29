import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  // 🔥 Detect Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  // 🔥 Scroll to section
  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const gradient = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        background: scrolled
          ? "rgba(15,15,15,0.7)"
          : "rgba(15,15,15,0.3)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Container>
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* LOGO */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              cursor: "pointer",
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={() => handleScrollTo("home")}
          >
            Collex
          </Typography>

          {/* NAV LINKS */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                sx={{
                  color: "white",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    background: gradient,
                    transition: "0.3s",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* CTA BUTTON */}
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{
              ml: 3,
              px: 3,
              borderRadius: "999px",
              background: gradient,
              display: { xs: "none", md: "inline-flex" },
            }}
          >
            Sign In
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;