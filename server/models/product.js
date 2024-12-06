const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isRecommended: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Available", "OutOfStock"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
