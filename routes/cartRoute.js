const express = require("express");
const cartController = require("./../controllers/cartController");
const authController = require("../controllers/authController");
const cartRouter = express.Router();
cartRouter.use(authController.protectRoute);
cartRouter
  .route("/")
  .post(authController.restrictTo("user"), cartController.addCart)
  .get(authController.restrictTo("admin"), cartController.getAllCart)
  .delete(cartController.deleteCart);

cartRouter.route("/myCart").get(cartController.getCart);

cartRouter
  .route("/item/:id") //productId
  .post(authController.restrictTo("user"), cartController.addItem)
  .delete(authController.restrictTo("user"), cartController.removeItem);

module.exports = cartRouter;
