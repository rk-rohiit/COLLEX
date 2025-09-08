import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (val) {
          return val.length <= 5;
        },
        message: "You can upload up to 5 images only.",
      },
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    condition: {
      type: String,
      enum: ["new", "like new", "good", "fair", "poor"],
      default: "good",
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    type: {
      type: String,
      enum: ["sell", "rent"],
      required: true,
    },
    rentPeriod: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: function () {
        return this.type === "rent";
      },
    },
    rentDeposit: {
      type: Number,
      required: function () {
        return this.type === "rent";
      },
    },
    location: { type: String, required: true },
    contactPreference: {
      type: String,
      enum: ["chat", "email", "phone"],
      default: "chat",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// 🔹 Index for better search performance
listingSchema.index({ title: "text", description: "text", category: 1 });

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
