import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* 🔵 Animated Ring */}
      <Box
        component={motion.div}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        sx={{
          position: "relative",
          width: 70,
          height: 70,
          borderRadius: "50%",
          border: "3px solid #E2E8F0",
          borderTop: "3px solid #1E3A8A",
        }}
      >
        {/* ✨ Inner Glow Pulse */}
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 18,
            height: 18,
            borderRadius: "50%",
            bgcolor: "primary.main",
            boxShadow: "0 0 20px rgba(30,58,138,0.6)",
          }}
        />
      </Box>

      {/* 🧠 Branding */}
      <Typography
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        variant="h5"
        sx={{
          mt: 3,
          fontWeight: 800,
          color: "text.primary",
          letterSpacing: 1.5,
        }}
      >
        Collex
      </Typography>

      {/* ✨ Subtitle */}
      <Typography
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        variant="body2"
        sx={{
          mt: 0.5,
          color: "text.secondary",
          letterSpacing: 1,
        }}
      >
        Campus Marketplace
      </Typography>
    </Box>
  );
};

export default Loader;