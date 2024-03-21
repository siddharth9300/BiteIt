const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    price: Number,
    category: String,
    totalPrice: Number,
    quantity: Number,
    rating: Number,
    image: String,
    userId: String,
  },
  { timestamps: true }
);

const Food = mongoose.model("food", foodSchema);
module.exports = Food;
