import { Paper, Stack, Typography, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

/**
 * SectionCard
 * Props:
 *   title   – string  Card heading
 *   tag     – string  Small right-side label (e.g. "6 ORDERS")
 *   children – node   Row content
 */
const SectionCard = ({ title, tag, children }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "14px",
        border: "0.5px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 2.25,
          py: 1.75,
          borderBottom: "0.5px solid",
          borderColor: "divider",
          bgcolor: alpha(theme.palette.background.default, 0.6),
        }}
      >
        <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
          {title}
        </Typography>
        {tag && (
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              color: "text.secondary",
            }}
          >
            {tag}
          </Typography>
        )}
      </Stack>

      {/* Body */}
      <Box
        sx={{
          flex: 1,
          px: 2,
          py: 1.25,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default SectionCard;