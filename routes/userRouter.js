const express = require("express");
const userRouter = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

userRouter.route("/signUp").post(authController.signUp);
userRouter.route("/signIn").post(authController.signIn);
userRouter.route("/forgetPassword").post(authController.forgetPassword);
userRouter.route("/resetPassword/:token").patch(authController.resetPassword);

// PROTECTING ALL BELOW ROUTES
userRouter.use(authController.protectRoute);

userRouter.route("/updatePassword").patch(authController.updatePassword);

userRouter.route("/me").get(userController.getMe, userController.getUserById);

userRouter
  .route("/updateMe")
  .patch(userController.getMe, userController.updateMe);

userRouter
  .route("/deleteMe")
  .delete(userController.getMe, userController.deleteMe);

userRouter.use(authController.restrictTo("admin"));

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.addUser);

userRouter
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

userRouter.route("/block/:id").patch(authController.blockUser);
userRouter.route("/unblock/:id").patch(authController.unBlockUser);

module.exports = userRouter;
