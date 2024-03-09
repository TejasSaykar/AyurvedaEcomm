const mongoose = require("mongoose");

const popupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("popup", popupSchema);