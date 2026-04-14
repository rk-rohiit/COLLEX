import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

/* =========================
   SEND OTP EMAIL
========================= */
export const sendEmail = async (email, otp) => {
  try {
    await apiInstance.sendTransacEmail({
      sender: {
        email: "askrohiit@gmail.com", // ✅ verified sender
        name: "Collex",
      },
      to: [{ email }],
      subject: "OTP Verification",

      // ✅ ADD TEXT (important for delivery)
      textContent: `Your OTP is ${otp}`,

      // ✅ YOUR SAME HTML (unchanged)
      htmlContent: `
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

    console.log("✅ OTP Email sent");
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
    await apiInstance.sendTransacEmail({
      sender: {
        email: "askrohiit@gmail.com",
        name: "Collex",
      },
      to: [{ email: user.email }],
      subject: "🎉 Welcome to Collex",

      textContent: `Welcome ${user.fullName}, your account is verified!`,

      htmlContent: `
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

    console.log("✅ Welcome Email sent");
  } catch (error) {
    console.error("❌ Welcome Email Error:", error);
  }
};