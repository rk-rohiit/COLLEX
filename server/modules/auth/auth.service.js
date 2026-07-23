import User from "../../models/user.model.js";
import { generateAccessToken, generateRefreshToken, } from "../../utils/generateToken.js";
import { generateOtp } from "../../utils/generateOtp.js";
import { sendEmail, sendVerificationSuccessEmail } from "../../utils/sendEmail.js";
import Otp from "../../models/otp.model.js";


/* =========================
   SEND OTP (STEP 1)
========================= */

// export const sendOtpService = async (data) => {
//   if (!data) {
//     throw new Error("Request body is missing");
//   }

//   const { email } = data;

//   if (!email) {
//     throw new Error("Email is required");
//   }

//   // 🔒 Check existing user
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   // 🔍 Check if OTP already exists
//   const existingOtp = await Otp.findOne({ email });

//   if (existingOtp) {
//     // ⏳ cooldown check
//     if (existingOtp.resendAfter > new Date()) {
//       const seconds = Math.ceil(
//         (existingOtp.resendAfter - new Date()) / 1000
//       );
//       throw new Error(`Wait ${seconds}s before requesting OTP again`);
//     }

//     // 🗑️ remove old OTP
//     await Otp.deleteOne({ email });
//   }

//   const otp = generateOtp();

//   // ✅ SAVE IN MONGODB (NOT MEMORY)
//   await Otp.create({
//     email,
//     otp,
//     data,
//     expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
//     resendAfter: new Date(Date.now() + 30 * 1000), // 30 sec
//   });

//   try {
//     await sendEmail(email, otp);
//   } catch (err) {
//     console.error("Email Error:", err);
//     throw new Error("Failed to send OTP email");
//   }

//   return {
//     success: true,
//     message: "OTP sent successfully",
//   };
// };

export const sendOtpService = async (data) => {
  console.log("📩 SEND OTP REQUEST:", data);

  if (!data) {
    throw new Error("Request body is missing");
  }

  let { email } = data;

  if (!email) {
    throw new Error("Email is required");
  }

  email = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const existingOtp = await Otp.findOne({ email });

  if (existingOtp) {
    console.log("⚠️ Existing OTP found:", existingOtp);

    if (existingOtp.resendAfter > new Date()) {
      const seconds = Math.ceil(
        (existingOtp.resendAfter - new Date()) / 1000
      );
      throw new Error(`Wait ${seconds}s before requesting OTP again`);
    }

    await Otp.deleteOne({ email });
  }

  const otp = generateOtp();

  console.log("🔢 Generated OTP:", otp);

  // Normalize course if present
  const normalizedCourse = data.course && typeof data.course === "string"
    ? data.course.toLowerCase().replace(/\./g, "")
    : data.course;

  await Otp.create({
    email,
    otp,
    data: { ...data, email, course: normalizedCourse }, // 🔥 ensure normalized email and course saved
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    resendAfter: new Date(Date.now() + 30 * 1000),
  });

  try {
    await sendEmail(email, otp);
    console.log("✅ OTP EMAIL SENT");
  } catch (err) {
    console.error("❌ Email Error:", err.message || err);
    console.log("-----------------------------------------");
    console.log(`🔑 [DEVELOPMENT FALLBACK] Generated OTP for ${email}: ${otp}`);
    console.log("-----------------------------------------");

    if (process.env.NODE_ENV !== "production") {
      console.log("⚠️ Non-production environment detected. Bypassing email send failure to allow signup flow testing.");
    } else {
      throw new Error("Failed to send OTP email");
    }
  }

  return {
    success: true,
    message: "OTP sent successfully",
  };
};
/* =========================
   VERIFY OTP + REGISTER (STEP 2)
========================= */
// export const verifyOtpAndRegisterService = async (data) => {
//   if (!data) {
//     throw new Error("Request body is missing");
//   }

//   const { email, otp } = data;

//   if (!email || !otp) {
//     throw new Error("Email and OTP are required");
//   }

//   const storedData = getOtpData(email);

//   if (!storedData) {
//     throw new Error("No OTP found. Please request again");
//   }

//   if (storedData.otp !== otp) {
//     throw new Error("Invalid OTP");
//   }

