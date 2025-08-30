export const otpEmailTemplate = (name, otp) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color:#cc0102">Hello ${name},</h2>
      <p>Thank you for registering on <b>Collex</b>!</p>
      <p>Your OTP for email verification is:</p>
      <h1 style="color:#cc0102; letter-spacing: 2px;">${otp}</h1>
      <p>This OTP is valid for <b>5 minutes</b>. Please do not share it with anyone.</p>
      <br/>
      <p>Best regards,</p>
      <h3 style="color:#cc0102">Team Collex</h3>
    </div>
  `;
};
