const handlerFactory = require("./handlerFactory");
const Order = require("./../models/orderModel");
const catchAsync = require("./../utils/catchAsync");
const Cart = require("../models/cartModel");
const AppError = require("../utils/AppError");
exports.getAllOrder = handlerFactory.getAll(Order);
exports.addOrder = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const userCart = await Cart.findOne({ user: userId });
  if (!userCart || userCart.products.length === 0) {
    return next(new AppError("Your cart is empty", 400));
  }
  const newOrder = await Order.create({
    orderItems: userCart._id,
    totalPrice: userCart.totalPrice * 1,
    shippingAddress: req.body.shippingAddress,
  });

  res.status(201).json({
    status: "success",
    data: {
      order: newOrder,
    },
  });
});
exports.getOrder = handlerFactory.getOne(Order);
exports.updateOrder = handlerFactory.updateOne(Order);
exports.deleteOrder = handlerFactory.deleteOne(Order);
