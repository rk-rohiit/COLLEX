import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import theme from "../../theme";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    // Frontend validation
    if (!name || !email || !message) {
      alert.error("⚠️ Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        alert.success("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert.error(result.message || "❌ Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert.error("❌ Server error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`py-16 px-6 sm:px-10 lg:px-20 ${theme.gradients.section}`}
      id="contact"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl sm:text-5xl font-extrabold"
            style={{ color: theme.colors.textDark }}
          >
            Get in{" "}
            <span
              className={`bg-clip-text text-transparent ${theme.gradients.primary}`}
            >
              Touch
            </span>
          </h2>
          <p className="mt-3 text-lg" style={{ color: theme.colors.textLight }}>
            We’d love to hear from you. Reach out to us anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className={`p-8 ${theme.borderRadius.card} ${theme.shadows.base} bg-white`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-2xl font-semibold mb-6"
              style={{ color: theme.colors.textDark }}
            >
              Contact Information
            </h3>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 ${theme.gradients.primary} rounded-xl shadow-md`}
                >
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4
                    className="font-semibold"
                    style={{ color: theme.colors.textDark }}
                  >
                    Phone
                  </h4>
                  <p style={{ color: theme.colors.textLight }}>
                    +91 98765 43210
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 ${theme.gradients.primary} rounded-xl shadow-md`}
                >
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h4
                    className="font-semibold"
                    style={{ color: theme.colors.textDark }}
                  >
                    Email
                  </h4>
                  <p style={{ color: theme.colors.textLight }}>
                    support@collex.com
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 ${theme.gradients.primary} rounded-xl shadow-md`}
                >
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4
                    className="font-semibold"
                    style={{ color: theme.colors.textDark }}
                  >
                    Office
                  </h4>
                  <p style={{ color: theme.colors.textLight }}>
                    123, Collex Tower, Bangalore, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className={`p-8 ${theme.borderRadius.card} ${theme.shadows.base} bg-white`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-2xl font-semibold mb-6"
              style={{ color: theme.colors.textDark }}
            >
              Send Us a Message
            </h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label
                  className="block mb-2 font-medium"
                  style={{ color: theme.colors.textDark }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block mb-2 font-medium"
                  style={{ color: theme.colors.textDark }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="block mb-2 font-medium"
                  style={{ color: theme.colors.textDark }}
                >
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white font-semibold ${theme.borderRadius.button} ${theme.gradients.primary} ${theme.gradients.primaryHover} ${theme.shadows.base} cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center gap-2">
                  {loading ? "Sending..." : "Send Message"} <Send size={20} />
                </div>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
