import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const Contact = () => {
  const theme = useTheme();

  const gradient = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let temp = {};
    if (!form.name) temp.name = "Name is required";
    if (!form.email) temp.email = "Email is required";
    if (!form.message) temp.message = "Message is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Form Data:", form);
    }
  };

  return (
    <Container
      id="contact"
      sx={{
        py: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 🔥 center everything
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

        <Typography
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600 }}
        >
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
            mx: "auto", // 🔥 center form
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
            Send Message 🚀
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Contact;