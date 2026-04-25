// components/profile/EmptyState.jsx

import { Box, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

const EmptyState = ({
  message = "Nothing here yet",
  sub = "Items will appear here once there's activity",
}) => (
  <Box
    sx={{
      textAlign: "center",
      py: 5,
      px: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0.75,
    }}
  >
    <InboxOutlinedIcon sx={{ fontSize: 28, color: "text.disabled", mb: 0.5 }} />
    <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "text.primary" }}>
      {message}
    </Typography>
    <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
      {sub}
    </Typography>
  </Box>
);

export default EmptyState;