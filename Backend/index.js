const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const axios = require("axios");
const connectDB = require("./database/database"); // Database connection file
const newsletterRoutes = require("./routes/newsletterRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(fileUpload()); // Enable file uploads

// Define allowed origins for CORS
const allowedOrigins = ["http://localhost:3000"]; // Replace with your frontend URL
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials (cookies, tokens)
};

// Use CORS middleware
app.use(cors(corsOptions));

// Serve static files
app.use(express.static("./public"));

// Define the port
const PORT = process.env.PORT || 5000;

// Test route
app.get("/test", (req, res) => {
  res.send("Test API is working ...!");
});

// Import routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const contactRoutes = require("./routes/contactRoutes"); // Contact routes for the contact form
const reviewRoutes = require("./routes/reviewRoutes");

// Use routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/contact", contactRoutes); // Contact routes
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/reviews", reviewRoutes);

// Khalti Payment Verification Route
app.post("/api/payment/khalti/verify", async (req, res) => {
  const { token, amount } = req.body;

  if (!token || !amount) {
    return res.status(400).json({ message: "Token and Amount are required" });
  }

  try {
    // Call Khalti's payment verification API
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      { token, amount },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`, // Use your Khalti Secret Key
        },
      }
    );

    // If the response is successful
    if (response.status === 200) {
      return res.status(200).json({
        message: "Payment Verified Successfully",
        data: response.data,
      });
    } else {
      // Handle verification failure
      return res.status(400).json({
        message: "Payment Verification Failed",
        error: response.data,
      });
    }
  } catch (error) {
    console.error("Error verifying Khalti payment:", error);
    return res.status(500).json({ message: "Server Error during Khalti verification" });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Endpoint Not Found",
  });
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server-app is running on port ${PORT}`);
});

module.exports = app;
