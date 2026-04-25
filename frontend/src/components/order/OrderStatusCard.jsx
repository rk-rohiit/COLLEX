// components/order/OrderStatusCard.jsx

import { Paper, Box, Stack, Typography, Chip } from "@mui/material";

const STEPS = ["Placed", "Payment", "Pickup", "Done"];

const getActiveStep = (status) => {
  if (status === "completed") return 3;
  if (status === "cancelled") return 0;
  return 2;
};

const STATUS_CHIP = {
  completed: { bgcolor: "#EAF3DE", color: "#3B6D11" },
  cancelled:  { bgcolor: "#FCEBEB", color: "#A32D2D" },
  pending:    { bgcolor: "#FAEEDA", color: "#854F0B" },
};

/* ─── Dot ────────────────────────────────────────────────────── */
const Dot = ({ state }) => {
  const isDone   = state === "done";
  const isActive = state === "active";

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
        bgcolor: isDone ? "primary.main" : isActive ? "#EF9F27" : "background.paper",
        border: isDone
          ? "none"
          : isActive
          ? "3px solid #FAEEDA"
          : "1.5px solid",
        borderColor: isDone || isActive ? "transparent" : "divider",
        boxShadow: isActive ? "0 0 0 1.5px #EF9F27" : "none",
        transition: "background 0.2s",
        zIndex: 1,
      }}
    >
      {isDone && (
        <Box component="svg" viewBox="0 0 12 12" sx={{ width: 12, height: 12 }}>
          <polyline
            points="2,6 5,9 10,3"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Box>
      )}
      {isActive && (
        <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: "white" }} />
      )}
    </Box>
  );
};

/* ─── Connector line ─────────────────────────────────────────── */
const Line = ({ done }) => (
  <Box
    sx={{
      flex: 1,
      height: "1.5px",
      bgcolor: done ? "primary.main" : "divider",
      alignSelf: "center",
      mb: "20px",           // nudge up to align with dot centre
      mx: { xs: 0.5, sm: 1 },
    }}
  />
);

/* ─── Full card ──────────────────────────────────────────────── */
const OrderStatusCard = ({ order, isSeller }) => {
  const activeStep = getActiveStep(order?.status);
  const chipStyle  = STATUS_CHIP[order?.status] || STATUS_CHIP.pending;

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: 3,
        border: "0.5px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
        position: "relative",
        // left accent bar
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: "4px",
          background: "linear-gradient(180deg, #0A2647 0%, #1E3A8A 100%)",
          borderRadius: "3px 0 0 3px",
        },
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          pl: { xs: 3, md: 3.5 },
          pr: { xs: 2, md: 2.5 },
          py: 1.75,
          borderBottom: "0.5px solid",
          borderColor: "divider",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "10px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "text.secondary",
              letterSpacing: "0.5px",
            }}
          >
            ORDER · #{order?._id?.slice(-6)?.toUpperCase() || "N/A"}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "text.primary",
              letterSpacing: "-0.3px",
              mt: 0.25,
            }}
          >
            {isSeller ? "Sales tracker" : "Order status"}
          </Typography>
        </Box>

        <Chip
          label={order?.status || "pending"}
          size="small"
          sx={{
            height: 22,
            fontSize: "11px",
            fontWeight: 500,
            bgcolor: chipStyle.bgcolor,
            color: chipStyle.color,
            border: "none",
            "& .MuiChip-label": { px: 1.5 },
          }}
        />
      </Stack>

      {/* Stepper — dots + explicit connector lines, spaced with px padding */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          // push steps toward centre, don't let them hit edges
          px: { xs: 3, sm: 6, md: 12, lg: 18 },
          pt: 2.25,
          pb: 1,
        }}
      >
        {STEPS.map((label, i) => {
          const state =
            i < activeStep ? "done" : i === activeStep ? "active" : "todo";
          const isDone   = state === "done";
          const isActive = state === "active";

          return (
            <Box
              key={label}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                flex: i < STEPS.length - 1 ? 1 : "none",
              }}
            >
              {/* Step column: dot + label stacked */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.75,
                  // fixed min-width prevents label squeeze
                  minWidth: { xs: 52, sm: 64 },
                }}
              >
                <Dot state={state} />
                <Typography
                  sx={{
                    fontSize: { xs: "9px", sm: "10px" },
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    whiteSpace: "nowrap",
                    color: isDone ? "#3B6D11" : isActive ? "#854F0B" : "text.secondary",
                    mb: 0.5,
                  }}
                >
                  {label}
                </Typography>
              </Box>

              {/* Connector to next step */}
              {i < STEPS.length - 1 && <Line done={i < activeStep} />}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default OrderStatusCard;