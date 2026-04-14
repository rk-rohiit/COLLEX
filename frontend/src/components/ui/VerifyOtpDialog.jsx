import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { verifyOtpAPI, resendOtpAPI } from "../../api/auth.api";
import { toast } from "react-toastify";

const VerifyOtpDialog = ({ open, onClose, email, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (!otp) return toast.error("Enter OTP");

    try {
      setLoading(true);

      const res = await verifyOtpAPI({ email, otp });

      const { token, user } = res.data;

      toast.success("Account verified successfully 🎉");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setOtp(""); // 🔥 reset

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);

      await resendOtpAPI({ email });

      toast.success("OTP resent");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle textAlign="center">Verify OTP</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography variant="body2" textAlign="center">
            Enter OTP sent to {email}
          </Typography>

          <TextField
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>

          <Button
            variant="text"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? "Sending..." : "Resend OTP"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyOtpDialog;