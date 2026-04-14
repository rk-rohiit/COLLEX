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
    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.course ||
      !form.year ||
      !form.password
    ) {
      return setLocalError("All required fields must be filled");
    }

    if (form.password !== form.confirmPassword) {
      return setLocalError("Passwords do not match");
    }

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      course: form.course,
      year: Number(form.year),
      hostelBlock: form.hostelBlock || null,
      password: form.password,
    };

    const res = await dispatch(sendOtp(payload));

    if (res.meta.requestStatus === "fulfilled") {
  toast.success("OTP sent to your email");

  setRegisteredEmail(form.email); // 🔥 FIX
  setOtpOpen(true);               // 🔥 OPEN DIALOG

  // reset form
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
        <Paper sx={{ display: "flex", maxWidth: 1000, width: "100%" }}>
          
          {/* LEFT */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 6,
                height: "100%",
                background: `linear-gradient(135deg, ${colors.primary}, ${alpha(colors.primary, 0.9)})`,
                color: "white",
              }}
            >
              <Typography variant="h5">Collex</Typography>

              <Typography variant="h3" mt={4}>
                Join the Campus Loop.
              </Typography>

              <Stack direction="row" mt={3}>
                <CheckCircleIcon />
                <Typography ml={1}>
                  Verified student network only
                </Typography>
              </Stack>
            </Box>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={6}>
            <Box p={4}>
              <Typography variant="h4" mb={3}>
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
                    {[1,2,3,4,5].map((y)=>(
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
                  {["block-a","block-b","block-c","block-d"].map((b)=>(
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