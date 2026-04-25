import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
  TextField,
} from "@mui/material";
import { verifyDelivery } from "@/features/order/orderSlice";
import { toast } from "react-toastify";

const DeliveryPanel = ({ order }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { verifyLoading } = useSelector((state) => state.order);

  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");

  // 👉 Empty state
  if (!order) {
    return (
      <Paper sx={{ p: 3, borderRadius: 3, textAlign: "center", height: "100%" }}>
        <Typography variant="h6" fontWeight="bold">
          Select an Order
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Click on an order to view delivery details
        </Typography>
      </Paper>
    );
  }

  const isSeller = user?._id === (order.seller?._id || order.seller);

  const handleVerify = async () => {
    if (!code) return toast.error("Enter delivery code");

    const res = await dispatch(
      verifyDelivery({ orderId: order._id, code })
    );

    if (verifyDelivery.fulfilled.match(res)) {
      toast.success("Delivery completed ✅");
    } else {
      toast.error(res.payload);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      {/* 🔹 HEADER */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Delivery Details
      </Typography>

      {/* 🔹 ORDER INFO */}
      <Stack spacing={1}>
        <Typography variant="body2">
          <strong>Order ID:</strong> #{order._id.slice(-6).toUpperCase()}
        </Typography>

        <Typography variant="body2">
          <strong>Item:</strong> {order.listing?.title}
        </Typography>

        <Typography variant="body2">
          <strong>Price:</strong> ₹{order.listing?.price}
        </Typography>

        <Typography variant="body2">
          <strong>Status:</strong> {order.status}
        </Typography>
      </Stack>

      {/* 🔻 DELIVERY SECTION */}
      <Box mt={3}>
        <Typography fontWeight="bold">Delivery</Typography>

        {/* ✅ COMPLETED */}
        {order.isDelivered && (
          <Typography color="success.main" mt={1}>
            Product delivered successfully
          </Typography>
        )}

        {/* 👤 BUYER VIEW */}
        {!order.isDelivered && !isSeller && (
          <Stack spacing={1} mt={1}>
            {!showCode && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setShowCode(true)}
              >
                Show Code
              </Button>
            )}

            {showCode && order.deliveryCode && (
              <>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={order.deliveryCode}
                    color="success"
                    sx={{ fontWeight: "bold", letterSpacing: 2 }}
                  />

                  <Chip
                    label="Copy"
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      navigator.clipboard.writeText(order.deliveryCode)
                    }
                  />
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  Share this code with seller
                </Typography>
              </>
            )}

            {showCode && !order.deliveryCode && (
              <Typography variant="caption" color="error">
                Delivery code not available
              </Typography>
            )}
          </Stack>
        )}

        {/* 🧑‍💼 SELLER VIEW */}
        {!order.isDelivered && isSeller && (
          <Stack spacing={1} mt={1}>
            <Typography variant="caption" color="text.secondary">
              Enter code from buyer to complete delivery
            </Typography>

            <TextField
              size="small"
              label="Enter Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              fullWidth
            />

            <Button
              variant="contained"
              size="small"
              onClick={handleVerify}
              disabled={verifyLoading}
            >
              {verifyLoading ? "Verifying..." : "Verify"}
            </Button>
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

export default DeliveryPanel;