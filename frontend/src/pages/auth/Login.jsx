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
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import VerifyOtpDialog from "@/components/ui/VerifyOtpDialog";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/authSlice";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// 🔥 Updated Features for Campus Marketplace context
const FEATURES = [
  {
    icon: <VerifiedUserOutlinedIcon fontSize="small" />,
    title: "Verified Students",
    sub: "Exclusive to your university",
  },
  {
    icon: <HandshakeOutlinedIcon fontSize="small" />,
    title: "Hand-to-Hand Exchange",
    sub: "Safe meetups on campus",
  },
  {
    icon: <GroupsOutlinedIcon fontSize="small" />,
    title: "Peer Community",
    sub: "Direct chat with sellers",
  },
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, accessToken } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [successMsg, setSuccessMsg] = useState("");

const [otpOpen, setOtpOpen] = useState(false);
const [loginEmail, setLoginEmail] = useState("");
  // Brand Palette
  const colors = {
    primary: "#0A2647", // Deep Blue
    accent: "#E86A33",  // Orange Action
    bg: "#F4F7F9",
  };

  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  setSuccessMsg(""); // ✅ clear old success
};
const handleLogin = async () => {
  if (!form.email || !form.password) return;

  try {
    const data = await dispatch(
      loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })
    ).unwrap();

    // if (data?.requiresOtp) {
    //   setLoginEmail(form.email);
    //   setOtpOpen(true);
    //   setForm((prev) => ({ ...prev, password: "" }));
    //   return;
    // }

    setSuccessMsg("Welcome back! Redirecting...");
    setTimeout(() => navigate("/"), 1200);

  } catch (err) {
    console.log("Login error:", err);
    setSuccessMsg("");
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken, navigate]);

  return (
    <>
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
          <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: "-1px" }}>
            Collex
          </Typography>

          <Box>
            <Typography variant="h3" fontWeight="900" sx={{ mb: 2, lineHeight: 1.1 }}>
              Back to the <br /> 
              <Box component="span" sx={{ color: colors.accent }}>Campus Loop.</Box>
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, maxWidth: 300 }}>
              Sign in to manage your listings and discover new deals from your peers.
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

        {/* ── RIGHT PANEL: LOGIN FORM ── */}
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
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your credentials to access your account
            </Typography>
          </Box>

          <Collapse in={Boolean(successMsg)}>
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{successMsg}</Alert>
          </Collapse>

          <Collapse in={Boolean(error)}>
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>
          </Collapse>

          <Stack spacing={2.5}>
            {/* <TextField
              name="email"
              label="University Email"
              fullWidth
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              InputProps={{
                sx: { borderRadius: 2.5 },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            /> */}
            <TextField
  name="email"
  label="University Email"
  value={form.email}
  onChange={handleChange}
  onKeyDown={handleKeyDown}
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

            <Box>
              <TextField
  name="password"
  label="Password"
  type="password"
  value={form.password}
  onChange={handleChange}
  onKeyDown={handleKeyDown}
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
              <Box sx={{ textAlign: "right", mt: 1 }}>
                <Typography
                  component={Link}
                  to="/forgot-password"
                  variant="caption"
                  fontWeight="700"
                  color={colors.primary}
                  sx={{ textDecoration: "none", "&:hover": { color: colors.accent } }}
                >
                  Forgot password?
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleLogin}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>

            <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
              New to the campus marketplace?{" "}
              <Link
                to="/register"
                style={{ 
                    color: colors.primary, 
                    fontWeight: "800", 
                    textDecoration: "none" 
                }}
              >
                Create an Account
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
    
    <VerifyOtpDialog
  open={otpOpen}
  onClose={() => setOtpOpen(false)}
  email={loginEmail}
  onSuccess={() => {
    setSuccessMsg("Login successful 🎉");
    setTimeout(() => navigate("/"), 1200);
  }}
/>
    </>
  );
};

export default Login;