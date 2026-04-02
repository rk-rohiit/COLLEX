import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import { createOrdersFromCart } from "@/features/order/orderSlice";
import { clearCart } from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    hostel: "",
    room: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0
  );

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

 const handleOrder = async () => {
  if (!address.name || !address.phone || !address.hostel) {
    alert("Please fill all required fields");
    return;
  }

  try {
    const res = await dispatch(
      createOrdersFromCart({
        items,
        meetType: "campus",
      })
    ).unwrap(); // 🔥 VERY IMPORTANT

    dispatch(clearCart());

    // 👉 redirect to success page
    navigate("/order-success", {
      state: { orders: res },
    });

  } catch (error) {
    console.error(error);

    // 🔥 show backend error
    alert(error || "Order failed ❌");
  }
};
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        
        {/* LEFT - ADDRESS */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Delivery Details</Typography>

              <TextField
                fullWidth
                label="Full Name"
                name="name"
                sx={{ mt: 2 }}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                sx={{ mt: 2 }}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Hostel / Block"
                name="hostel"
                sx={{ mt: 2 }}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Room No"
                name="room"
                sx={{ mt: 2 }}
                onChange={handleChange}
              />
            </CardContent>
          </Card>

          {/* PAYMENT */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6">Payment Method</Typography>

              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
                <FormControlLabel
                  value="upi"
                  control={<Radio />}
                  label="UPI"
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT - ORDER SUMMARY */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order Summary</Typography>

              {items.map((item) => (
                <div key={item._id} style={{ marginTop: "10px" }}>
                  <Typography>{item.title}</Typography>
                  <Typography>
                    ₹ {item.price} × {item.qty}
                  </Typography>
                </div>
              ))}

              <Typography variant="h5" sx={{ mt: 2 }}>
                Total: ₹ {total}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleOrder}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

export default CheckoutPage;