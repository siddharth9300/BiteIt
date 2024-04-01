// const mongoose = require("mongoose");

// const foodSchema = new mongoose.Schema(
//   {
//     // id: String,
//     name: String,
//     price: Number,
//     category: String,
//     totalPrice: Number,
//     quantity: Number,
//     rating: Number,
//     image: String,
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "user" // Assuming you have a User model
//     }
//   },
//   { timestamps: true }
// );

// const Food = mongoose.model("food", foodSchema);
// module.exports = Food;


const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;






