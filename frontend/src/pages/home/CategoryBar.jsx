import { 
  Box, 
  Typography, 
  Stack, 
  IconButton, 
  Container 
} from "@mui/material";
import { useRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Updated categories from the prototype
const categories = [
  { name: "Books", icon: "📚", color: "#0A2647" },
  { name: "Electronics", icon: "💻", color: "#2E86C1" },
  { name: "Dorm Goods", icon: "🛏️", color: "#E67E22" },
  { name: "Apparel", icon: "👕", color: "#E74C3C" },
  { name: "Stationery", icon: "✏️", color: "#16A085" },
  { name: "Sports Gear", icon: "🏸", color: "#27AE60" },
  { name: "Cycles", icon: "🚲", color: "#2980B9" },
  { name: "Lab Gear", icon: "🧪", color: "#8E44AD" },
];

const CategoryBar = ({ onCategorySelect }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ my: 4, position: "relative" }}>
      <Typography variant="h6" fontWeight="800" sx={{ mb: 2, color: "#0A2647" }}>
        Popular Categories in your University
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
        {/* Left Scroll Button */}
        <IconButton 
          onClick={() => scroll("left")}
          sx={{ 
            position: "absolute", left: -20, zIndex: 2, 
            bgcolor: "white", boxShadow: 2, 
            "&:hover": { bgcolor: "#f5f5f5" },
            display: { xs: "none", md: "flex" }
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* Scrollable Container */}
        <Stack
          ref={scrollRef}
          direction="row"
          spacing={2}
          sx={{
            overflowX: "auto",
            scrollBehavior: "smooth",
            pb: 2,
            px: 1,
            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for clean UI
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {categories.map((cat) => (
            <Box
              key={cat.name}
              onClick={() => onCategorySelect?.(cat.name)}
              sx={{
                minWidth: { xs: 120, md: 160 },
                height: { xs: 100, md: 130 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "white",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "2px solid transparent",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: "#E86A33", // Accent Orange from prototype
                  boxShadow: "0 8px 20px rgba(232, 106, 51, 0.15)",
                },
              }}
            >
              <Typography sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, mb: 1 }}>
                {cat.icon}
              </Typography>
              <Typography 
                fontWeight="700" 
                sx={{ 
                  color: "#0A2647", 
                  fontSize: { xs: "0.8rem", md: "0.9rem" } 
                }}
              >
                {cat.name}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Right Scroll Button */}
        <IconButton 
          onClick={() => scroll("right")}
          sx={{ 
            position: "absolute", right: -20, zIndex: 2, 
            bgcolor: "white", boxShadow: 2, 
            "&:hover": { bgcolor: "#f5f5f5" },
            display: { xs: "none", md: "flex" }
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default CategoryBar;