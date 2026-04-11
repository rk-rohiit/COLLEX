import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SecurityIcon from "@mui/icons-material/Security";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";

import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";

const Services = () => {
  const theme = useTheme();

  // Collex Brand Palette
  const colors = {
    primary: "#0A2647", // Deep Blue
    accent: "#E86A33",  // Orange Action
    bg: "#F4F7F9"
  };

  const services = [
    {
      icon: <ShoppingCartIcon sx={{ fontSize: 32 }} />,
      title: "Hyper-Local Market",
      desc: "Find everything from lab coats to dorm furniture, listed by students in your own hostel or block.",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 32 }} />,
      title: "Verified Student Profiles",
      desc: "Every buyer and seller is authenticated via university email, ensuring a 100% trusted community.",
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 32 }} />,
      title: "Zero Shipping Cost",
      desc: "Forget logistics. Coordinate a meeting at the library or canteen and exchange items hand-to-hand.",
    },
    {
      icon: <PaymentsIcon sx={{ fontSize: 32 }} />,
      title: "Transparent Pricing",
      desc: "No hidden fees. Negotiate prices directly through our secure chat and pay via UPI or cash on exchange.",
    },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: "white" }}>
      <Container id="services">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Stack alignItems="center" spacing={1} sx={{ mb: 8 }}>
            <Typography
              variant="overline"
              sx={{ color: colors.accent, fontWeight: 900, letterSpacing: 2 }}
            >
              OUR ECOSYSTEM
            </Typography>
            <Typography
              variant="h3"
              fontWeight="900"
              textAlign="center"
              sx={{ color: colors.primary, maxWidth: 600, lineHeight: 1.2 }}
            >
              The Smartest Way to <br />
              <Box component="span" sx={{ color: colors.accent }}>Buy & Sell on Campus</Box>
            </Typography>
          </Stack>
        </motion.div>

        {/* CARDS */}
        <Grid container spacing={4}>
          {services.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: 5,
                    bgcolor: colors.bg,
                    transition: "0.4s",
                    height: "100%",
                    border: "1px solid transparent",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      bgcolor: "white",
                      borderColor: alpha(colors.accent, 0.2),
                      boxShadow: `0 20px 40px ${alpha(colors.primary, 0.08)}`,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    {/* ICON CIRCLE */}
                    <Box
                      sx={{
                        mb: 3,
                        width: 70,
                        height: 70,
                        mx: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${colors.primary}, ${alpha(colors.primary, 0.8)})`,
                        color: "white",
                        boxShadow: `0 10px 20px ${alpha(colors.primary, 0.2)}`,
                      }}
                    >
                      {item.icon}
                    </Box>

                    {/* TITLE */}
                    <Typography 
                      variant="h6" 
                      fontWeight="800" 
                      gutterBottom 
                      sx={{ color: colors.primary, fontSize: "1.1rem" }}
                    >
                      {item.title}
                    </Typography>

                    {/* DESC */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ lineHeight: 1.6 }}
                    >
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;