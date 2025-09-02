import express from "express";
import ContactUs from "../models/ContactUs.js"; // ✅ Make sure model name matches

const router = express.Router();

// ✅ POST /api/contact - Handle contact form submissions
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Input Validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // ✅ Create New Contact
    const newContact = new ContactUs({ name, email, message }); // ✅ Fixed name
    await newContact.save();

    // ✅ Success Response
    res
      .status(201)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
