import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContact, resetContactState } from "@/features/contact/contactSlice";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.contact);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLocalError("");
  };

  const validate = () => {
    let temp = {};
    if (!form.name)    temp.name    = "Name is required";
    if (!form.email)   temp.email   = "Email is required";
    if (!form.message) temp.message = "Message is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    dispatch(submitContact(form));
  };

  useEffect(() => {
    if (success) {
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => dispatch(resetContactState()), 3000);
    }
  }, [success]);

  return (
    <Container
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* HEADING */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* CHIP */}
        <Box
          sx={{
            display: "inline-block",
            px: 2,
            py: 0.75,
            borderRadius: "20px",
            backgroundColor: "rgba(26,35,126,0.07)",
            color: "primary.main",
            fontWeight: 700,
            fontSize: "0.7rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            mb: 1.5,
          }}
        >
          Contact us
        </Box>

        <Typography
          variant="h3"
          fontWeight="800"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
        >
          Get in{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            Touch
          </Box>
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 500, mx: "auto", lineHeight: 1.7 }}>
          Have questions or ideas? We'd love to hear from you.
          Reach out and we'll respond as soon as possible.
        </Typography>

        {/* INFO PILLS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 5,
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: <EmailOutlinedIcon sx={{ fontSize: 15 }} />, label: "support@collex.edu" },
            { icon: <ChatBubbleOutlineIcon sx={{ fontSize: 15 }} />, label: "Replies within 24 hrs" },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.75,
                borderRadius: "10px",
                border: "0.5px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "7px",
                  backgroundColor: "rgba(26,35,126,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "primary.main",
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="caption" fontWeight={500} color="text.secondary">
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </motion.div>

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ width: "100%", maxWidth: 560 }}
      >
        <Box
          sx={{
            width: "100%",
            p: { xs: 3, md: 4 },
            borderRadius: "20px",
            border: "0.5px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            textAlign: "left",
          }}
        >
          {/* NAME + EMAIL ROW */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />
            </Grid>
          </Grid>

          {/* SUBJECT */}
          <TextField
            label="Subject"
            name="subject"
            fullWidth
            margin="normal"
            value={form.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />

          {/* MESSAGE */}
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
            placeholder="Tell us more..."
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />

          {/* ERROR */}
          {(localError || error) && (
            <Typography color="error" variant="body2" mt={1}>
              {localError || error}
            </Typography>
          )}

          {/* SUCCESS */}
          {success && (
            <Typography color="success.main" variant="body2" mt={1} fontWeight={600}>
              ✅ Message sent successfully!
            </Typography>
          )}

          {/* SUBMIT */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            endIcon={<SendIcon sx={{ fontSize: 16 }} />}
            sx={{
              mt: 2.5,
              py: 1.5,
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.95rem",
              boxShadow: "0 4px 16px rgba(26,35,126,0.25)",
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Contact;