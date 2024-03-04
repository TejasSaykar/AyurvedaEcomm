const express = require("express");
const { register, login } = require("../controllers/authController");
const { placeOrder, getOrders, singleOrder, updateStatus, deleteOrder } = require("../controllers/orderController");

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


module.exports = router;