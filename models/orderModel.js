const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    shippingAddress: { type: String, required: true },
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({ path: "orderItems", select: "products" });
  next();
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
