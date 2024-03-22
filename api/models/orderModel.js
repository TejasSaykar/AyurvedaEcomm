const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    fullname: {
      type: String,
      required: true,
    },
    flatNo: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: [
        "Order Placed",
        "Not Process",
        "Processing",
        "Shipped",
        "Delevered",
        "Cancel",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
