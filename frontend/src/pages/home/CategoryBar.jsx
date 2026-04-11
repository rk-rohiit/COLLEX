import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChairIcon from "@mui/icons-material/Chair";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const categories = [
  { name: "Textbooks",   icon: <MenuBookIcon sx={{ fontSize: 24 }} />,    items: "2,340 items", isMore: false },
  { name: "Furniture",   icon: <ChairIcon sx={{ fontSize: 24 }} />,        items: "1,820 items", isMore: false },
  { name: "Electronics", icon: <LaptopMacIcon sx={{ fontSize: 24 }} />,    items: "1,560 items", isMore: false },
  { name: "Clothing",    icon: <CheckroomIcon sx={{ fontSize: 24 }} />,    items: "980 items",   isMore: false },
  { name: "Sports",      icon: <SportsSoccerIcon sx={{ fontSize: 24 }} />, items: "720 items",   isMore: false },
  { name: "More",        icon: <MoreHorizIcon sx={{ fontSize: 24 }} />,    items: "View all",    isMore: true  },
];

const CategorySection = ({ onCategorySelect }) => {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">

        {/* HEADING */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="caption"
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: "20px",
              backgroundColor: "rgba(26,35,126,0.07)",
              color: "primary.main",
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "inline-block",
              mb: 1.5,
            }}
          >
            Categories
          </Typography>

          <Typography variant="h4" fontWeight="800" color="text.primary" gutterBottom>
            Popular Categories
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Find exactly what you need for campus life
          </Typography>
        </Box>

        {/* GRID */}
        <Grid container spacing={2} justifyContent="center">
          {categories.map((cat) => (
            <Grid item xs={4} sm={4} md={2} key={cat.name}>
              <Paper
                onClick={() => onCategorySelect?.(cat.name)}
                elevation={0}
                sx={{
                  p: { xs: 2, md: 2.5 },
                  borderRadius: "16px",
                  textAlign: "center",
                  cursor: "pointer",
                  border: cat.isMore ? "1.5px dashed" : "0.5px solid",
                  borderColor: cat.isMore
                    ? "rgba(26,35,126,0.2)"
                    : "divider",
                  bgcolor: cat.isMore
                    ? "rgba(26,35,126,0.02)"
                    : "background.paper",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 24px rgba(26,35,126,0.10)",
                    borderColor: "rgba(26,35,126,0.3)",
                  },
                }}
              >
                {/* ICON */}
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                    backgroundColor: cat.isMore
                      ? "rgba(26,35,126,0.05)"
                      : "rgba(26,35,126,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1.5,
                    color: "primary.main",
                  }}
                >
                  {cat.icon}
                </Box>

                {/* NAME */}
                <Typography
                  fontWeight="700"
                  fontSize="0.85rem"
                  color="text.primary"
                  mb={0.5}
                >
                  {cat.name}
                </Typography>

                {/* COUNT */}
                <Typography variant="caption" color="text.secondary">
                  {cat.items}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default CategorySection;