// menuController.js

// Import any required models or modules
const MenuItem = require('../models/MenuItem'); // Assuming you have a MenuItem model

// Controller function to add a new menu item
exports.addMenuItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    // Create a new menu item
    const menuItem = await MenuItem.create({
      name,
      description,
      price
    });
    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Controller function to remove a menu item
exports.removeMenuItem = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    // Remove the menu item by ID
    await MenuItem.findByIdAndDelete(menuItemId);
    res.status(200).json({ success: true, message: 'Menu item removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Controller function to update a menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const { name, description, price } = req.body;
    // Find and update the menu item by ID
    const menuItem = await MenuItem.findByIdAndUpdate(menuItemId, {
      name,
      description,
      price
    }, { new: true });
    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Controller function to delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    // Delete the menu item by ID
    await MenuItem.findByIdAndDelete(menuItemId);
    res.status(200).json({ success: true, message: 'Menu item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
