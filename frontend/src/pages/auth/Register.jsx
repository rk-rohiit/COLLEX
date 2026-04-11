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
import { registerUser } from "@/features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons for the Welcome Panel
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  // Collex Brand Palette
  const colors = {
    primary: "#0A2647", // Deep Blue from prototype
    accent: "#E86A33",  // Orange Action from prototype
    verified: "#2ECC71", // Green
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

    const res = await dispatch(registerUser(payload));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#F4F7F9", // Clean grey background
        p: { xs: 0, md: 4 }, // No padding on mobile
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 1000,
          minHeight: 650,
          borderRadius: { xs: 0, md: 5 }, // Square on mobile, rounded on desktop
          overflow: "hidden",
          border: '1px solid #edf2f7',
          flexDirection: { xs: "column", md: "row" }, // Stack on mobile
        }}
      >
        {/* 🔥 LEFT PANEL: WELCOME (Based on Image 11) */}
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Box
            sx={{
              flex: 1,
              p: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // Dark Blue Gradient from Collex theme
              background: `linear-gradient(135deg, ${colors.primary}, ${alpha(colors.primary, 0.9)})`,
              color: "white",
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Visual elements (Watermark birds from image 11) */}
            <Box sx={{ 
              position: 'absolute', top: 40, right: 40, 
              fontSize: '120px', opacity: 0.1, pointerEvents: 'none' 
            }}>
              🎓
            </Box>

            <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: '-1px' }}>
              Collex
            </Typography>

            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 1.5,
                  lineHeight: 1.1,
                  letterSpacing: "-1.5px",
                }}
              >
                Join the <br />
                Campus Loop.
              </Typography>

              <Typography
                variant="body1"
                sx={{ mb: 4, maxWidth: 350, opacity: 0.8 }}
              >
                Create your verified student account to start exchanging books, 
                dorm gear, and notes safely within your university.
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mt: 2, color: colors.verified }}>
                <CheckCircleIcon fontSize="small" />
                <Typography variant="caption" fontWeight="bold">Verified student network only.</Typography>
              </Stack>
            </Box>

            <Typography variant="caption" sx={{ opacity: 0.5 }}>
              🔒 Powered by Collex Security Ecosystem.
            </Typography>
          </Box>
        </Grid>

        {/* 🔥 RIGHT PANEL: REGISTER FORM (Single Column) */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" fontWeight="900" color={colors.primary} sx={{ mb: 4, letterSpacing: '-1px' }}>
              Create Account
            </Typography>

            {/* FORM: All fields in a single column */}
            <Box component="form">
              <Stack spacing={1.5}>
                
                {/* FULL NAME */}
                <TextField
                  name="fullName"
                  label="Full Name"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                {/* EMAIL */}
                <TextField
                  name="email"
                  label="University Email (@youruni.edu)"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                {/* PHONE */}
                <TextField
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                {/* COURSE + YEAR (Arranged together) */}
                <Stack direction="row" spacing={1.5}>
                  <TextField
                    select
                    name="course"
                    label="Course"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  >
                    {["btech", "mtech", "bba", "mba", "bca", "mca"].map((c) => (
                      <MenuItem key={c} value={c}>
                        {c.toUpperCase()}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    name="year"
                    label="Year"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  >
                    {[1, 2, 3, 4, 5].map((y) => (
                      <MenuItem key={y} value={y}>
                        Year {y}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>

                {/* HOSTEL (Optional) */}
                <TextField
                  select
                  name="hostelBlock"
                  label="Hostel Block (Optional)"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                >
                  {["block-a", "block-b", "block-c", "block-d"].map((b) => (
                    <MenuItem key={b} value={b}>
                      {b.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>

                {/* PASSWORDS */}
                <Stack direction="row" spacing={1.5}>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                  <TextField
                    name="confirmPassword"
                    label="Confirm"
                    type="password"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Stack>
              </Stack>
            </Box>

            {/* ERROR */}
            {(localError || error) && (
              <Typography color="error" mt={2} sx={{ fontSize: '0.85rem' }}>
                {localError || error}
              </Typography>
            )}

            {/* BUTTON (Vibrant Orange from prototype) */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                bgcolor: colors.accent,
                borderRadius: 3,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: '1rem',
                "&:hover": { bgcolor: "#d15b28" },
              }}
              onClick={handleRegister}
            >
              {loading ? "Creating Ecosystem Profile..." : "Sign Up"}
            </Button>

            {/* LOGIN LINK */}
            <Typography mt={3} textAlign="center" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
              Already have an account?{" "}
              <Box
                component="span"
                sx={{
                  color: colors.primary,
                  cursor: "pointer",
                  fontWeight: 700,
                  "&:hover": { textDecoration: 'underline' }
                }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Box>
            </Typography>
          </Box>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Register;