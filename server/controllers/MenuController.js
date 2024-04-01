// menuController.js

// Import any required models or modules
const Food = require('../models/Food'); // Assuming you have a Food model
// const User = require('../models/User'); // Assuming you have a User model
const Order = require('../models/Order'); // Import the Order model

exports.getMenuItems = async (req, res) => {
  try {
    // Query menu items from the MongoDB database
    const food = await Food.find();
    res.json(food);
    // console.log('food:', food);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to add a new menu item
exports.addMenuItem = async (req, res) => {
  try {
    const { name, category, price ,image } = req.body;
    // Create a new menu item
    console.log(req.body)
    const food = await Food.create({
      name : name,
      category : category,
      price : price,
      image: image,
    });
    res.status(201).json({ success: true, data: food ,message: 'Menu item added successfully' });
    console.log('food:', food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Controller function to remove a menu item
exports.removeMenuItem = async (req, res) => {
  try {
    const foodId = req.params.id;
    console.log('foodId:', foodId);
    // Remove the menu item by ID
    await Food.findByIdAndDelete(foodId);
    res.status(200).json({ success: true, message: 'Menu item removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Controller function to update a menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const foodId = req.params.id;
    const { name, category, price ,image } = req.body;
    // Find and update the menu item by ID
    const food = await Food.findByIdAndUpdate(foodId, {
      name,
      category,
      price,
      image,
    }, { new: true });
    res.status(200).json({ success: true, data: food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Controller function to delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const foodId = req.params.id;
    // Delete the menu item by ID
    await Food.findByIdAndDelete(foodId);
    res.status(200).json({ success: true, message: 'Menu item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


// // Controller function to get orders for a specific user
// exports.getUserOrders = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Assuming userId is passed in the request
//     // Query orders for the specific user from the MongoDB database
//     const userOrders = await Order.find({ userId: userId });
//     res.json(userOrders);
//   } catch (error) {
//     console.error('Error fetching user orders:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Controller function to get all orders for admin
// exports.getAllOrdersForAdmin = async (req, res) => {
//   try {
//     // Query all orders from the MongoDB database and populate all fields
//     const orders = await Order.find().populate('userId').populate('items._id');
//     console.log('orders:', orders);
//     res.json(orders);
//   } catch (error) {
//     console.error('Error fetching all orders for admin:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };



// const Order = require('../models/Order');

// Controller function to get orders for a specific user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed in the request
    // Query orders for the specific user from the MongoDB database
    const userOrders = await Order.find({ user: userId }).populate('items.food');
    res.json(userOrders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get all orders for admin
exports.getAllOrdersForAdmin = async (req, res) => {
  try {
    // Query all orders from the MongoDB database and populate all fields
    const orders = await Order.find().populate('user').populate('items.food');
    console.log('orders:', orders);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders for admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
