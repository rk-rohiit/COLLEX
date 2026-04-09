import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Chip,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const gradient = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: "100px",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      {/* 🔥 SOFT BACKGROUND GLOW */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background: `
            radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.08)}, transparent 40%),
            radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.08)}, transparent 40%)
          `,
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">

          {/* 🔥 LEFT */}
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>

              <Chip
                label="🚀 Trusted by 2000+ Students"
                sx={{
                  mb: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  fontWeight: 600,
                }}
              />

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.1,
                }}
              >
                Buy & Sell in{" "}
                <Box
                  component="span"
                  sx={{
                    background: gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Campus
                </Box>
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 3, maxWidth: 450 }}
              >
                Discover deals, sell your items, and connect with students —
                all in one smart marketplace.
              </Typography>

              {/* 🔥 CTA */}
              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    px: 4,
                    borderRadius: 999,
                    background: gradient,
                  }}
                >
                  Start Now →
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    borderRadius: 999,
                  }}
                >
                  Watch Demo
                </Button>
              </Box>

              {/* 🔥 STATS */}
              <Box sx={{ display: "flex", gap: 4, mt: 5 }}>
                {["2000+ Students", "5000+ Listings", "98% Satisfaction"].map((item, i) => (
                  <Typography key={i} fontWeight={600} color="text.secondary">
                    {item}
                  </Typography>
                ))}
              </Box>

            </motion.div>
          </Grid>

          {/* 🔥 RIGHT IMAGE */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200"
                alt="Marketplace"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                }}
              />
            </motion.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;