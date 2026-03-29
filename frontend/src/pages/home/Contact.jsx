import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  submitContact,
  resetContactState,
} from "@/features/contact/contactSlice";

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.contact
  );

  const gradient = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [localError, setLocalError] = useState("");

  // 🔥 Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLocalError("");
  };

  // 🔥 Validation
  const validate = () => {
    let temp = {};

    if (!form.name) temp.name = "Name is required";
    if (!form.email) temp.email = "Email is required";
    if (!form.message) temp.message = "Message is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // 🔥 Submit
  const handleSubmit = () => {
    if (!validate()) return;

    dispatch(submitContact(form));
  };

  // 🔥 Reset form after success
  useEffect(() => {
    if (success) {
      setForm({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        dispatch(resetContactState());
      }, 3000);
    }
  }, [success]);

  return (
    <Container
      id="contact"
      sx={{
        py: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Get in{" "}
          <span
            style={{
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Touch
          </span>
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
          Have questions or ideas? We'd love to hear from you.
          Reach out and we’ll respond as soon as possible.
        </Typography>
      </motion.div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 4,
            borderRadius: 4,
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            mx: "auto",
          }}
        >
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Message"
            name="message"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={form.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
          />

          {/* 🔥 Errors */}
          {(localError || error) && (
            <Typography color="error" mt={1}>
              {localError || error}
            </Typography>
          )}

          {/* ✅ Success */}
          {success && (
            <Typography color="success.main" mt={1}>
              Message sent successfully ✅
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: "999px",
              background: gradient,
            }}
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Contact;