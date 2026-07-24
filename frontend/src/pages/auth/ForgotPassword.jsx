import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  Collapse,
  CircularProgress,
  Stack,
  alpha,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPasswordAPI, resetPasswordAPI } from "@/api/auth.api";
import { toast } from "react-toastify";

const FEATURES = [
  {
    icon: <VerifiedUserOutlinedIcon fontSize="small" />,
    title: "Secure Verification",
    sub: "One-Time Passcode sent to your registered email",
  },
  {
    icon: <ShieldOutlinedIcon fontSize="small" />,
    title: "Identity Protection",
    sub: "We keep your account credentials safe and encrypted",
  },
  {
    icon: <LockResetOutlinedIcon fontSize="small" />,
    title: "Quick Recovery",
    sub: "Reset password instantly and get back to the campus loop",
  },
];

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Form State
  const [step, setStep] = useState(1); // 1: Email request, 2: OTP & Reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Cooldown timer for resending OTP
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let interval = null;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  // Brand Palette
  const colors = {
    primary: "#0A2647", // Deep Blue
    accent: "#E86A33",  // Orange Action
    bg: "#F4F7F9",
  };

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) return setErrorMsg("Email is required");

    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await forgotPasswordAPI({ email: email.trim().toLowerCase() });
      toast.success(res.data?.message || "OTP sent successfully 🎉");
      setSuccessMsg("Verification OTP sent. Please check your inbox.");
      setStep(2);
      setCooldown(30); // 30 seconds cooldown
    } catch (err) {
      console.error("Forgot password error:", err);
      const errorText = err.response?.data?.message || "Failed to send OTP. Make sure the email is registered.";
      setErrorMsg(errorText);
      toast.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!otp) return setErrorMsg("OTP is required");
    if (!newPassword) return setErrorMsg("New password is required");
    if (newPassword !== confirmPassword) {
      return setErrorMsg("Passwords do not match");
    }

    // Password Complexity Validation
    if (newPassword.length < 8) {
      return setErrorMsg("Password must be at least 8 characters");
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return setErrorMsg("Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number");
    }

    setLoading(true);

    try {
      const res = await resetPasswordAPI({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword,
      });

      toast.success(res.data?.message || "Password reset successful 🎉");
      setSuccessMsg("Password reset successful! Redirecting to login page...");
      setErrorMsg("");

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Reset password error:", err);
      const errorText = err.response?.data?.message || "Invalid or expired OTP. Please try again.";
      setErrorMsg(errorText);
      toast.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP inside Step 2
  const handleResendOtp = async () => {
    if (cooldown > 0) return;
    setErrorMsg("");
    setResending(true);

    try {
      const res = await forgotPasswordAPI({ email: email.trim().toLowerCase() });
      toast.success(res.data?.message || "OTP resent successfully 🎉");
      setCooldown(30); // reset cooldown
    } catch (err) {
      console.error("Resend OTP error:", err);
      const errorText = err.response?.data?.message || "Failed to resend OTP.";
      setErrorMsg(errorText);
      toast.error(errorText);
    } finally {
      setResending(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: colors.bg,
        p: { xs: 0, md: 2 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "45% 55%" },
          width: "100%",
          maxWidth: 960,
          minHeight: 600,
          bgcolor: "white",
          borderRadius: { xs: 0, md: 5 },
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(10, 38, 71, 0.1)",
        }}
      >
        {/* ── LEFT PANEL: BRANDING & FEATURES ── */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${colors.primary}, ${alpha(colors.primary, 0.9)})`,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
            p: 6,
            color: "white",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="900"
            sx={{ letterSpacing: "-1px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Collex
          </Typography>

          <Box>
            <Typography variant="h3" fontWeight="900" sx={{ mb: 2, lineHeight: 1.1 }}>
              Secure Your <br />
              <Box component="span" sx={{ color: colors.accent }}>Account Loop.</Box>
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, maxWidth: 300 }}>
              Quickly recover your login credentials with email OTP verification.
            </Typography>

            <Stack spacing={2}>
              {FEATURES.map((f) => (
                <Stack key={f.title} direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {f.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight="700">{f.title}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>{f.sub}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Typography variant="caption" sx={{ opacity: 0.5 }}>
            🔒 Secured Student Environment
          </Typography>
        </Box>

        {/* ── RIGHT PANEL: FORM ── */}
        <Box
          sx={{
            p: { xs: 4, sm: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight="900" color={colors.primary} gutterBottom>
              {step === 1 ? "Forgot Password" : "Reset Password"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {step === 1
                ? "Enter your registered university email to receive a recovery code"
                : "Create a strong new password for your account"}
            </Typography>
          </Box>

          <Collapse in={Boolean(successMsg)}>
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{successMsg}</Alert>
          </Collapse>

          <Collapse in={Boolean(errorMsg)}>
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{errorMsg}</Alert>
          </Collapse>

          {step === 1 ? (
            // STEP 1 FORM
            <Box component="form" onSubmit={handleRequestOtp} noValidate>
              <Stack spacing={2.5}>
                <TextField
                  required
                  name="email"
                  label="University Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg("");
                  }}
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 2.5 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    bgcolor: colors.accent,
                    borderRadius: 3,
                    py: 1.6,
                    fontWeight: "900",
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: `0 8px 20px ${alpha(colors.accent, 0.3)}`,
                    "&:hover": { bgcolor: "#d15b28", boxShadow: "none" },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
                </Button>

                <Button
                  component={Link}
                  to="/login"
                  variant="text"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    color: colors.primary,
                    fontWeight: "700",
                    textTransform: "none",
                    alignSelf: "center",
                    mt: 1,
                  }}
                >
                  Back to Sign In
                </Button>
              </Stack>
            </Box>
          ) : (
            // STEP 2 FORM
            <Box component="form" onSubmit={handleResetPassword} noValidate>
              <Stack spacing={2.5}>
                <TextField
                  disabled
                  name="email"
                  label="Email Address"
                  value={email}
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 2.5 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  required
                  name="otp"
                  label="One-Time Passcode"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setErrorMsg("");
                  }}
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 2.5 },
                  }}
                />

                <TextField
                  required
                  name="newPassword"
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setErrorMsg("");
                  }}
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 2.5 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  required
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMsg("");
                  }}
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 2.5 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    bgcolor: colors.accent,
                    borderRadius: 3,
                    py: 1.6,
                    fontWeight: "900",
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: `0 8px 20px ${alpha(colors.accent, 0.3)}`,
                    "&:hover": { bgcolor: "#d15b28", boxShadow: "none" },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
                </Button>

                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                  <Button
                    onClick={() => {
                      setStep(1);
                      setSuccessMsg("");
                      setErrorMsg("");
                    }}
                    variant="text"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      color: colors.primary,
                      fontWeight: "700",
                      textTransform: "none",
                    }}
                  >
                    Change Email
                  </Button>

                  <Button
                    onClick={handleResendOtp}
                    disabled={cooldown > 0 || resending}
                    variant="text"
                    sx={{
                      color: colors.primary,
                      fontWeight: "700",
                      textTransform: "none",
                    }}
                  >
                    {resending
                      ? "Sending..."
                      : cooldown > 0
                      ? `Resend OTP (${cooldown}s)`
                      : "Resend OTP"}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
