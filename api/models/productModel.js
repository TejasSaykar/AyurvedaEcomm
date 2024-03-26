const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
    },
    desc: {
      type: String,
      required: true,
      min: 8,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    image1: {
      type: String,
    },
    image2: {
      type: String,
    },
    image3: {
      type: String,
    },
    image4: {
      type: String,
    },
    image5: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    review: {
      type: Number,
      required: true,
    },
    isCombo: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
