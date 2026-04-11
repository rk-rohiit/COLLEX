import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Stack,
  Paper,
  Avatar,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { deepOrange } from "@mui/material/colors";

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "90vh",
        pt: { xs: "80px", md: "120px" },
        pb: { xs: 10, md: 8 },
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">

          {/* ── LEFT ── */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* CHIP */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 2,
                  py: 0.75,
                  borderRadius: "20px",
                  backgroundColor: "rgba(26,35,126,0.07)",
                  mb: 2,
                }}
              >
                <SchoolIcon sx={{ fontSize: 14, color: "primary.contrast" }} />
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="secondary.main"
                  sx={{ fontSize: "0.7rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
                >
                  Campus Marketplace
                </Typography>
              </Box>

              {/* HEADING */}
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 2,
                  fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem" },
                }}
              >
                Buy, Sell &amp; Trade
                <br />
                on{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  Your Campus
                </Box>
              </Typography>

              {/* SUBTEXT */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 480, lineHeight: 1.7 }}
              >
                Connect with students at your college. Find textbooks,
                furniture, electronics, and more. Safe, local, and
                student-verified.
              </Typography>

              {/* BUTTONS */}
              <Stack direction="row" spacing={2} mb={5} flexWrap="wrap">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/join")}
                  sx={{
                    borderRadius: "10px",
                    px: 3.5,
                    fontWeight: 700,
                    boxShadow: "0 4px 16px rgba(26,35,126,0.25)",
                  }}
                >
                  Join Your Campus →
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/products")}
                  sx={{
                    borderRadius: "10px",
                    px: 3.5,
                    fontWeight: 700,
                    borderColor: "rgba(26,35,126,0.3)",
                  }}
                >
                  Browse Listings
                </Button>
              </Stack>

              {/* STATS */}
              <Stack direction="row" spacing={5}>
                {[
                  { value: "50K+", label: "Active Students" },
                  { value: "200+", label: "Campuses" },
                  { value: "10K+", label: "Daily Listings" },
                ].map((stat) => (
                  <Box key={stat.label}>
                    <Typography fontWeight={800} fontSize="1.2rem">
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* ── RIGHT ── */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Box sx={{ position: "relative", mt: { xs: 4, md: 0 } }}>

                {/* TRENDING BADGE — top left */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 14,
                    left: -14,
                    zIndex: 2,
                    bgcolor: "primary.main",
                    color: "#fff",
                    px: 1.5,
                    py: 0.6,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    boxShadow: "0 2px 12px rgba(26,35,126,0.3)",
                  }}
                >
                  <LocalFireDepartmentIcon sx={{ fontSize: 14 }} />
                  <Typography variant="caption" fontWeight={700} fontSize="0.72rem">
                    1,240 new today
                  </Typography>
                </Box>

                {/* MAIN IMAGE */}
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 260, md: 360 },
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "0.5px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
                    alt="Campus marketplace"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>

                {/* VERIFIED BADGE — top right */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    bgcolor: "background.paper",
                    px: 1.5,
                    py: 0.6,
                    borderRadius: "20px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                  }}
                >
                  <CheckCircleIcon color="success" sx={{ fontSize: 15 }} />
                  <Typography variant="caption" fontWeight={700} fontSize="0.72rem">
                    Verified Student
                  </Typography>
                </Box>

                {/* FLOATING LISTING CARD — bottom */}
                <Paper
                  elevation={0}
                  sx={{
                    position: "absolute",
                    bottom: -20,
                    left: 0,
                    p: 1.5,
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                    border: "0.5px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    minWidth: 210,
                  }}
                >
                  <Avatar sx={{ bgcolor: deepOrange[500], width: 36, height: 36, fontSize: "0.9rem" }}>
                    S
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={700} lineHeight={1.3}>
                      Sarah M.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Just posted: Calculus Textbook
                    </Typography>
                  </Box>
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