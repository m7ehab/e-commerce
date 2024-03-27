const express = require("express");
const categoryController = require("./../controllers/categoryController");
const authController = require("./../controllers/authController");
const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(
    authController.protectRoute,
    authController.restrictTo('admin'),
    categoryController.addCategory
  )
  .get(categoryController.getAllCategory);

categoryRouter
  .route("/:id")
  .delete(
    authController.protectRoute,
    authController.restrictTo('admin'),
    categoryController.deleteCategory
  )
  .get(categoryController.getCategory)
  .patch(
    authController.protectRoute,
    authController.restrictTo('admin'),
    categoryController.updateCategory
  );

module.exports = categoryRouter;
