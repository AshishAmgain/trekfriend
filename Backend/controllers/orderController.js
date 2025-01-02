const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Create Order Controller
const createOrder = async (req, res) => {
  const { userId, productId, action, rentDuration } = req.body;

  // Validation for required fields
  if (!userId || !productId || !action) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    // Fetch product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Calculate total price
    const totalPrice =
      action === "buy"
        ? product.productPrice
        : (product.productPrice / 10) * rentDuration;

    // Create new order object
    const newOrder = new Order({
      user: userId,
      product: productId,
      action: action,
      rentDuration: action === "rent" ? rentDuration : null,
      totalPrice: totalPrice,
    });

    // Save the order
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Orders for a User
const getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch user orders with product details populated
    const orders = await Order.find({ user: userId }).populate("product");

    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};