//   if (storedData.otpExpiry < Date.now()) {
//     throw new Error("OTP expired");
//   }

//   // 🔒 Prevent duplicate user
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   const user = await User.create({
//     email: storedData.email,
//     fullName: storedData.fullName,
//     phone: storedData.phone,
//     course: storedData.course,
//     year: storedData.year,
//     password: storedData.password,
//     isVerified: true,
//   });

//   deleteOtp(email);

//   // 🎉 Send welcome email (non-blocking)
//   sendVerificationSuccessEmail(user).catch((err) => {
//     console.log("Welcome email failed:", err.message);
//   });

//   const token = generateToken(user._id);

//   return {
//     success: true,
//     token,
//     user: {
//       id: user._id,
//       email: user.email,
//       fullName: user.fullName,
//       role: user.role,
//       campusId: user.campusId,
//     },
//   };
// };
export const verifyOtpAndRegisterService = async (data) => {
  console.log("📥 VERIFY OTP REQUEST:", data);

  if (!data) {
    throw new Error("Request body is missing");
  }

  let { email, otp } = data;

  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  email = email.trim().toLowerCase();

  // 🔥 FETCH FROM MONGODB (NOT MEMORY)
  const otpDoc = await Otp.findOne({ email });

  console.log("📦 OTP DOC FROM DB:", otpDoc);

  if (!otpDoc) {
    throw new Error("No OTP found. Please request again");
  }

  if (otpDoc.otp !== otp) {
    console.log("❌ OTP mismatch:", otpDoc.otp, otp);
    throw new Error("Invalid OTP");
  }

  if (otpDoc.expiresAt < new Date()) {
    console.log("⏰ OTP expired:", otpDoc.expiresAt);
    throw new Error("OTP expired");
  }

  const storedData = otpDoc.data;

  // 🔒 Prevent duplicate user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    email: storedData.email,
    fullName: storedData.fullName,
    phone: storedData.phone,
    course: storedData.course && typeof storedData.course === "string"
      ? storedData.course.toLowerCase().replace(/\./g, "")
      : storedData.course,
    year: storedData.year,
    password: storedData.password,
    isVerified: true,
  });

  // 🗑️ DELETE OTP AFTER SUCCESS
  await Otp.deleteOne({ email });

  console.log("✅ USER CREATED:", user.email);

  // 🎉 Send welcome email
  sendVerificationSuccessEmail(user).catch((err) => {
    console.log("Welcome email failed:", err.message);
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    success: true,
    accessToken,
    refreshToken,
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
// export const loginUserService = async (data) => {
//   // ✅ SAFETY CHECK
//   if (!data) {
//     throw new Error("Request body is missing");
//   }

//   const { email, password } = data;

//   if (!email || !password) {
//     throw new Error("Email and password are required");
//   }

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) throw new Error("Invalid credentials");

//   const isMatch = await user.comparePassword(password);

//   if (!isMatch) throw new Error("Invalid credentials");

//   const token = generateToken(user._id);

//   return {
//     success: true,
//     token,
//     user: {
//       id: user._id,
//       email: user.email,
//       fullName: user.fullName,
//       role: user.role,
//       campusId: user.campusId,
//     },
//   };
// };
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

  // 🔥 GENERATE TOKENS
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // 🔥 SAVE REFRESH TOKEN IN DB
  user.refreshToken = refreshToken;
  await user.save();

  // 🔥 RESPONSE
  return {
    success: true,
    accessToken,
    refreshToken,
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

    try {
      await sendEmail(email, newOtp);
    } catch (err) {
      console.error("❌ Email Resend Error:", err.message || err);
      console.log("-----------------------------------------");
      console.log(`🔑 [DEVELOPMENT RESEND FALLBACK] Generated OTP for ${email}: ${newOtp}`);
      console.log("-----------------------------------------");

      if (process.env.NODE_ENV !== "production") {
        console.log("⚠️ Non-production environment detected. Bypassing email resend failure to allow signup flow testing.");
      } else {
        throw new Error("Failed to send OTP email");
      }
    }

    return {
      success: true,
      message: "OTP resent successfully",
    };
  }

  // 🔥 If NO OTP found → create new (edge case)
  throw new Error("Please register again");
};