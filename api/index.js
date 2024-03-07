const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const uploadController = require("./controllers/uploadController");
const categoryRoute = require("./routes/categoryRoute");
const bannerRoute = require("./routes/bannerRoute");
const path = require("path");
const dotenv = require("dotenv")
const app = express();

// Configurations
dotenv.config();
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/upload", uploadController);
app.use("/banner", bannerRoute);


const port = process.env.PORT | 8080;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON http://localhost:${port}`);
})