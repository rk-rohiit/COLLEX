// components/order/OrderStatusCard.jsx

import { Paper, Box, Stack, Typography, Chip, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

const STEPS = ["Placed", "Payment", "Pickup", "Done"];

const getActiveStep = (status) => {
  if (status === "completed") return 3;
  if (status === "cancelled") return 0;
  return 2;
};

/* ─── Dot ────────────────────────────────────────────────────── */
const Dot = ({ state }) => {
  const theme = useTheme();
  const isDone = state === "done";
  const isActive = state === "active";

  // Using Action Orange for active, Trust Blue for done
  const activeColor = theme.palette.secondary.main;
  const doneColor = theme.palette.primary.main;

  return (
    <Box
      sx={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: isDone ? doneColor : isActive ? activeColor : "background.paper",
        border: isDone
          ? "none"
          : isActive
          ? `3px solid ${alpha(activeColor, 0.2)}`
          : "1.5px solid",
        borderColor: isDone || isActive ? "transparent" : "divider",
        boxShadow: isActive ? `0 0 0 1.5px ${activeColor}` : "none",
        transition: "all 0.2s ease",
        zIndex: 1,
      }}
    >
      {isDone && (
        <Box component="svg" viewBox="0 0 12 12" sx={{ width: 12, height: 12 }}>
          <polyline
            points="2,6 5,9 10,3"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Box>
      )}
      {isActive && (
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "white" }} />
      )}
    </Box>
  );
};

/* ─── Connector line ─────────────────────────────────────────── */
const Line = ({ done }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        flex: 1,
        height: "2px",
        bgcolor: done ? theme.palette.primary.main : "divider",
        alignSelf: "center",
        mb: "22px", // Aligned with larger dots
        mx: 0.5,
      }}
    />
  );
};

/* ─── Full card ──────────────────────────────────────────────── */
const OrderStatusCard = ({ order, isSeller }) => {
  const theme = useTheme();
  const activeStep = getActiveStep(order?.status);

  // Status mapping using theme palette
  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return { bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main };
      case "cancelled":
        return { bgcolor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main };
      default:
        return { bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main };
    }
  };

  const statusStyle = getStatusConfig(order?.status);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: `${theme.shape.borderRadius}px`,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: "4px",
          background: `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        },
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          pl: 3.5,
          pr: 2.5,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: alpha(theme.palette.primary.main, 0.01),
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: "text.secondary",
              textTransform: "uppercase",
            }}
          >
            Ref: #{order?._id?.slice(-6)?.toUpperCase() || "000000"}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary", mt: 0.25 }}>
            {isSeller ? "Sales Progression" : "Order Journey"}
          </Typography>
        </Box>

        <Chip
          label={order?.status || "pending"}
          size="small"
          sx={{
            height: 24,
            fontSize: "11px",
            fontWeight: 700,
            bgcolor: statusStyle.bgcolor,
            color: statusStyle.color,
            textTransform: "uppercase",
            "& .MuiChip-label": { px: 1.5 },
          }}
        />
      </Stack>

      {/* Stepper Area */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          px: { xs: 2, sm: 6, md: 8 },
          pt: 3,
          pb: 2,
        }}
      >
        {STEPS.map((label, i) => {
          const state = i < activeStep ? "done" : i === activeStep ? "active" : "todo";
          
          return (
            <Box
              key={label}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                flex: i < STEPS.length - 1 ? 1 : "none",
              }}
            >
              <Stack alignItems="center" spacing={1} sx={{ minWidth: 60 }}>
                <Dot state={state} />
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: state === "done" 
                      ? theme.palette.primary.main 
                      : state === "active" 
                      ? theme.palette.secondary.main 
                      : "text.disabled",
                  }}
                >
                  {label}
                </Typography>
              </Stack>

              {i < STEPS.length - 1 && <Line done={i < activeStep} />}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default OrderStatusCard;