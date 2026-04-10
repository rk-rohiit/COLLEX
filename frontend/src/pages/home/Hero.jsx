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
import { useTheme, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Color Constants from Prototype
  const colors = {
    primary: "#0A2647", // Deep Blue
    accent: "#E86A33",  // Orange
    verified: "#2ECC71", // Green
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        pt: { xs: "80px", md: "120px" },
        pb: 8,
        bgcolor: "#F4F7F9", // Lighter background for clarity
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          
          {/* LEFT CONTENT: HEADLINES & CTAs */}
          <Grid item xs={12} md={7}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  color: colors.primary,
                  lineHeight: 1.1,
                  mb: 2,
                }}
              >
                Your Campus, <br />
                <Box component="span" sx={{ color: colors.accent }}>
                  Your Marketplace.
                </Box>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: colors.primary,
                  mb: 2,
                  opacity: 0.9
                }}
              >
                Connect, Buy, and Sell with fellow students instantly.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 4,
                  maxWidth: 500,
                  fontSize: "1.1rem"
                }}
              >
                Find affordable textbooks, dorm goods, tech, and more. 
                Trust verified listings within your university.
              </Typography>

              {/* ACTION BUTTONS */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/explore")}
                  sx={{
                    bgcolor: colors.accent,
                    px: 4,
                    py: 1.5,
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    "&:hover": { bgcolor: "#d15b28" }
                  }}
                >
                  START EXPLORING
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/list-item")}
                  sx={{
                    bgcolor: colors.primary,
                    px: 4,
                    py: 1.5,
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    "&:hover": { bgcolor: "#06172a" }
                  }}
                >
                  LIST AN ITEM NOW
                </Button>
              </Stack>

              <Typography variant="caption" sx={{ mt: 2, display: "block", color: "text.secondary" }}>
                *Verified students only. Secure campus exchanges.
              </Typography>
            </motion.div>
          </Grid>

          {/* RIGHT CONTENT: GRAPHICAL WIDGET */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Paper
                elevation={10}
                sx={{
                  p: 3,
                  borderRadius: "24px",
                  background: "white",
                  position: "relative",
                  boxShadow: "0 30px 60px rgba(10, 38, 71, 0.15)"
                }}
              >
                <Typography variant="h6" fontWeight="800" color={colors.primary} gutterBottom>
                  Trending in Chandigarh University
                </Typography>

                {/* MOCK PRODUCT LISTING 1 */}
                <Stack direction="row" spacing={2} sx={{ mb: 2, p: 1.5, bgcolor: "#F8F9FA", borderRadius: "12px" }}>
                  <Box 
                    component="img" 
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200" 
                    sx={{ width: 60, height: 60, borderRadius: "8px", objectFit: "cover" }}
                  />
                  <Box>
                    <Typography fontWeight="bold" fontSize="0.9rem">Organic Chem Notes</Typography>
                    <Typography variant="body2" fontWeight="900" color={colors.accent}>₹150</Typography>
                    <Typography variant="caption" color="text.secondary">1 month used</Typography>
                  </Box>
                </Stack>

                {/* MOCK PRODUCT LISTING 2 */}
                <Stack direction="row" spacing={2} sx={{ mb: 2, p: 1.5, border: "1px solid #EEE", borderRadius: "12px" }}>
                  <Box 
                    component="img" 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200" 
                    sx={{ width: 60, height: 60, borderRadius: "8px", objectFit: "cover" }}
                  />
                  <Box>
                    <Typography fontWeight="bold" fontSize="0.9rem">Sony Headphones</Typography>
                    <Typography variant="body2" fontWeight="900" color={colors.accent}>₹4200</Typography>
                    <Typography variant="caption" color="text.secondary">Excellent Cond.</Typography>
                  </Box>
                </Stack>

                {/* CAMPUS VERIFICATION TAG */}
                <Box 
                  sx={{ 
                    mt: 2, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    py: 1, 
                    bgcolor: alpha(colors.verified, 0.1), 
                    borderRadius: "8px" 
                  }}
                >
                  <CheckCircleIcon sx={{ color: colors.verified, fontSize: 18, mr: 1 }} />
                  <Typography variant="caption" fontWeight="bold" color={colors.verified}>
                    ONLY VERIFIED STUDENTS
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;