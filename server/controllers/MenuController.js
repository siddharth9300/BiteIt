// menuController.js

// Import any required models or modules
const Food = require('../models/Food'); // Assuming you have a Food model



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
    const { name, description, price } = req.body;
    // Create a new menu item
    const food = await Food.create({
      name,
      description,
      price
    });
    res.status(201).json({ success: true, data: food });
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
    const { name, description, price } = req.body;
    // Find and update the menu item by ID
    const food = await Food.findByIdAndUpdate(foodId, {
      name,
      description,
      price
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
