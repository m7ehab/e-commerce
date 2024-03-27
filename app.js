const express = require("express");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRoute");
const orderRouter = require("./routes/orderRoute");
const cartRouter = require("./routes/cartRoute");
const wishListRouter = require("./routes/wishListRoute");

const AppError = require("./utils/AppError");
const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishList", wishListRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);

// app.use("/api/v1/reviews", reviewRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404)); // next receives errors only and passes it to middleware handler and skip all other middleware in stack and goes to handler middleware
});
app.use(globalErrorHandler);
module.exports = app;
