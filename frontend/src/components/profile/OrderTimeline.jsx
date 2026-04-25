// components/profile/OrderTimeline.jsx

import { Box, Typography, Stack } from "@mui/material";

const STEPS = ["Order placed", "Payment confirmed", "Awaiting pickup", "Completed"];

const getStepState = (index, currentStatus) => {
  const statusIndex = {
    placed: 0,
    paid: 1,
    pickup: 2,
    completed: 3,
  };

  // Map order status to step index
  const activeStep =
    currentStatus === "completed"
      ? 3
      : currentStatus === "pending"
      ? 1
      : currentStatus === "cancelled"
      ? -1
      : 1;

  if (activeStep === -1) return "cancelled";
  if (index < activeStep) return "done";
  if (index === activeStep) return "current";
  return "todo";
};

const DOT_STYLES = {
  done: {
    bgcolor: "#1D9E75",
    border: "none",
  },
  current: {
    bgcolor: "#EF9F27",
    border: "3px solid #FAEEDA",
    boxShadow: "0 0 0 1px #EF9F27",
  },
  todo: {
    bgcolor: "background.default",
    border: "1px solid",
    borderColor: "divider",
  },
  cancelled: {
    bgcolor: "#E24B4A",
    border: "none",
  },
};

const OrderTimeline = ({ status }) => {
  return (
    <Box sx={{ mt: 1.75 }}>
      {STEPS.map((step, i) => {
        const state = getStepState(i, status);
        const dotStyle = DOT_STYLES[state] || DOT_STYLES.todo;
        const isLast = i === STEPS.length - 1;

        return (
          <Box
            key={step}
            sx={{ display: "flex", gap: 1.25, alignItems: "flex-start", pb: isLast ? 0 : 1.5, position: "relative" }}
          >
            {/* Connector line */}
            {!isLast && (
              <Box
                sx={{
                  position: "absolute",
                  left: "6px",
                  top: "14px",
                  width: "1px",
                  height: "calc(100% - 4px)",
                  bgcolor: "divider",
                }}
              />
            )}

            {/* Dot */}
            <Box
              sx={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                flexShrink: 0,
                mt: "2px",
                ...dotStyle,
              }}
            />

            {/* Label */}
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: state === "done" || state === "current" ? 500 : 400,
                color:
                  state === "done" || state === "current"
                    ? "text.primary"
                    : "text.secondary",
              }}
            >
              {step}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default OrderTimeline;