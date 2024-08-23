const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database has been connected successfully");
});
const server = app.listen(port, () => {
  console.log("app running on port ", port);
});
