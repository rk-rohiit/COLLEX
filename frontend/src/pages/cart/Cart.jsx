import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Button } from "@mui/material";
import { removeFromCart } from "@/features/cart/cartSlice";
// import { createOrdersFromCart } from "@/features/order/orderSlice";
import {  
  increaseQty, 
  decreaseQty
} from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const total = items.reduce(
  (acc, item) => acc + Number(item.price) * item.qty,
  0
);

  // const handleCheckout = () => {
  //   dispatch(
  //     createOrdersFromCart({
  //       items,
  //       meetType: "campus", // or protected
  //     })
  //   );
  // };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Cart</Typography>

     {items.map((item) => (
  <div key={item._id} style={{ marginBottom: "20px" }}>
    <Typography>{item.title}</Typography>
    <Typography>₹ {item.price}</Typography>

    <Button onClick={() => dispatch(decreaseQty(item._id))}>-</Button>
    <Typography display="inline" sx={{ mx: 1 }}>
      Qty: {item.qty}
    </Typography>
    <Button onClick={() => dispatch(increaseQty(item._id))}>+</Button>

    <Button onClick={() => dispatch(removeFromCart(item._id))}>
      Remove
    </Button>
  </div>
))}

      <Typography variant="h5">Total: ₹ {total}</Typography>

      <Button
  variant="contained"
  sx={{ mt: 2 }}
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</Button>
    </Container>
  );
};

export default Cart;