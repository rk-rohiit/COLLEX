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
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch, useSelector } from "react-redux";
import { verifyDelivery } from "@/features/order/orderSlice";
import { toast } from "react-toastify";

/* ─── Info banner ────────────────────────────────────────────── */
const InfoBanner = ({ message, paletteKey, icon }) => {
  const theme = useTheme();
  const color = theme.palette[paletteKey].main;
  
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="flex-start"
      sx={{
        bgcolor: alpha(color, 0.1),
        borderRadius: 2,
        px: 2,
        py: 1.5,
        mb: 2,
        border: `1px solid ${alpha(color, 0.1)}`,
      }}
    >
      <Box sx={{ pt: "2px", flexShrink: 0, color: color }}>{icon}</Box>
      <Typography sx={{ fontSize: "12px", color: "text.primary", fontWeight: 500, lineHeight: 1.5 }}>
        {message}
      </Typography>
    </Stack>
  );
};

/* ─── Main component ─────────────────────────────────────────── */
const DeliverySection = ({ order, isSeller }) => {
  const theme = useTheme();
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
        borderRadius: `${theme.shape.borderRadius}px`,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider", bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: 800,
            color: theme.palette.primary.main,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Delivery verification
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* ── Completed state ── */}
        {order?.isDelivered && (
          <Stack alignItems="center" spacing={1.5} py={3}>
            <TaskAltIcon sx={{ fontSize: 48, color: theme.palette.success.main }} />
            <Box textAlign="center">
              <Typography sx={{ fontSize: "16px", fontWeight: 700, color: theme.palette.success.main }}>
                Handover Complete
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "text.secondary", mt: 0.5 }}>
                This order has been verified and closed.
              </Typography>
            </Box>
          </Stack>
        )}

        {/* ── Buyer view — show code ── */}
        {!order?.isDelivered && !isSeller && (
          <>
            <InfoBanner
              paletteKey="primary"
              message="Show this code to the seller at the time of handoff to confirm you've received the item."
              icon={<InfoOutlinedIcon fontSize="small" />}
            />
            <Box
              sx={{
                bgcolor: "background.default",
                border: "1px dashed",
                borderColor: theme.palette.primary.main,
                borderRadius: 3,
                textAlign: "center",
                py: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Your Secret Code
              </Typography>
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: 800,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "10px",
                  color: theme.palette.primary.main,
                  ml: "10px", // Visual centering for letter spacing
                }}
              >
                {order?.deliveryCode || "••••"}
              </Typography>
            </Box>
          </>
        )}

        {/* ── Seller view — enter code ── */}
        {!order?.isDelivered && isSeller && (
          <>
            <InfoBanner
              paletteKey="secondary"
              message="Ask the buyer for their 4-digit code after they inspect the item. Entering it completes the transaction."
              icon={<LockOutlinedIcon fontSize="small" />}
            />
            <TextField
              fullWidth
              placeholder="Enter 4-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              inputProps={{
                maxLength: 4,
                style: {
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "4px",
                  fontSize: "16px",
                  textAlign: "center"
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ fontSize: 18, color: "text.disabled" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.secondary.main,
                    boxShadow: `0 0 0 4px ${alpha(theme.palette.secondary.main, 0.1)}`,
                  },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="secondary" // Action Orange for seller's final action
              onClick={handleVerify}
              disabled={verifyLoading || code.length < 4}
              sx={{
                py: 1.25,
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              {verifyLoading ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "Confirm & Complete Order"
              )}
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default DeliverySection;