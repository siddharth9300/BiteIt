

const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items: [{
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food", required: true
    },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ["pending", "processing", "completed"],
    default: "pending"
  }
},
{ timestamps: true } // Add timestamps option for createdAt and updatedAt fields
);


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
