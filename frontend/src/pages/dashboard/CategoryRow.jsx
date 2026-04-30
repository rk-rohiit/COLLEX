import { Box, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

const grow = (pct) =>
  keyframes({
    from: { width: "0%" },
    to:   { width: `${pct}%` },
  });

const PALETTE = ["#cc0102", "#1D9E75", "#378ADD", "#EF9F27"];

/**
 * CategoryRow
 * Props:
 *   category   – string  Category name
 *   percentage – number  0–100
 *   index      – number  Used for color assignment
 */
const CategoryRow = ({ category, percentage, index }) => {
  const color = PALETTE[index % PALETTE.length];

  return (
    <Box
      sx={{
        px: 1.25,
        py: 1,
        borderRadius: "10px",
        transition: "background 0.12s",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.75}>
        <Stack direction="row" alignItems="center" spacing={0.75}>
          {/* Color dot */}
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: color,
              flexShrink: 0,
            }}
          />
          <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
            {category}
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: "11px",
            fontWeight: 500,
            color: "text.secondary",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {percentage}%
        </Typography>
      </Stack>

      {/* Progress bar */}
      <Box
        sx={{
          height: "4px",
          bgcolor: "action.selected",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            borderRadius: "4px",
            bgcolor: color,
            animation: `${grow(percentage)} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          }}
        />
      </Box>
    </Box>
  );
};

export default CategoryRow;