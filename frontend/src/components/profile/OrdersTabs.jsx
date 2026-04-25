// components/profile/OrdersTabs.jsx

import { useState } from "react";
import { Paper, Tabs, Tab, Box, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import OrderRow from "./OrderRow";
import EmptyState from "./EmptyState";

const OrdersTabs = ({ myOrders = [], receivedOrders = [], onSelectOrder, selectedOrder }) => {
  const [tab, setTab] = useState(0);
  const theme = useTheme();

  const data = tab === 0 ? myOrders : receivedOrders;

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
      {/* Tab header */}
      <Box
        sx={{
          px: 2,
          pt: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: alpha(theme.palette.primary.main, 0.01), // Very subtle tint
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            minHeight: 44,
            "& .MuiTabs-indicator": {
              height: 3,
              bgcolor: theme.palette.primary.main, // Trust Blue
              borderRadius: "3px 3px 0 0",
            },
            "& .MuiTab-root": {
              minHeight: 44,
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "text.secondary",
              transition: "color 0.2s",
              "&:hover": {
                color: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.04),
              },
              "&.Mui-selected": { 
                color: theme.palette.primary.main 
              },
            },
          }}
        >
          <Tab label="My purchases" />
          <Tab label="Sales" />
        </Tabs>
      </Box>

      {/* List Container */}
      <Box 
        sx={{ 
          maxHeight: 500, 
          overflowY: "auto",
          // Custom scrollbar to match the theme
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { 
            bgcolor: alpha(theme.palette.text.disabled, 0.2),
            borderRadius: "10px" 
          }
        }}
      >
        {data.length > 0 ? (
          data.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              onSelect={onSelectOrder}
              isSelected={selectedOrder?._id === order._id}
            />
          ))
        ) : (
          <Box sx={{ py: 6 }}>
            <EmptyState
              message={tab === 0 ? "No purchases yet" : "No sales yet"}
              sub={
                tab === 0
                  ? "Items you buy will appear here."
                  : "Orders from your listings will appear here."
              }
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default OrdersTabs;