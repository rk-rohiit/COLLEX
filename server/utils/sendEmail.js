import nodemailer from "nodemailer";

/* =========================
   SMTP TRANSPORT (BREVO)
========================= */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =========================
   SEND OTP EMAIL
========================= */
export const sendEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Collex" <askrohiit@gmail.com>`, // ✅ IMPORTANT
      to: email,
      subject: "OTP Verification",
      html: `
<div style="font-family: Arial, sans-serif; background:#f4f7f9; padding:20px;">
  <div style="max-width:500px; margin:auto; background:white; border-radius:10px; padding:30px; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
    
    <h2 style="color:#0A2647;">Collex</h2>

    <p style="color:#555;">Verify your email to continue</p>

    <h1 style="letter-spacing:8px; color:#E86A33;">
      ${otp}
    </h1>

    <p>This OTP is valid for <b>10 minutes</b>.</p>

    <p style="font-size:12px;color:#999;">
      If you didn’t request this, ignore it.
    </p>
  </div>
</div>
      `,
    });

    console.log("✅ OTP Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw new Error("Failed to send OTP email");
  }
};

/* =========================
   SEND WELCOME EMAIL
========================= */
export const sendVerificationSuccessEmail = async (user) => {
  try {
    const info = await transporter.sendMail({
      from: `"Collex" <askrohiit@gmail.com>`, // ✅ IMPORTANT
      to: user.email,
      subject: "🎉 Welcome to Collex",
      html: `
<div style="font-family: Arial, sans-serif; background:#f4f7f9; padding:20px;">
  <div style="max-width:600px; margin:auto; background:white; border-radius:12px; padding:30px; text-align:center;">
    
    <h2 style="color:#0A2647;">Welcome to Collex 🚀</h2>

    <p>Hi <b>${user.fullName}</b>,</p>

    <p>Your account has been successfully verified 🎉</p>

    <a href="https://collex-nine.vercel.app"
       style="display:inline-block; margin-top:20px; padding:12px 25px; background:#E86A33; color:white; text-decoration:none; border-radius:6px;">
       Explore Now
    </a>

    <p style="font-size:12px;color:#999;margin-top:20px;">
      Team Collex
    </p>
  </div>
</div>
      `,
    });

    console.log("✅ Welcome Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Welcome Email Error:", error);
  }
};