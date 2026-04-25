// components/order/DeliverySection.jsx

import { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch, useSelector } from "react-redux";
import { verifyDelivery } from "@/features/order/orderSlice";
import { toast } from "react-toastify";

/* ─── Info banner ────────────────────────────────────────────── */
const InfoBanner = ({ message, color, bg, icon }) => (
  <Stack
    direction="row"
    spacing={1}
    alignItems="flex-start"
    sx={{
      bgcolor: bg,
      borderRadius: 2,
      px: 1.5,
      py: 1,
      mb: 1.75,
    }}
  >
    <Box sx={{ pt: "1px", flexShrink: 0 }}>{icon}</Box>
    <Typography sx={{ fontSize: "11px", color, lineHeight: 1.6 }}>
      {message}
    </Typography>
  </Stack>
);

/* ─── Main component ─────────────────────────────────────────── */
const DeliverySection = ({ order, isSeller }) => {
  const dispatch = useDispatch();
  const { verifyLoading } = useSelector((s) => s.order);
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    if (!code.trim()) {
      toast.error("Please enter the delivery code");
      return;
    }
    const res = await dispatch(verifyDelivery({ orderId: order._id, code }));
    if (verifyDelivery.fulfilled.match(res)) {
      toast.success("Delivery confirmed");
    } else {
      toast.error(res.payload || "Verification failed");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "0.5px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <Box
        sx={{
          px: 1.75,
          py: 1.25,
          borderBottom: "0.5px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: 600,
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: "0.7px",
          }}
        >
          Delivery verification
        </Typography>
      </Box>

      <Box sx={{ p: 1.75 }}>
        {/* ── Completed state ── */}
        {order?.isDelivered && (
          <Stack alignItems="center" spacing={1.25} py={2}>
            <TaskAltIcon sx={{ fontSize: 38, color: "#1D9E75" }} />
            <Typography
              sx={{ fontSize: "14px", fontWeight: 600, color: "#3B6D11" }}
            >
              Product delivered successfully
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
              This order has been completed and closed.
            </Typography>
          </Stack>
        )}

        {/* ── Buyer view — show code ── */}
        {!order?.isDelivered && !isSeller && (
          <>
            <InfoBanner
              bg="#E1F5EE"
              color="#0F6E56"
              message="Show this code to the seller at the time of handoff to confirm delivery."
              icon={
                <InfoOutlinedIcon sx={{ fontSize: 14, color: "#0F6E56" }} />
              }
            />
            <Box
              sx={{
                bgcolor: "background.default",
                border: "0.5px solid",
                borderColor: "divider",
                borderRadius: 2,
                px: 2,
                py: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: "0.7px",
                  mb: 0.75,
                }}
              >
                Your delivery code
              </Typography>
              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "8px",
                  color: "text.primary",
                }}
              >
                {order?.deliveryCode || "— — — —"}
              </Typography>
            </Box>
          </>
        )}

        {/* ── Seller view — enter code ── */}
        {!order?.isDelivered && isSeller && (
          <>
            <InfoBanner
              bg="#FAEEDA"
              color="#854F0B"
              message="Ask the buyer for their 4-digit code. Enter it below to confirm delivery and complete the order."
              icon={
                <LockOutlinedIcon sx={{ fontSize: 14, color: "#854F0B" }} />
              }
            />
            <TextField
              fullWidth
              placeholder="Enter 4-digit delivery code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              inputProps={{
                maxLength: 6,
                style: {
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "3px",
                  fontSize: "15px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon
                      sx={{ fontSize: 16, color: "text.disabled" }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 1.25,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: "13px",
                  "& fieldset": {
                    borderWidth: "0.5px",
                    borderColor: "divider",
                  },
                  "&:hover fieldset": { borderColor: "text.secondary" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1D9E75",
                    borderWidth: "1.5px",
                    boxShadow: "0 0 0 3px #E1F5EE",
                  },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleVerify}
              disabled={verifyLoading || !code.trim()}
              sx={{
                bgcolor: "#1D9E75",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "none",
                py: 1,
                borderRadius: 2,
                boxShadow: "none",
                "&:hover": { bgcolor: "#17876A", boxShadow: "none" },
                "&:disabled": { bgcolor: "action.disabledBackground" },
              }}
            >
              {verifyLoading ? (
                <CircularProgress size={16} sx={{ color: "white" }} />
              ) : (
                "Confirm delivery"
              )}
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default DeliverySection;