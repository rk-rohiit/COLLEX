import { Paper, Avatar, Typography, Box, Stack } from "@mui/material";

const StatCard = ({ label, value, icon, iconBg, iconColor, accent }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
        overflow: "hidden", // Ensures the 'accent' bar doesn't bleed out
        display: "flex",
        flexDirection: "column",
        gap: 2,
        transition: "all 0.3s ease-in-out",
        
        // Removed fixed width: let the Collection/Grid handle the width
        width: "100%", 

        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "4px",
          bgcolor: accent || "transparent",
        },

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
          borderColor: accent || "divider",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Avatar 
          variant="rounded" // Rounded squares often look more modern for stats
          sx={{ 
            bgcolor: iconBg, 
            color: iconColor,
            width: 42,
            height: 42,
            borderRadius: 2
          }}
        >
          {icon}
        </Avatar>
      </Stack>

      <Box>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            lineHeight: 1.2,
            letterSpacing: "-0.02em" 
          }}
        >
          {value ?? "—"}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: "text.secondary", 
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontSize: "0.65rem"
          }}
        >
          {label}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatCard;