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
import { useTheme } from "@mui/material/styles";
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
      id="home"
      sx={{
        minHeight: "100vh",
        pt: "80px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* 🔥 Animated Gradient Background */}
      <Box
        component={motion.div}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity }}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -3,
          background: `linear-gradient(270deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, #000)`,
          backgroundSize: "400% 400%",
          opacity: 0.15,
        }}
      />

      {/* 🔥 Radial Glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -2,
          background: `radial-gradient(circle at 20% 30%, ${theme.palette.primary.main}30, transparent 40%),
                       radial-gradient(circle at 80% 70%, ${theme.palette.secondary.main}30, transparent 40%)`,
        }}
      />

      {/* 🔥 Floating Blobs */}
      {[1, 2, 3].map((i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
          transition={{ duration: 8 + i, repeat: Infinity }}
          sx={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            filter: "blur(120px)",
            opacity: 0.2,
            background:
              i % 2 === 0
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            top: i === 1 ? "10%" : i === 2 ? "60%" : "30%",
            left: i === 1 ? "10%" : i === 2 ? "70%" : "40%",
          }}
        />
      ))}

      {/* CONTENT */}
      <Container>
        <Grid container spacing={6} alignItems="center">
          {/* LEFT */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <Chip
                label="🚀 Now Live at LPU"
                sx={{
                  mb: 2,
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.08)",
                  color: theme.palette.primary.main,
                }}
              />

              {/* Floating Badge
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Chip
                  label="🔥 Trusted by 2000+ Students"
                  sx={{
                    mb: 3,
                    background: "rgba(255,255,255,0.06)",
                  }}
                />
              </motion.div> */}

              {/* Heading */}
              <Typography
                variant="h1"
                fontWeight="bold"
                sx={{
                  lineHeight: 1.1,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                Smart Campus{" "}
                <span
                  style={{
                    background: gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Marketplace
                </span>
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: 3, mb: 4 }}
              >
                Buy, sell & rent within your college community with trust and ease.
              </Typography>

              {/* Buttons */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: "999px",
                    background: gradient,
                    boxShadow: `0 10px 30px ${theme.palette.primary.main}60`,
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: `0 15px 40px ${theme.palette.primary.main}80`,
                    },
                  }}
                >
                  Start Now →
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<PlayArrowIcon />}
                  sx={{ borderRadius: "999px" }}
                >
                  Watch Demo
                </Button>
              </Box>

              {/* Stats */}
              <Grid container spacing={3} sx={{ mt: 5 }}>
                {stats.map((item, i) => (
                  <Grid item xs={6} sm={3} key={i}>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Typography variant="h5" fontWeight="bold">
                        {item.number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.label}
                      </Typography>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          {/* RIGHT (Glass Card) */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backdropFilter: "blur(20px)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: `
                    0 10px 40px rgba(0,0,0,0.4),
                    inset 0 0 20px rgba(255,255,255,0.05)
                  `,
                }}
              >
                <Typography variant="h6" mb={3}>
                  Popular Categories
                </Typography>

                <Grid container spacing={2}>
                  {categories.map((cat, index) => (
                    <Grid item xs={6} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          textAlign: "center",
                          background: "rgba(255,255,255,0.05)",
                          transition: "0.3s",
                          "&:hover": {
                            transform: "translateY(-8px) scale(1.03)",
                            background: "rgba(255,255,255,0.08)",
                            boxShadow: `0 10px 30px ${theme.palette.primary.main}40`,
                          },
                        }}
                      >
                        {cat.icon}
                        <Typography mt={1}>{cat.name}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;