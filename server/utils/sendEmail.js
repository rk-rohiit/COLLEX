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
      // html: `<h2>Your OTP is: ${otp}</h2>`,
      html: `
<div style="font-family: Arial, sans-serif; background:#f4f7f9; padding:20px;">
  <div style="max-width:500px; margin:auto; background:white; border-radius:10px; padding:30px; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
    
    <h2 style="color:#0A2647; margin-bottom:10px;">Collex</h2>
    
    <p style="color:#555; font-size:14px;">
      Verify your email to continue
    </p>

    <h1 style="letter-spacing:8px; font-size:32px; margin:20px 0; color:#E86A33;">
      ${otp}
    </h1>

    <p style="color:#777; font-size:14px;">
      This OTP is valid for <b>10 minutes</b>.
    </p>

    <p style="color:#999; font-size:12px; margin-top:20px;">
      If you didn’t request this, you can safely ignore this email.
    </p>

  </div>
</div>
`
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
      // html: `
      //   <h1>Welcome to Collex 🚀</h1>
      //   <p>Hi ${user.fullName},</p>

      //   <p>Your account has been successfully verified.</p>

      //   <p>🎉 You are now officially a member of <b>Collex</b>.</p>

      //   <p>Start exploring, connecting, and growing with us.</p>

      //   <br/>

      //   <a href="https://collex-nine.vercel.app" 
      //      style="padding:10px 20px;background:#cc0102;color:white;text-decoration:none;border-radius:5px;">
      //      Go to Dashboard
      //   </a>

      //   <br/><br/>

      //   <p>Thanks,<br/>Team Collex</p>
      // `,
      html: `
<div style="font-family: Arial, sans-serif; background:#f4f7f9; padding:20px;">
  <div style="max-width:600px; margin:auto; background:white; border-radius:12px; padding:30px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

    <h2 style="color:#0A2647;">Welcome to Collex 🚀</h2>

    <p style="color:#555; font-size:16px;">
      Hi <b>${user.fullName}</b>,
    </p>

    <p style="color:#555; font-size:15px;">
      Your account has been successfully verified 🎉
    </p>

    <div style="margin:20px 0; padding:15px; background:#f0f7ff; border-radius:8px;">
      <p style="margin:0; color:#0A2647;">
        You are now officially part of the <b>Collex community</b>
      </p>
    </div>

    <a href="https://collex-nine.vercel.app"
       style="display:inline-block; margin-top:20px; padding:12px 25px; background:#E86A33; color:white; text-decoration:none; border-radius:6px; font-weight:bold;">
       Explore Now
    </a>

    <p style="color:#999; font-size:12px; margin-top:30px;">
      Thanks,<br/>Team Collex
    </p>

  </div>
</div>
`
    });

    console.log("✅ Welcome Email sent");
  } catch (error) {
    console.error("❌ Welcome Email Error:", error);
  }
};