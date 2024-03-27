const handlerFactory = require("./handlerFactory");
const Cart = require("../models/cartModel");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");
const AppError = require("../utils/AppError");

exports.getAllCart = handlerFactory.getAll(Cart);

exports.addCart = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  if (cart) {
    await Cart.deleteOne({ user: userId });
  }
  const newCart = await Cart.create({
    products: req.body.products,
    user: userId,
  });

  res.status(201).json({
    data: {
      cart: newCart,
    },
  });
});
exports.addItem = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user._id;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Invalid Product id", 404));
  }
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      products: {
        product: req.params.id,
        quantity: req.body.quantity,
        color: req.body.color,
      },
      user: userId,
    });
  } else {
    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, increase its quantity by one
      cart.products[existingProductIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it to the cart with quantity 1
      cart.products.push({
        product: req.params.id,
        quantity: req.body.quantity,
        color: req.body.color,
      });
    }

    await cart.save();
  }
  res.status(200).json({
    status: "success",
    message: "Product added to cart successfully",
    numOfCartItems: cart.products.length,
    data: cart,
  });
});
exports.getCart = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(200).json({
      status: "success",
      data: "Your cart is empty",
    });
  }
  res.status(200).json({
    status: "success",
    data: { cart },
  });
});
exports.removeItem = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { products: { product: req.params.id } },
    },
    { new: true }
  );

  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.products.length,
    data: cart,
  });
});
exports.deleteCart = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const userCart = await findOneAndDelete({ user: userId });
});
