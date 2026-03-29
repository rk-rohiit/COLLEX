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
import { useTheme } from "@mui/material/styles";

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
    <Container id="about" sx={{ py: 12 }}>
      <Grid container spacing={6} alignItems="center">
        {/* LEFT CONTENT */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
            >
              What is{" "}
              <span
                style={{
                  background: gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Collex?
              </span>
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Collex is a smart campus marketplace where students can
              exchange resources, collaborate, and build meaningful
              connections within their college ecosystem.
            </Typography>

            {/* FEATURES LIST */}
            <Grid container spacing={2}>
              {features.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        background: "rgba(255,255,255,0.05)",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography fontWeight="bold">
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

        {/* RIGHT SIDE (GLASS CARD) */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                p: 5,
                borderRadius: 4,
                backdropFilter: "blur(20px)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Why Collex?
              </Typography>

              <Typography color="text.secondary">
                Unlike traditional marketplaces, Collex is designed
                specifically for students — ensuring trust, speed, and
                convenience in every transaction.
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  ✔ Verified student network  
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ✔ Faster buying & selling  
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ✔ Campus-focused ecosystem  
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;