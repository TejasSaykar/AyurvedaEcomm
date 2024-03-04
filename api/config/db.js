const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGO GOT CONNECTED`);
    } catch (error) {
        console.log(`mongo error : ${error}`);
    }
}

module.exports = connectDB;