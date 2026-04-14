import User from "../../models/user.model.js";
import { generateToken } from "../../utils/generateToken.js";
import { generateOtp } from "../../utils/generateOtp.js";
import { sendEmail,sendVerificationSuccessEmail } from "../../utils/sendEmail.js";
import { saveOtp, getOtpData, deleteOtp } from "../../utils/otpStore.js";
import Otp from "../../models/otp.model.js";

/* =========================
   SEND OTP (STEP 1)
========================= */

export const sendOtpService = async (data) => {
  if (!data) {
    throw new Error("Request body is missing");
  }

  const { email } = data;

  if (!email) {
    throw new Error("Email is required");
  }

  // 🔒 Check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // 🔍 Check if OTP already exists
  const existingOtp = await Otp.findOne({ email });

  if (existingOtp) {
    // ⏳ cooldown check
    if (existingOtp.resendAfter > new Date()) {
      const seconds = Math.ceil(
        (existingOtp.resendAfter - new Date()) / 1000
      );
      throw new Error(`Wait ${seconds}s before requesting OTP again`);
    }

    // 🗑️ remove old OTP
    await Otp.deleteOne({ email });
  }

  const otp = generateOtp();

  // ✅ SAVE IN MONGODB (NOT MEMORY)
  await Otp.create({
    email,
    otp,
    data,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    resendAfter: new Date(Date.now() + 30 * 1000), // 30 sec
  });

  try {
    await sendEmail(email, otp);
  } catch (err) {
    console.error("Email Error:", err);
    throw new Error("Failed to send OTP email");
  }

  return {
    success: true,
    message: "OTP sent successfully",
  };
};

/* =========================
   VERIFY OTP + REGISTER (STEP 2)
========================= */
export const verifyOtpAndRegisterService = async (data) => {
  if (!data) {
    throw new Error("Request body is missing");
  }

  const { email, otp } = data;

  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  const storedData = getOtpData(email);

  if (!storedData) {
    throw new Error("No OTP found. Please request again");
  }

  if (storedData.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (storedData.otpExpiry < Date.now()) {
    throw new Error("OTP expired");
  }

  // 🔒 Prevent duplicate user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    email: storedData.email,
    fullName: storedData.fullName,
    phone: storedData.phone,
    course: storedData.course,
    year: storedData.year,
    password: storedData.password,
    isVerified: true,
  });

  deleteOtp(email);

  // 🎉 Send welcome email (non-blocking)
  sendVerificationSuccessEmail(user).catch((err) => {
    console.log("Welcome email failed:", err.message);
  });

  const token = generateToken(user._id);

  return {
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      campusId: user.campusId,
    },
  };
};

/* =========================
   LOGIN USER
========================= */
export const loginUserService = async (data) => {
  // ✅ SAFETY CHECK
  if (!data) {
    throw new Error("Request body is missing");
  }

  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);

  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user._id);

  return {
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      campusId: user.campusId,
    },
  };
};

/* =========================
   RESEND OTP (OPTIONAL)
========================= */
// export const resendOtpService = async ({ email }) => {
//   if (!email) throw new Error("Email is required");

//   const otpDoc = await Otp.findOne({ email });

//   if (!otpDoc) {
//     throw new Error("No OTP request found");
//   }

//   // ⏳ cooldown check
//   if (otpDoc.resendAfter > new Date()) {
//     const seconds = Math.ceil(
//       (otpDoc.resendAfter - new Date()) / 1000
//     );
//     throw new Error(`Wait ${seconds}s before resending OTP`);
//   }

//   const newOtp = generateOtp();

//   otpDoc.otp = newOtp;
//   otpDoc.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
//   otpDoc.resendAfter = new Date(Date.now() + 30 * 1000);

//   await otpDoc.save();

//   await sendEmail(email, newOtp);

//   return {
//     success: true,
//     message: "OTP resent successfully",
//   };
// };

export const resendOtpService = async ({ email }) => {
  if (!email) throw new Error("Email is required");

  let otpDoc = await Otp.findOne({ email });

  // 🔥 If OTP exists (even expired)
  if (otpDoc) {
    // ⏳ cooldown check
    if (otpDoc.resendAfter > new Date()) {
      const seconds = Math.ceil(
        (otpDoc.resendAfter - new Date()) / 1000
      );
      throw new Error(`Wait ${seconds}s before resending OTP`);
    }

    const newOtp = generateOtp();

    otpDoc.otp = newOtp;
    otpDoc.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    otpDoc.resendAfter = new Date(Date.now() + 30 * 1000);

    await otpDoc.save();

    await sendEmail(email, newOtp);

    return {
      success: true,
      message: "OTP resent successfully",
    };
  }

  // 🔥 If NO OTP found → create new (edge case)
  throw new Error("Please register again");
};