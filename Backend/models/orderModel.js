const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference the user model
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products", // Reference the product model
    required: true,
  },
  action: {
    type: String,
    enum: ["buy", "rent"], // Specify valid actions
    required: true,
  },
  rentDuration: {
    type: Number,
    default: null, // Only applicable for rent
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("orders", orderSchema);
