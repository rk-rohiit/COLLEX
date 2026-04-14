import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
   SEND OTP EMAIL
========================= */
export const sendEmail = async (email, otp) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // default working sender
      to: email,
      subject: "OTP Verification",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    console.log("✅ Email sent:", response);
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw new Error("Failed to send OTP email");
  }
};

/* =========================
   SEND VERIFICATION SUCCESS EMAIL
========================= */
export const sendVerificationSuccessEmail = async (user) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: user.email,
      subject: "🎉 Welcome to Collex",
      html: `
        <h1>Welcome to Collex 🚀</h1>
        <p>Hi ${user.fullName},</p>

        <p>Your account has been successfully verified.</p>

        <p>🎉 You are now officially a member of <b>Collex</b>.</p>

        <p>Start exploring, connecting, and growing with us.</p>

        <br/>

        <a href="https://collex-nine.vercel.app" 
           style="padding:10px 20px;background:#cc0102;color:white;text-decoration:none;border-radius:5px;">
           Go to Dashboard
        </a>

        <br/><br/>

        <p>Thanks,<br/>Team Collex</p>
      `,
    });

    console.log("✅ Welcome Email sent");
  } catch (error) {
    console.error("❌ Welcome Email Error:", error);
  }
};