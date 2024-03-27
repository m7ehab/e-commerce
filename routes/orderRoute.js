const express = require("express");
const orderController = require("./../controllers/orderController");
const authController = require("./../controllers/authController");
const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(
    authController.protectRoute,
    authController.restrictTo("user"),
    orderController.addOrder
  )
  .get(
    authController.protectRoute,
    authController.restrictTo("admin"),
    orderController.getAllOrder
  );

orderRouter
  .route("/:id")
  .delete(
    authController.protectRoute,
    authController.restrictTo("admin", "user"),
    orderController.deleteOrder
  )
  .get(orderController.getOrder)
  .patch(
    authController.protectRoute,
    authController.restrictTo("admin", "user"),
    orderController.updateOrder
  );

module.exports = orderRouter;
