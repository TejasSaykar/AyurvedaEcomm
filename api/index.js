const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const uploadController = require("./controllers/uploadController");
const categoryRoute = require("./routes/categoryRoute");
const bannerRoute = require("./routes/bannerRoute");
const contactRoute = require("./routes/contactRoute");
const path = require("path");
const fs = require("fs");
const https = require("https");
const dotenv = require("dotenv");
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
app.use("/api/user", contactRoute);

app.get("/", (req, res) => {
  res.send("Hello From Ayurved Ecomm");
});

// Load SSL certificates (replace these paths with your own certificates)
// const privateKey = fs.readFileSync("./config/https/private.key", "utf8");
// const certificate = fs.readFileSync("./config/https/certificate.crt", "utf8");
// const ca = fs.readFileSync("./config/https/ca_bundle.crt", "utf8");

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };

// // Create an HTTPS server
// const httpsServer = https.createServer(credentials, app);

// const port = 8181;
// httpsServer.listen(port, () => {
//   console.log(`SERVER IS RUNNING ON https://brahmand.online:${port}`);
// });

// const port = process.env.PORT | 8181;
// app.listen(port, () => {
//     console.log(`SERVER IS RUNNING ON http://localhost:${port}`);
// })

const PORT = 8181;
const appInProduction = true;
if (!appInProduction) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} ✅`);
  });
} else {
  const httpsOptions = {
    key: fs.readFileSync("./config/https/private.key"),
    cert: fs.readFileSync("./config/https/certificate.crt"),
    ca: [fs.readFileSync("./config/https/ca_bundle.crt")],
  };

  https.createServer(httpsOptions, app).listen(PORT, (error) => {
    if (error) {
      console.error("Error starting HTTPS server:", error);
    } else {
      console.log(`Server running on https://brahmand.online:${PORT} ✅`);
    }
  });
}
