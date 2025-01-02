const express = require("express");
const { createOrder, getUserOrders } = require("../controllers/orderController");
const { authGuard } = require("../middleware/authGuard");

const router = express.Router();

// Route to Create an Order
router.post("/create", authGuard, createOrder);

// Route to Get Orders for a Specific User
router.get("/user-orders/:userId", authGuard, getUserOrders);

module.exports = router;
