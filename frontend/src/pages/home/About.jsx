import {
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SecurityIcon from "@mui/icons-material/Security";

import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";

const About = () => {
  const theme = useTheme();

  const gradient = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const features = [
    {
      icon: <SwapHorizIcon />,
      title: "Exchange Easily",
      desc: "Buy, sell & rent items within your campus.",
    },
    {
      icon: <GroupsIcon />,
      title: "Community Driven",
      desc: "Connect with verified students only.",
    },
    {
      icon: <SchoolIcon />,
      title: "Student Focused",
      desc: "Built specifically for college life.",
    },
    {
      icon: <SecurityIcon />,
      title: "Safe & Secure",
      desc: "Trusted environment with verification.",
    },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          
          {/* LEFT */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Heading */}
              <Typography
                variant="h2"
                sx={{ fontWeight: 800, mb: 2 }}
              >
                What is{" "}
                <Box
                  component="span"
                  sx={{
                    background: gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Collex?
                </Box>
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 5, maxWidth: 450 }}
              >
                Collex is a smart campus marketplace where students can
                exchange resources, collaborate, and build meaningful
                connections.
              </Typography>

              {/* Features */}
              <Grid container spacing={3}>
                {features.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "background.paper",
                        boxShadow: theme.shadows[1],
                        transition: "0.3s",

                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: "primary.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </Box>

                      {/* Text */}
                      <Box>
                        <Typography fontWeight={700}>
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {item.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  p: 5,
                  borderRadius: 4,
                  bgcolor: "background.paper",
                  boxShadow: theme.shadows[3],
                }}
              >
                <Typography variant="h5" fontWeight={700} mb={2}>
                  Why Collex?
                </Typography>

                <Typography color="text.secondary">
                  Unlike traditional marketplaces, Collex is designed
                  specifically for students — ensuring trust, speed, and
                  convenience.
                </Typography>

                <Box sx={{ mt: 3 }}>
                  {[
                    "Verified student network",
                    "Faster buying & selling",
                    "Campus-focused ecosystem",
                  ].map((item, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{ mt: 1 }}
                      color="text.secondary"
                    >
                      ✔ {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default About;