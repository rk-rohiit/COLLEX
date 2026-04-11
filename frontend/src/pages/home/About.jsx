import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
  Paper,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedIcon from "@mui/icons-material/Verified";

import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";

const About = () => {
  const theme = useTheme();

  // Collex Brand Palette
  const colors = {
    primary: "#0A2647", // Deep Blue
    accent: "#E86A33",  // Orange
    verified: "#2ECC71", // Green
    bg: "#F4F7F9"
  };

  const features = [
    {
      icon: <SwapHorizIcon />,
      title: "Campus Exchange",
      desc: "Buy, sell & rent textbooks or dorm gear within your university.",
    },
    {
      icon: <GroupsIcon />,
      title: "Peer-to-Peer",
      desc: "Connect directly with fellow students—no middlemen required.",
    },
    {
      icon: <SecurityIcon />,
      title: "Secure Meetups",
      desc: "Designed for safe hand-to-hand exchanges at campus landmarks.",
    },
    {
      icon: <VerifiedIcon />,
      title: "Student IDs",
      desc: "Every user is verified via their university email address.",
    },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: colors.bg }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          
          {/* LEFT: THE STORY */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="overline"
                sx={{ color: colors.accent, fontWeight: 900, letterSpacing: 2 }}
              >
                THE STUDENT MARKETPLACE
              </Typography>
              
              <Typography
                variant="h2"
                sx={{ 
                  fontWeight: 900, 
                  mb: 2, 
                  color: colors.primary,
                  lineHeight: 1.1 
                }}
              >
                Built for the <br />
                <Box component="span" sx={{ color: colors.accent }}>Campus Life.</Box>
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 5, fontSize: "1.1rem", lineHeight: 1.7 }}
              >
                Collex isn't just another e-commerce site. It's a localized 
                ecosystem built to solve the struggle of finding affordable 
                resources. We turn your campus into a circular economy where 
                one student's "finished" is another's "fresh start."
              </Typography>

              {/* FEATURES GRID */}
              <Grid container spacing={2}>
                {features.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 1.5,
                          bgcolor: alpha(colors.primary, 0.05),
                          color: colors.primary,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography fontWeight="bold" sx={{ color: colors.primary }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.desc}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          {/* RIGHT: THE TRUST CARD */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  borderRadius: 6,
                  bgcolor: "white",
                  boxShadow: "0 25px 50px rgba(10, 38, 71, 0.08)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Visual Watermark */}
                <Box sx={{ 
                  position: 'absolute', top: -20, right: -20, 
                  fontSize: '150px', opacity: 0.03, pointerEvents: 'none' 
                }}>
                  🎓
                </Box>

                <Typography variant="h5" fontWeight="900" mb={3} color={colors.primary}>
                  Why trust Collex?
                </Typography>

                <Stack spacing={3}>
                  {[
                    { 
                      t: "Closed Network", 
                      d: "Only students with verified university IDs can list or buy items." 
                    },
                    { 
                      t: "Zero Shipping Fees", 
                      d: "All transactions happen hand-to-hand on campus grounds." 
                    },
                    { 
                      t: "Real Conversations", 
                      d: "Direct chat between students to coordinate meeting points." 
                    },
                  ].map((item, i) => (
                    <Stack key={i} direction="row" spacing={2}>
                      <Box sx={{ color: colors.verified, mt: 0.5 }}>
                        <SecurityIcon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold" color={colors.primary}>
                          {item.t}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.d}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>

                <Box 
                  sx={{ 
                    mt: 4, p: 2, 
                    borderRadius: 3, 
                    bgcolor: alpha(colors.verified, 0.08),
                    border: `1px dashed ${colors.verified}`
                  }}
                >
                  <Typography variant="caption" sx={{ color: colors.verified, fontWeight: "bold" }}>
                    🔒 YOUR CAMPUS SECURITY IS OUR PRIORITY.
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

export default About;