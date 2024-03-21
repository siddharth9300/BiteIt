// menuModel.js

const mongoose = require('mongoose');

// Define the schema for the Menu
const menuSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // desc: {
  //   type: String,
  //   required: true
  // },
  category: {
    type: String,
    required: true
  },
  // rating: {
  //   type: Number,
  //   required: true
  // }
});

// Create the Menu model based on the schema
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
