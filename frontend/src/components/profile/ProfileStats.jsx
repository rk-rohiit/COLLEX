// components/profile/ProfileStats.jsx

import { Box, Paper, Typography, Stack, Avatar } from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

const STATS = [
  {
    label: "Purchased",
    icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 15 }} />,
    iconBg: "#E1F5EE",
    iconColor: "#1D9E75",
    key: "bought",
  },
  {
    label: "Completed sales",
    icon: <TrendingUpIcon sx={{ fontSize: 15 }} />,
    iconBg: "#E6F1FB",
    iconColor: "#185FA5",
    key: "completed",
  },
  {
    label: "Active listings",
    icon: <ReceiptLongOutlinedIcon sx={{ fontSize: 15 }} />,
    iconBg: "#FAEEDA",
    iconColor: "#854F0B",
    key: "pending",
  },
];

const StatCard = ({ label, value, icon, iconBg, iconColor }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 1.5, md: 1.75 },
      borderRadius: 3,
      border: "0.5px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
    }}
  >
    <Avatar
      sx={{
        width: 30,
        height: 30,
        bgcolor: iconBg,
        color: iconColor,
        borderRadius: "8px",
        mb: 1.25,
      }}
    >
      {icon}
    </Avatar>

    <Typography
      sx={{
        fontSize: "22px",
        fontWeight: 600,
        color: "text.primary",
        letterSpacing: "-0.5px",
        lineHeight: 1,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {value}
    </Typography>

    <Typography
      sx={{
        fontSize: "10px",
        fontWeight: 600,
        color: "text.secondary",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        mt: 0.5,
      }}
    >
      {label}
    </Typography>
  </Paper>
);

const ProfileStats = ({ myOrders = [], receivedOrders = [] }) => {
  const values = {
    bought: myOrders.length,
    completed: receivedOrders.filter((o) => o.status === "completed").length,
    pending: receivedOrders.filter((o) => o.status === "pending").length,
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      gap={1.25}
      mb={1.5}
    >
      {STATS.map((s) => (
        <StatCard
          key={s.key}
          label={s.label}
          value={values[s.key]}
          icon={s.icon}
          iconBg={s.iconBg}
          iconColor={s.iconColor}
        />
      ))}
    </Box>
  );
};

export default ProfileStats;