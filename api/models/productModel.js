const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    desc: {
        type: String,
        required: true,
        min: 8
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    review: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("product", productSchema);