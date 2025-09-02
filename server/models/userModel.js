import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@lpu\.edu\.in$/,
        "Please use a valid LPU email address",
      ],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [
        /^(\+91[-\s]?)?[0]?(91[-\s]?)?[6789]\d{9}$/,
        "Please enter a valid Indian phone number",
      ],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      enum: ["btech", "mtech", "bba", "mba", "bca", "mca"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1, "Year must be between 1 and 4"],
      max: [4, "Year must be between 1 and 4"],
    },
    hostelBlock: {
      type: String,
      enum: ["block-a", "block-b", "block-c", "block-d", ""],
      default: "",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastLogin: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

// INDEXES
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ course: 1, year: 1 });

// VIRTUAL PROPERTY
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// PRE-SAVE HOOK FOR HASHING
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// COMPARE PASSWORDS
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (this.isLocked) {
    throw new Error(
      "Account is temporarily locked due to too many failed login attempts"
    );
  }

  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  if (!isMatch) {
    this.loginAttempts += 1;

    if (this.loginAttempts >= 5) {
      this.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
    }

    await this.save();
    return false;
  }

  // Reset on success
  if (this.loginAttempts > 0) {
    this.loginAttempts = 0;
    this.lockUntil = undefined;
    this.lastLogin = new Date();
    await this.save();
  }

  return true;
};

// JWT TOKEN GENERATORS
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

// PASSWORD RESET TOKEN
userSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 mins
  return resetToken;
};

// EXPORT MODEL
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
