const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "active" }, // 'active' or 'inactive'
});

module.exports = mongoose.model("Cart", cartSchema);
