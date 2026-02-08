import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@lpu\.edu\.in$/, "Use LPU email only"],
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
      required: true,
      enum: ["btech", "mtech", "bba", "mba", "bca", "mca"],
    },
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    hostelBlock: {
      type: String,
      enum: ["block-a", "block-b", "block-c", "block-d", ""],
      default: "",
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

// 🔐 Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
