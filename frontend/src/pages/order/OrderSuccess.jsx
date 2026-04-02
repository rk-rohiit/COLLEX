import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent } from "@mui/material";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orders = location.state?.orders || [];

  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      <Card sx={{ p: 4 }}>
        <CardContent>
          <Typography variant="h4" color="green" gutterBottom>
            🎉 Order Placed Successfully!
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Your order has been placed successfully.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Total Orders: {orders.length}
          </Typography>

          {orders.map((order, index) => (
            <Typography key={index} sx={{ mt: 1 }}>
              Order ID: {order._id}
            </Typography>
          ))}

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderSuccess;