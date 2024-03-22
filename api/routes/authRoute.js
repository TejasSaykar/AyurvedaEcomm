const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  placeOrder,
  getOrders,
  singleOrder,
  updateStatus,
  deleteOrder,
} = require("../controllers/orderController");
const {
  popup,
  getPopups,
  deletePopup,
} = require("../controllers/popupController");
const {
  newsletter,
  getNewsletters,
} = require("../controllers/newsletterController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

// Place the Order
router.post("/order", placeOrder);

// Get all Orders
router.get("/orders", getOrders);

// Get single User Order
router.get("/single-order/:id", singleOrder);

// Updated Order Status
router.put("/update-status/:id", updateStatus);

// Delete Order
router.delete("/delete-order/:id", deleteOrder);

// Popup Route
router.post("/popup", popup);

// Getting all Popups
router.get("/popups", getPopups);

// Delete Popup
router.delete("/popup/:id", deletePopup);

// Subscribe to the NewsLetter
router.post("/subscribe", newsletter);

// Get all newsletters
router.get("/newsletters", getNewsletters);

module.exports = router;
