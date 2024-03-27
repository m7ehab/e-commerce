const handlerFactory = require("./handlerFactory");
const Category = require("./../models/categoryModel");
exports.getAllCategory = handlerFactory.getAll(Category);
exports.addCategory = handlerFactory.createOne(Category);
exports.getCategory = handlerFactory.getOne(Category);
exports.updateCategory = handlerFactory.updateOne(Category);
exports.deleteCategory = handlerFactory.deleteOne(Category);
