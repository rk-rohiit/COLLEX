import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const Services = () => {
  const theme = useTheme();

  const gradient = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const services = [
    {
      icon: <SwapHorizIcon fontSize="large" />,
      title: "Resource Sharing",
      desc: "Exchange notes, books, and study materials easily within your campus.",
    },
    {
      icon: <GroupsIcon fontSize="large" />,
      title: "Collaboration",
      desc: "Work on projects, connect with peers, and grow together.",
    },
    {
      icon: <StorefrontIcon fontSize="large" />,
      title: "Marketplace",
      desc: "Buy, sell, and rent items safely inside your college ecosystem.",
    },
  ];

  return (
    <Container id="services" sx={{ py: 12 }}>
      {/* HEADING */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          What We{" "}
          <span
            style={{
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Do
          </span>
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Everything you need to buy, sell, and collaborate within your campus.
        </Typography>
      </motion.div>

      {/* CARDS */}
      <Grid container spacing={4}>
        {services.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backdropFilter: "blur(20px)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "0.4s",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow: `0 20px 50px ${theme.palette.primary.main}40`,
                  },
                }}
              >
                <CardContent>
                  {/* ICON */}
                  <Box
                    sx={{
                      mb: 2,
                      width: 60,
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3,
                      background: gradient,
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* TITLE */}
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>

                  {/* DESC */}
                  <Typography color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;