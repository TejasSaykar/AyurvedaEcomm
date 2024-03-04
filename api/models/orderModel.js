const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delevered", "Cancel"]
    }
}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);