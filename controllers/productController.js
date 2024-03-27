const handlerFactory = require("./handlerFactory");
const Product = require("./../models/productModel");
exports.getAllProduct = handlerFactory.getAll(Product);
exports.addProduct = handlerFactory.createOne(Product);
exports.getProduct = handlerFactory.getOne(Product);
exports.updateProduct = handlerFactory.updateOne(Product);
exports.deleteProduct = handlerFactory.deleteOne(Product);
