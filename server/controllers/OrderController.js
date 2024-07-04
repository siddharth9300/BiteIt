const Order = require('../models/Order');
const User = require("../models/User");

// Get all orders (accessible by admin)
const getOrdersByAdmin = async (req, res) => {
    const user = req.id;
  try {
    const orders = await Order.find()
    .populate('user')
    .populate('items.food'); // Populate the food details within items 
    
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get orders by user
const getOrdersByUser = async (req, res) => {
  const userId = req.id; // Assuming the user ID is stored in the request object
  console.log(userId);
  try {
    const orders = await Order.find({ user: userId }).populate('user')
    .populate('items.food');
  res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order by admin
const updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getOrdersByAdmin, getOrdersByUser, updateOrder };
