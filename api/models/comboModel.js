const mongoose = require("mongoose");

const comboSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model("combo", comboSchema);