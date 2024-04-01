const mongoose = require("mongoose");
const Food = require("./Food");
// const cartItemSchema = new mongoose.Schema({
//   food: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Food"
//   },
//   quantity: Number 
// });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true
  },
  items: [{
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food", required: true
    },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 }

});



// Define a pre hook for the save operation
cartSchema.pre('save',async  function(next) {
  // Calculate total quantity and total price
  // const totalQuantity = this.items.reduce((total, item) => total + item.quantity, 0);
  // const totalPrice = this.items.reduce((total, item) => total + (item.quantity * item.food.price), 0);



  let totalPrice = 0;

  // Fetch the corresponding Food documents and calculate the total price
  for (const item of this.items) {
    const food = await Food.findById(item.food);
    if (food) {
      totalPrice += item.quantity * food.price;
    }
  }

  let totalQuantity = this.items.reduce((total, item) => total + item.quantity, 0);



  // Update the cart document
  this.totalQuantity = totalQuantity;
  this.totalPrice = totalPrice;

  next();
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
