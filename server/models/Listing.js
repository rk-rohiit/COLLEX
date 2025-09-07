import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    images: [{ type: String }],
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    condition: {
      type: String,
      enum: ["new", "like new", "good", "fair", "poor"],
      default: "good",
    },
    price: { type: Number, required: true },
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
  },
  { timestamps: true } // ✅ Correct placement here
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
