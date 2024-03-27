const handlerFactory = require("./handlerFactory");
const WishList = require("./../models/wishListModel");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");

exports.getAllWishList = handlerFactory.getAll(WishList);

exports.addToList = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user._id;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Invalid Product id", 404));
  }
  let wishList = await WishList.findOne({ user: userId });

  if (!wishList) {
    wishList = await WishList.create({
      products: {
        product: productId,
      },
      user: userId,
    });
  } else {
    const existingProductIndex = wishList.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (existingProductIndex == -1) {
      // If the product is not already in the cart, increase its quantity by one
      wishList.products.push({
        product: productId,
      });
    }
  }
  res.status(200).json({
    status: "success",
    message: "Product added to your wishlist successfully",
    results: wishList.products.length,
    data: wishList,
  });
});
exports.getWishList = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const wishList = await WishList.findOne({ user: userId });
  res.status(200).json({
    status: "success",
    data: { wishList },
  });
});
exports.removeItem = catchAsync(async (req, res, next) => {
  const wishList = await WishList.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { products: { product: req.params.id } },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    results: wishList.products.length,
    data: wishList,
  });
});
