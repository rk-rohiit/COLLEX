// components/profile/OrdersTabs.jsx

import { useState } from "react";
import { Paper, Tabs, Tab, Box, Typography } from "@mui/material";
import OrderRow from "./OrderRow";
import EmptyState from "./EmptyState";

const OrdersTabs = ({ myOrders = [], receivedOrders = [], onSelectOrder, selectedOrder }) => {
  const [tab, setTab] = useState(0);

  const data = tab === 0 ? myOrders : receivedOrders;

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
      {/* Tab header */}
      <Box
        sx={{
          px: 1.5,
          pt: 1.25,
          pb: 0,
          borderBottom: "0.5px solid",
          borderColor: "divider",
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            minHeight: 36,
            "& .MuiTabs-indicator": {
              height: "2px",
              bgcolor: "#1D9E75",
              borderRadius: "2px 2px 0 0",
            },
            "& .MuiTab-root": {
              minHeight: 36,
              py: 0,
              px: 1,
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              color: "text.secondary",
              "&.Mui-selected": { color: "#1D9E75" },
            },
          }}
        >
          <Tab label="My purchases" />
          <Tab label="Sales" />
        </Tabs>
      </Box>

      {/* List */}
      <Box>
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
          <EmptyState
            message={
              tab === 0
                ? "No purchases yet"
                : "No sales yet"
            }
            sub={
              tab === 0
                ? "Items you buy will appear here"
                : "Orders from your listings will appear here"
            }
          />
        )}
      </Box>
    </Paper>
  );
};

export default OrdersTabs;