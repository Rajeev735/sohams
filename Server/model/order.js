
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller", // Assuming you have a Seller model
    required: true,
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  status: String, // e.g. "Pending", "Shipped", etc.
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
