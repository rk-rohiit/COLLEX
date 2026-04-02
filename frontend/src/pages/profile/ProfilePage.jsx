import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Chip,
  Grid, // ✅ FIXED (correct import)
} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyOrders,
  getReceivedOrders,
} from "@/features/order/orderSlice";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const { myOrders, receivedOrders, loading } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(getMyOrders());
    dispatch(getReceivedOrders());
  }, [dispatch]);

  // ✅ Loading state
  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
        
      {/* 👤 USER INFO */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">👤 Profile</Typography>
          <Typography>Name: {user?.fullName || "Not Available"}</Typography>
          <Typography>Email: {user?.email}</Typography>
          <Typography>Campus: {user?.campusId}</Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/add-product")}
          >
            ➕ List Product
          </Button>
        </CardContent>
      </Card>

      {/* 🧭 TABS */}
      <Tabs value={tab} onChange={(e, val) => setTab(val)}>
        <Tab label="My Orders" />
        <Tab label="Received Orders" />
      </Tabs>

      {/* 📦 MY ORDERS */}
      {tab === 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {myOrders?.length === 0 ? (
            <Typography sx={{ mt: 2 }}>No orders yet</Typography>
          ) : (
            myOrders.map((order) => (
              <Grid item xs={12} md={6} key={order._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {order.listing?.title}
                    </Typography>

                    <Chip
                      label={order.status}
                      color={
                        order.status === "pending"
                          ? "warning"
                          : order.status === "completed"
                          ? "success"
                          : "error"
                      }
                      sx={{ mt: 1 }}
                    />

                    <Typography sx={{ mt: 1 }}>
                      Type: {order.type}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* 📥 RECEIVED ORDERS */}
      {tab === 1 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {receivedOrders?.length === 0 ? (
            <Typography sx={{ mt: 2 }}>
              No received orders
            </Typography>
          ) : (
            receivedOrders.map((order) => (
              <Grid item xs={12} md={6} key={order._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {order.listing?.title}
                    </Typography>

                    <Typography>
                      Buyer: {order.buyer?.name}
                    </Typography>

                    <Chip
                      label={order.status}
                      color={
                        order.status === "pending"
                          ? "warning"
                          : order.status === "completed"
                          ? "success"
                          : "error"
                      }
                      sx={{ mt: 1 }}
                    />

                    <Button
                      size="small"
                      variant="contained"
                      sx={{ mt: 2 }}
                    >
                      Mark Completed
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        
      )}
      <p>{console.log("PROFILE USER:", user)}</p>
    </Container>
  );
};

export default ProfilePage;