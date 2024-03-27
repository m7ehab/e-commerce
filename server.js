const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database has been connected successfully");
});
const server = app.listen(process.env.PORT || 3000, () => {
  console.log("app running on port ", process.env.PORT);
});
