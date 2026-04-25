// components/profile/ProfileStats.jsx
import { Box, Paper, Typography, Avatar, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

// IMPORTANT: Missing Icon Imports
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

const StatCard = ({ label, value, icon, paletteKey }) => {
  const theme = useTheme();
  
  // Fallback to primary if the paletteKey doesn't exist
  const brandColor = theme.palette[paletteKey]?.main || theme.palette.primary.main;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: `${theme.shape.borderRadius}px`,
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-2px)" }
      }}
    >
      <Avatar
        sx={{
          width: 32, 
          height: 32, 
          mb: 1.5, 
          borderRadius: 1.5,
          bgcolor: alpha(brandColor, 0.1),
          color: brandColor,
        }}
      >
        {icon}
      </Avatar>
      <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1 }}>
        {value}
      </Typography>
      <Typography 
        variant="caption" 
        sx={{ 
          fontWeight: 700, 
          color: "text.secondary", 
          textTransform: "uppercase", 
          mt: 0.5, 
          display: "block" 
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
};

const ProfileStats = ({ myOrders = [], receivedOrders = [] }) => {
  const values = {
    bought: myOrders.length,
    completed: receivedOrders.filter((o) => o.status === "completed").length,
    pending: receivedOrders.filter((o) => o.status === "pending").length,
  };

  const STATS = [
    { 
      label: "Purchased", 
      key: "bought", 
      paletteKey: "primary", 
      icon: <ShoppingBagOutlinedIcon fontSize="small" /> 
    },
    { 
      label: "Sales", 
      key: "completed", 
      paletteKey: "success", 
      icon: <TrendingUpIcon fontSize="small" /> 
    },
    { 
      label: "Active", 
      key: "pending", 
      paletteKey: "secondary", 
      icon: <ReceiptLongOutlinedIcon fontSize="small" /> 
    },
  ];

  return (
    <Box 
      display="grid" 
      gridTemplateColumns="repeat(3, 1fr)" 
      gap={2} 
      mb={2}
    >
      {STATS.map((s) => (
        <StatCard 
          key={s.key} 
          label={s.label} 
          value={values[s.key]} 
          icon={s.icon} 
          paletteKey={s.paletteKey} 
        />
      ))}
    </Box>
  );
};

export default ProfileStats;