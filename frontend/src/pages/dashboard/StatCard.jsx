import { Paper, Avatar, Typography, Box, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";

/**
 * StatCard
 * Props:
 *   label    – string  KPI label (e.g. "Total Products")
 *   value    – number  KPI value
 *   icon     – node    MUI SvgIcon element
 *   accent   – string  hex color for left bar + icon tint
 *   footer   – string  small footer text (e.g. "+38 this week")
 */
const StatCard = ({ label, value, icon, accent = "#cc0102", footer }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: "18px 20px",
        height: "100%",
        borderRadius: "14px",
        border: "0.5px solid",
        borderColor: "divider",
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
        transition: "transform 0.18s ease, border-color 0.18s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width:"285px",

        // Left accent bar
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: "22%",
          bottom: "22%",
          width: "3px",
          borderRadius: "0 3px 3px 0",
          bgcolor: accent,
        },

        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: alpha(accent, 0.4),
        },
      }}
    >
      {/* Icon */}
      <Avatar
        variant="rounded"
        sx={{
          bgcolor: alpha(accent, 0.1),
          color: accent,
          width: 38,
          height: 38,
          borderRadius: "10px",
          mb: 1.75,
          "& .MuiSvgIcon-root": { fontSize: "1.15rem" },
        }}
      >
        {icon ?? <Box sx={{ width: 20, height: 20 }} />}
      </Avatar>

      {/* Label + Value */}
      <Box>
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: 600,
            color: "text.secondary",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            mb: 0.5,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "-1px",
            lineHeight: 1,
            color: "text.primary",
          }}
        >
          {value ?? "—"}
        </Typography>
      </Box>

      {/* Footer */}
      {footer && (
        <Typography
          sx={{
            fontSize: "11px",
            color: "text.disabled",
            mt: 1.25,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {footer}
        </Typography>
      )}
    </Paper>
  );
};

export default StatCard;