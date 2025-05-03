import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [{
    _id: String,
    name: String,
    price: Number,
    category: String
  }],
  totalAmount: { type: Number, required: true },
  table: { type: String, required: false },
  status: { type: String, enum: ["pending", "preparing", "ready", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order; 