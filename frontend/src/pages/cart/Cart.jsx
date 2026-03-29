import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Button } from "@mui/material";
import { removeFromCart } from "@/features/cart/cartSlice";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Cart</Typography>

      {items.map((item) => (
        <div key={item._id}>
          <Typography>{item.title}</Typography>
          <Typography>₹ {item.price}</Typography>
          <Button onClick={() => dispatch(removeFromCart(item._id))}>
            Remove
          </Button>
        </div>
      ))}

      <Typography variant="h5">Total: ₹ {total}</Typography>

      <Button variant="contained" sx={{ mt: 2 }}>
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default Cart;