const express = require("express");
const productController = require("./../controllers/productController");
const authController = require("./../controllers/authController");
const productRouter = express.Router();

productRouter
  .route("/")
  .post(
    authController.protectRoute,
    authController.restrictTo("admin"),
    productController.addProduct
  )
  .get(productController.getAllProduct);

productRouter
  .route("/:id")
  .delete(
    authController.protectRoute,
    authController.restrictTo("admin"),
    productController.deleteProduct
  )
  .get(productController.getProduct)
  .patch(
    authController.protectRoute,
    authController.restrictTo("admin"),
    productController.updateProduct
  );

module.exports = productRouter;
