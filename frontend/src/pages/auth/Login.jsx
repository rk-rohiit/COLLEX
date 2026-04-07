import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  Collapse,
  CircularProgress,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/authSlice";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const FEATURES = [
  {
    icon: <LocalShippingOutlinedIcon fontSize="small" />,
    title: "Fast delivery",
    sub: "Get it in 24–48 hours",
  },
  {
    icon: <SecurityOutlinedIcon fontSize="small" />,
    title: "Secure payments",
    sub: "100% safe & encrypted",
  },
  {
    icon: <TrendingDownOutlinedIcon fontSize="small" />,
    title: "Best prices",
    sub: "Deals updated daily",
  },
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    if (!form.email || !form.password) return;
    try {
      await dispatch(loginUser(form)).unwrap();
      setSuccessMsg("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      // error shown via Redux state
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          width: "100%",
          maxWidth: 860,
          border: "0.5px solid",
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* ── LEFT PANEL ── */}
        <Box
          sx={{
            bgcolor: "primary.main",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 5,
            gap: 3,
          }}
        >
          {/* Logo */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight="500"
              color="white"
              letterSpacing="-0.5px"
            >
              Collex
              <Box component="span" sx={{ color: "secondary.light" }}>
                .
              </Box>
            </Typography>
            <Typography variant="body2" sx={{ color: "primary.100", mt: 1 }}>
              Your one-stop shop for everything you love
            </Typography>
          </Box>

          {/* Feature list */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, width: "100%" }}>
            {FEATURES.map((f) => (
              <Box
                key={f.title}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  bgcolor: "rgba(255,255,255,0.10)",
                  borderRadius: 2,
                  px: 2,
                  py: 1.25,
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 1.5,
                    bgcolor: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="500" color="white">
                    {f.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "primary.100" }}>
                    {f.sub}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── RIGHT PANEL ── */}
        <Box
          sx={{
            bgcolor: "background.paper",
            p: { xs: 3, sm: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Mobile logo */}
          <Typography
            variant="h5"
            fontWeight="500"
            color="primary"
            sx={{ display: { xs: "block", md: "none" }, mb: 3 }}
          >
            Collex
            <Box component="span" color="secondary.main">.</Box>
          </Typography>

          <Typography variant="h5" fontWeight="500" gutterBottom>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Sign in to your Collex account
          </Typography>

          {/* ✅ SUCCESS TOAST */}
          <Collapse in={Boolean(successMsg)}>
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              {successMsg}
            </Alert>
          </Collapse>

          {/* ❌ ERROR TOAST */}
          <Collapse in={Boolean(error)}>
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error || "Invalid email or password. Please try again."}
            </Alert>
          </Collapse>

          <TextField
            name="email"
            label="Email address"
            type="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ textAlign: "right", mt: 0.5, mb: 2 }}>
            <Typography
              component={Link}
              to="/forgot-password"
              variant="caption"
              color="primary"
              sx={{ textDecoration: "none" }}
            >
              Forgot password?
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: 15,
              py: 1.2,
            }}
            startIcon={
              loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mt: 3 }}
          >
            Don't have an account?{" "}
            <Typography
              component={Link}
              to="/register"
              variant="body2"
              color="primary"
              fontWeight="500"
              sx={{ textDecoration: "none" }}
            >
              Register
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;