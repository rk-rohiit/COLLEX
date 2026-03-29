import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

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
    // 🔥 Validation
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

    // 🔥 Send exact backend payload
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
        px: 2,
      }}
    >
      <Paper elevation={6} sx={{ width: 420, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Create Account
        </Typography>

        {/* Inputs */}
        <TextField
          name="fullName"
          label="Full Name"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          name="phone"
          label="Phone"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        {/* Course */}
        <TextField
          select
          name="course"
          label="Course"
          fullWidth
          margin="normal"
          onChange={handleChange}
        >
          {["btech", "mtech", "bba", "mba", "bca", "mca"].map((c) => (
            <MenuItem key={c} value={c}>
              {c.toUpperCase()}
            </MenuItem>
          ))}
        </TextField>

        {/* Year */}
        <TextField
          select
          name="year"
          label="Year"
          fullWidth
          margin="normal"
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((y) => (
            <MenuItem key={y} value={y}>
              Year {y}
            </MenuItem>
          ))}
        </TextField>

        {/* Hostel Block */}
        <TextField
          select
          name="hostelBlock"
          label="Hostel Block (Optional)"
          fullWidth
          margin="normal"
          onChange={handleChange}
        >
          {["block-a", "block-b", "block-c", "block-d"].map((b) => (
            <MenuItem key={b} value={b}>
              {b.toUpperCase()}
            </MenuItem>
          ))}
        </TextField>

        {/* Password */}
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        {/* Errors */}
        {(localError || error) && (
          <Typography color="error" mt={1}>
            {localError || error}
          </Typography>
        )}

        {/* Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.5 }}
          onClick={handleRegister}
        >
          {loading ? "Creating..." : "Register"}
        </Button>

        {/* Redirect */}
        <Typography mt={2} textAlign="center">
          Already have an account?{" "}
          <span
            style={{ color: "#cc0102", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;