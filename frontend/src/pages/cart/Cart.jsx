import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Button } from "@mui/material";
import { removeFromCart } from "@/features/cart/cartSlice";
import { createOrdersFromCart } from "@/features/order/orderSlice";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    dispatch(
      createOrdersFromCart({
        items,
        meetType: "campus", // or protected
      })
    );
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Cart</Typography>

      {items.map((item) => (
        <div key={item._id}>
          <Typography>{item.title}</Typography>
          <Typography>₹ {item.price}</Typography>
          <Typography>Qty: {item.qty}</Typography>

          <Button onClick={() => dispatch(removeFromCart(item._id))}>
            Remove
          </Button>
        </div>
      ))}

      <Typography variant="h5">Total: ₹ {total}</Typography>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleCheckout}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default Cart;