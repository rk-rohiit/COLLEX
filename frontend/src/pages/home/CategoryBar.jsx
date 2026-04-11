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
  {
    name: "Textbooks",
    icon: <MenuBookIcon fontSize="large" />,
    items: "2,340 items",
  },
  {
    name: "Furniture",
    icon: <ChairIcon fontSize="large" />,
    items: "1,820 items",
  },
  {
    name: "Electronics",
    icon: <LaptopMacIcon fontSize="large" />,
    items: "1,560 items",
  },
  {
    name: "Clothing",
    icon: <CheckroomIcon fontSize="large" />,
    items: "980 items",
  },
  {
    name: "Sports",
    icon: <SportsSoccerIcon fontSize="large" />,
    items: "720 items",
  },
  {
    name: "More",
    icon: <MoreHorizIcon fontSize="large" />,
    items: "View all",
  },
];

const CategorySection = ({ onCategorySelect }) => {
  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        
        {/* HEADING */}
        <Typography
          variant="h4"
          // fontWeight="800"
          align="center"
          gutterBottom
          color="primary.main"
          letterSpacing={0.5}
        >
          Popular Categories
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 5 }}
        >
          Find exactly what you need for campus life
        </Typography>

        {/* GRID */}
        <Grid container spacing={3} justifyContent="center">
          {categories.map((cat) => (
            <Grid item xs={6} sm={4} md={2} key={cat.name}>
              <Paper
                onClick={() => onCategorySelect?.(cat.name)}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  textAlign: "center",
                  cursor: "pointer",
                  padding: 6,
                  border: "1px solid #eee",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* ICON */}
                <Box sx={{ mb: 1, color: "secondary.main",bgcolor:"rgba(0,0,0,0.05)", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto" }}>
                  {cat.icon}
                </Box>

                {/* NAME */}
                <Typography fontWeight="100" fontSize="0.95rem" color="primary.main">
                  {cat.name}
                </Typography>

                {/* ITEMS */}
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