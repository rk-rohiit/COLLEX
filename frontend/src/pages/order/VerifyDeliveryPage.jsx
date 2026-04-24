import { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { verifyDelivery } from "@/features/order/orderSlice";
import { toast } from "react-toastify";

const VerifyDeliveryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    const res = await dispatch(verifyDelivery({ orderId: id, code }));

    if (verifyDelivery.fulfilled.match(res)) {
      toast.success("Delivery completed ✅");
    } else {
      toast.error(res.payload);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={3} alignItems="center">

          <Typography variant="h5" fontWeight="bold">
            Verify Delivery
          </Typography>

          <Typography color="text.secondary">
            Enter the 6-digit code provided by buyer
          </Typography>

          <TextField
            fullWidth
            label="Delivery Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Button variant="contained" fullWidth onClick={handleVerify}>
            Verify
          </Button>

        </Stack>
      </Paper>
    </Container>
  );
};

export default VerifyDeliveryPage;