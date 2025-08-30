import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ==============================
// USER SCHEMA
// ==============================
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Password won't be returned in queries by default
    },
  },
  { timestamps: true }
);

//
// 🔹 Pre-save hook for password hashing
//
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12); // Stronger hashing
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

//
// 🔹 Method to compare entered password with hashed password
//
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ==============================
// EXPORT MODEL
// ==============================
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
