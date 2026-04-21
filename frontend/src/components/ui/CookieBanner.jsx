import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptCookies } from "@/features/cookie/cookieSlice";
import { motion } from "framer-motion";

import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
const CookieBanner = () => {
  const dispatch = useDispatch();
  const accepted = useSelector((state) => state.cookies.accepted);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3500); // ⏱️ 3.5 sec delay

    return () => clearTimeout(timer);
  }, []);

  if (accepted || !visible) return null;

  return (
    <Box
      component={motion.div}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      sx={{
        position: "fixed",
        bottom: 16,
        left: { xs: 8, sm: 16, md: 24 },
        right: { xs: 8, sm: 16, md: 24 },
        zIndex: 1300,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2.5,
          borderRadius: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          bgcolor: "background.paper",
          border: "1px solid #416897",
        }}
      >
        {/* Text */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ flex: 1 }}
        >
          By clicking{" "}
          <Box component="span" fontWeight={600} color="text.primary">
            “Accept All Cookies”
          </Box>
          , you agree to storing cookies to enhance navigation, analyze usage,
          and improve your experience.
        </Typography>

        {/* Buttons */}
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" size="small">
            Cookies Settings
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => dispatch(acceptCookies())}
          >
            Accept All
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CookieBanner;