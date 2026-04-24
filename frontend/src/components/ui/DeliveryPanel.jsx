import { useState } from "react";
import { Paper, Typography, Button, Stack, Chip, Box } from "@mui/material";

const DeliveryPanel = ({ order }) => {
  const [showCode, setShowCode] = useState(false);

  // 👉 Empty state
  if (!order) {
    return (
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          textAlign: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Select an Order
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Click on an order to view delivery details
        </Typography>
      </Paper>
    );
  }

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

      {/* 🔻 DELIVERY CODE */}
      <Box mt={3}>
        <Typography fontWeight="bold">Delivery Code</Typography>

        {order.deliveryCode ? (
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

            {showCode && (
              <>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={order.deliveryCode}
                    color="success"
                    sx={{
                      fontWeight: "bold",
                      letterSpacing: 2,
                      fontSize: "0.9rem",
                    }}
                  />

                  <Chip
                    label="Copy"
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      navigator.clipboard.writeText(order.deliveryCode)
                    }
                    sx={{ cursor: "pointer" }}
                  />
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  Share this code with seller during delivery
                </Typography>
              </>
            )}
          </Stack>
        ) : (
          <Typography variant="caption" color="text.secondary">
            Code will be available after payment / before delivery
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default DeliveryPanel;