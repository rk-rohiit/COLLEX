import { Stack, Avatar, Typography, Box, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";

const STATUS = {
  completed: { bg: "#EAF3DE", color: "#3B6D11" },
  pending:   { bg: "#FAEEDA", color: "#854F0B" },
  cancelled: { bg: "#FCEBEB", color: "#A32D2D" },
};

/** Derives a deterministic accent color from the buyer's name. */
const nameToColor = (name = "") => {
  const palette = ["#cc0102", "#1D9E75", "#378ADD", "#EF9F27", "#9B59B6", "#E67E22"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
};

/**
 * OrderRow
 * Props:
 *   order – { buyer: { fullName }, listing: { title }, status }
 */
const OrderRow = ({ order }) => {
  const name     = order?.buyer?.fullName || "Unknown";
  const title    = order?.listing?.title  || "—";
  const status   = order?.status || "pending";
  const chip     = STATUS[status] ?? STATUS.pending;
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const accent   = nameToColor(name);

  return (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="center"
      sx={{
        px: 1.25,
        py: 1,
        borderRadius: "10px",
        transition: "background 0.12s",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Avatar
        sx={{
          width: 34,
          height: 34,
          fontSize: "12px",
          fontWeight: 600,
          bgcolor: alpha(accent, 0.13),
          color: accent,
          flexShrink: 0,
        }}
      >
        {initials}
      </Avatar>

      <Box flex={1} minWidth={0}>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: "11px",
            color: "text.secondary",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
      </Box>

      <Chip
        label={status}
        size="small"
        sx={{
          height: 22,
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.4px",
          textTransform: "capitalize",
          bgcolor: chip.bg,
          color: chip.color,
          border: "none",
          flexShrink: 0,
        }}
      />
    </Stack>
  );
};

export default OrderRow;