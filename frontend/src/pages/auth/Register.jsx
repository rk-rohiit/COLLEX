import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Grid,
  Stack,
  alpha
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "@/features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyOtpDialog from "@/components/ui/VerifyOtpDialog";
import { toast } from "react-toastify";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [otpOpen, setOtpOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const colors = {
    primary: "#0A2647",
    accent: "#E86A33",
    verified: "#2ECC71",
  };

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    year: "",
    hostelBlock: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLocalError("");
  };
  const handleRegister = async () => {
    // ✅ Required fields check
    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.course ||
      !form.year ||
      !form.password ||
      !form.confirmPassword
    ) {
      return setLocalError("All required fields must be filled");
    }

    // ✅ Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      return setLocalError("Phone number must be exactly 10 digits");
    }

    // ✅ Password match check
    if (form.password !== form.confirmPassword) {
      return setLocalError("Passwords do not match");
    }

    // ✅ Strong password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(form.password)) {
      return setLocalError(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 special character and be minimum 6 characters"
      );
    }

    // ✅ Prepare payload
    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      course: form.course,
      year: Number(form.year),
      hostelBlock: form.hostelBlock || null,
      password: form.password,
    };

    // ✅ Send OTP
    const res = await dispatch(sendOtp(payload));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP sent to your email");

      setRegisteredEmail(form.email);
      setOtpOpen(true);

      // ✅ Reset form AFTER OTP sent
      setForm({
        fullName: "",
        email: "",
        phone: "",
        course: "",
        year: "",
        hostelBlock: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      toast.error(res.payload || "Registration failed");
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#F4F7F9",
        }}
      >
        <Paper sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" }, // ✅ mobile column
    maxWidth: 1000,
    width: "100%",
    borderRadius: 3,
    overflow: "hidden",
  }}>

          {/* LEFT */}

          <Box 
          sx={{
    position: "relative",
    width: { xs: "100%", md: "45%" },
    height: { xs: 200, sm: 250, md: "auto" }, // ✅ responsive height
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    overflow: "hidden",
  }}
          >
            {/* Hero image */}
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=80"
              alt="campus"
              sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
            />
            {/* Gradient overlay */}
            <Box sx={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to top, ${colors.primary} 30%, ${alpha(colors.primary, 0.5)} 70%, ${alpha(colors.primary, 0.2)} 100%)`,
            }} />
            {/* Content */}
            <Box sx={{ position: "relative", zIndex: 2, color: "white", p: { xs: "22px 20px", sm: "32px 28px", md: "40px 36px" } }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 20 }, color: colors.accent, mb: { xs: 2, md: 3 } }}>
                Collex
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 22, sm: 26, md: 30 }, lineHeight: 1.25, letterSpacing: "-0.8px", mb: { xs: 1.5, md: 2.5 } }}>
                Join the{" "}
                <Box component="span" sx={{ color: colors.accent }}>Campus</Box>
                <br />Loop.
              </Typography>
              <Stack spacing={1.5} sx={{ mb: { xs: 1.5, md: 3 }, flexDirection: { xs: "row", md: "column" }, flexWrap: "wrap", gap: 1 }}>
                {["Verified student network only", "Buy, sell & share on campus", "Connect with your hostel block"].map((t) => (
                  <Stack direction="row" alignItems="center" spacing={1} key={t}>
                    <CheckCircleIcon sx={{ color: colors.accent, fontSize: 16 }} />
                    <Typography sx={{ fontSize: { xs: 12, md: 13.5 }, opacity: 0.88 }}>{t}</Typography>
                  </Stack>
                ))}
              </Stack>
              <Typography sx={{ fontSize: 11, opacity: 0.35, display: { xs: "none", md: "block" } }}>
                © 2025 Collex · Campus Edition
              </Typography>
            </Box>
          </Box>

          {/* RIGHT */}
          <Grid item xs={12} md={6}>
            <Box p={4}>
              <Typography variant="h4" mb={3} sx={{
                textAlign: "center",
                borderBottom: "1px solid #000"
              }}>
                Create Account
              </Typography>

              <Stack spacing={2}>

                <TextField
                  name="fullName"
                  label="Full Name"
                  value={form.fullName || ""}
                  onChange={handleChange}
                />

                <TextField
                  name="email"
                  label="Email"
                  value={form.email || ""}
                  onChange={handleChange}
                />

                <TextField
                  name="phone"
                  label="Phone"
                  value={form.phone || ""}
                  onChange={handleChange}
                />

                <Stack direction="row" spacing={2}>
                  <TextField
                    select
                    name="course"
                    label="Course"
                    value={form.course || ""}
                    onChange={handleChange}
                    fullWidth
                  >
                    {["btech", "mtech", "bba", "mba", "bca", "mca"].map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    name="year"
                    label="Year"
                    value={form.year || ""}
                    onChange={handleChange}
                    fullWidth
                  >
                    {[1, 2, 3, 4, 5].map((y) => (
                      <MenuItem key={y} value={y}>{y}</MenuItem>
                    ))}
                  </TextField>
                </Stack>

                <TextField
                  select
                  name="hostelBlock"
                  label="Hostel"
                  value={form.hostelBlock || ""}
                  onChange={handleChange}
                >
                  {["block-a", "block-b", "block-c", "block-d"].map((b) => (
                    <MenuItem key={b} value={b}>{b}</MenuItem>
                  ))}
                </TextField>

                <Stack direction="row" spacing={2}>
                  <TextField
                    name="password"
                    type="password"
                    label="Password"
                    value={form.password || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    name="confirmPassword"
                    type="password"
                    label="Confirm"
                    value={form.confirmPassword || ""}
                    onChange={handleChange}
                  />
                </Stack>
                <Typography variant="caption" color="secondary.warning" sx={{
                  textAlign: "center",
                  fontWeight: "bold"
                }}>
                  Must include uppercase, lowercase, special character (min 6 chars)
                </Typography>

                {(localError || error) && (
                  <Typography color="error">
                    {localError || error}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign Up"}
                </Button>
              </Stack>
              <Typography variant="body2" textAlign="center" color="text.secondary">
                Already have an account?{" "}
                <Box
                  component="span"
                  onClick={() => navigate("/login")}
                  sx={{ color: colors.primary, fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                >
                  Log in
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Paper>
      </Box>

      {/* OTP DIALOG */}
      <VerifyOtpDialog
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        email={registeredEmail}
        onSuccess={() => {
          toast.success("Account verified 🎉");
          navigate("/login");
        }}
      />
    </>
  );
};

export default Register;