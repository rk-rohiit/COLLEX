import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Chip,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SchoolIcon from "@mui/icons-material/School";
import LaptopIcon from "@mui/icons-material/Laptop";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PeopleIcon from "@mui/icons-material/People";

import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const gradient = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const stats = [
    { number: "2000+", label: "Students" },
    { number: "5000+", label: "Listings" },
    { number: "98%", label: "Satisfaction" },
    { number: "<48hrs", label: "Avg Sale" },
  ];

  const categories = [
    { icon: <SchoolIcon />, name: "Textbooks" },
    { icon: <LaptopIcon />, name: "Electronics" },
    { icon: <DirectionsBikeIcon />, name: "Bikes" },
    { icon: <PeopleIcon />, name: "Room Items" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: "80px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🌈 Gradient Background */}
      <Box
        component={motion.div}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity }}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -2,
          background: `linear-gradient(270deg, 
            ${alpha(theme.palette.primary.main, 0.2)}, 
            ${alpha(theme.palette.secondary.main, 0.2)}, 
            ${alpha(theme.palette.primary.dark, 0.2)}
          )`,
          backgroundSize: "400% 400%",
        }}
      />

      {/* 🌟 Soft Glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background: `
            radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.15)}, transparent 40%),
            radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.15)}, transparent 40%)
          `,
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* LEFT */}
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
              
              {/* Badge */}
              <Chip
                label="🚀 Now Live at LPU"
                sx={{
                  mb: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  fontWeight: 600,
                }}
              />

              {/* Heading */}
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.1,
                }}
              >
                Smart Campus{" "}<br></br>
                <Box
                  component="span"
                  sx={{
                    background: gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Marketplace
                </Box>
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 3, maxWidth: 450 }}
              >
                Buy, sell & rent within your college community with trust and ease.
              </Typography>

              {/* Buttons */}
              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    px: 4,
                    borderRadius: 5,
                  }}
                >
                  Start Now →
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<PlayArrowIcon />}
                  sx={{ borderRadius: 5 }}
                >
                  Demo
                </Button>
              </Box>

              {/* Stats */}
              <Grid container spacing={3} sx={{ mt: 5 }}>
                {stats.map((item, i) => (
                  <Grid item xs={6} sm={3} key={i}>
                    <Typography variant="h5" fontWeight={700}>
                      {item.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="subtitle1" color="text.secondary" mb={2}>
                Hero Image Placeholder
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 300,
                  bgcolor: "grey.300",
                  borderRadius: 2,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;