import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Stack,
  Paper,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { deepOrange } from "@mui/material/colors";

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "90vh",
        pt: { xs: "80px", md: "120px" },
        pb: 8,
        bgcolor: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          
          {/* LEFT SIDE */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* TAG */}
              <Box
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: 0.5,
                  borderRadius: "20px",
                  bgcolor: "rgba(0,0,0,0.05)",
                  mb: 2,
                }}
              >
                <Typography variant="caption" fontWeight={600}>
                  🎓 Campus Marketplace
                </Typography>
              </Box>

              {/* HEADING */}
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                Buy, Sell & Trade on
                <br />
                Your Campus
              </Typography>

              {/* SUBTEXT */}
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 4,
                  maxWidth: 500,
                }}
              >
                Connect with students at your college. Find textbooks,
                furniture, electronics, and more. Safe, local, and student-verified.
              </Typography>

              {/* BUTTONS */}
              <Stack direction="row" spacing={2} mb={4}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/join")}
                  sx={{ borderRadius: "8px", px: 3 }}
                >
                  Join Your Campus →
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/products")}
                  sx={{ borderRadius: "8px", px: 3 }}
                >
                  Browse Listings
                </Button>
              </Stack>

              {/* STATS */}
              <Stack direction="row" spacing={6}>
                <Box>
                  <Typography fontWeight={800}>50K+</Typography>
                  <Typography variant="caption">Active Students</Typography>
                </Box>

                <Box>
                  <Typography fontWeight={800}>200+</Typography>
                  <Typography variant="caption">Campuses</Typography>
                </Box>

                <Box>
                  <Typography fontWeight={800}>10K+</Typography>
                  <Typography variant="caption">Daily Listings</Typography>
                </Box>
              </Stack>
            </motion.div>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Box sx={{ position: "relative" }}>
                
                {/* MAIN CARD */}
                <Paper
                  elevation={3}
                  sx={{
                    height: 350,
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ml: 14,
                    width: "100%",
                    bgcolor: "grey.100",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Hero marketplace illustration
                  </Typography>
                </Paper>

                {/* VERIFIED BADGE */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: "20px",
                    boxShadow: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CheckCircleIcon color="success" fontSize="small" />
                  <Typography variant="caption" fontWeight={600}>
                    Verified Student
                  </Typography>
                </Box>

                {/* FLOATING CARD */}
                <Paper
                  elevation={3}
                  sx={{
                    position: "absolute",
                    bottom: -20,
                    left: 20,
                    p: 2,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    
                      <Avatar sx={{bgcolor:deepOrange[500]}}>R</Avatar>
                  </Stack>

                  <Typography variant="body2">
                    <strong>Sarah M.</strong> <br />
                    Just posted: Calculus Textbook
                  </Typography>
                </Paper>
              </Box>
            </motion.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;