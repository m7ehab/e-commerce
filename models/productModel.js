const mongoose = require("mongoose");
const slugify = require("slugify");
const Category = require("./categoryModel");
const AppError = require("./../utils/AppError");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "must be not null"],
      unique: true,
    },
    description: { type: String, required: true },
    price: {
      type: String,
      required: [true, "must be not null"],
    },
    slug: String,
    image: { type: String, required: true },
    images: [{ type: String }],
    colors: [{ type: String }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    sizes: [
      {
        type: String,
        enum: ["s", "m", "l", "xl", "xxl"],
      },
    ],
    quantity: {
      type: Number,
      required: true,
      default: 100,
      min: 0,
      max: 1000,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
productSchema.pre("save", async function (next) {
  const cat = await Category.findOne(this.category);
  if (!cat) {
    return next(new AppError("This category doesn't exists", 401));
  }
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "-__v",
  });
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
