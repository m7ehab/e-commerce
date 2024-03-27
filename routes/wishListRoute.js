const express = require("express");
const wishListController = require("../controllers/wishListController");
const authController = require("../controllers/authController");
const wishListRouter = express.Router();
wishListRouter.use(authController.protectRoute);
wishListRouter
  .route("/")
  .get(authController.restrictTo("admin", wishListController.getAllWishList));

wishListRouter
  .route("/:id")
  .post(authController.restrictTo("user"), wishListController.addToList)
  .delete(authController.restrictTo("user"), wishListController.removeItem);

wishListRouter.route("/myWishList").get(wishListController.getWishList);
module.exports = wishListRouter;
