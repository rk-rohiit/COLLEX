// src/models/user.model.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@lpu\.edu\.in$/,
        "Use valid LPU email",
      ],
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      match: [/^(\+91)?[6-9]\d{9}$/, "Invalid phone number"],
    },

    course: {
      type: String,
      enum: ["btech", "mtech", "bba", "mba", "bca", "mca"],
      required: true,
    },

    year: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    hostelBlock: {
      type: String,
      enum: ["block-a", "block-b", "block-c", "block-d", ""],
      default: "",
    },

    campusId: {
      type: String,
      required: true,
      default: "lpu",
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  { timestamps: true }
);

/* Password Hash */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* Compare Password */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.index({ email: 1 });

export default mongoose.model("User", userSchema);