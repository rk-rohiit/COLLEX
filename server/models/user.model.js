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
      index:true,
      match: [/^\S+@\S+\.\S+$/, "Use valid email"]
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
      enum: ["block-a", "block-b", "block-c", "block-d"],
      default: null,
    },

    campusId: {
      type: String,
      required: true,
      default: "LPU",
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
      match: [
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
        "Password must contain uppercase, lowercase and number",
      ],
    },

    isVerified: {
      type: Boolean,
      default: true, // ✅ always true now (OTP already verified before creation)
    },
  },
  { timestamps: true }
);

/* HASH PASSWORD */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* COMPARE PASSWORD */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);