const mongoose = require("mongoose");
const Product = require("./productModel");
const catchAsync = require("../utils/catchAsync");
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1, required: true },
        color: { type: String },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },

    totalQuantity: {
      type: Number,
      default: 0,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

cartSchema.pre("save", async function (next) {
  let totalPrice = 0;
  let totalQuantity = 0;
  for (const item of this.products) {
    const product = await Product.findById(item.product._id);
    if (product) {
      totalPrice += product.price * item.quantity;
      totalQuantity += item.quantity;
    }
  }
  this.totalPrice = totalPrice;
  this.totalQuantity = totalQuantity;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
