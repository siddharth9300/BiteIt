const Food = require("../models/Food");
const User = require("../models/User");
const Order = require('../models/Order'); // Import the Order model
const Cart = require("../models/Cart"); // Import the Cart model

const stripe = require("stripe")(process.env.STRIPE_KEY);

// // ADD TO CART ROUTE
// const addToCart = async (req, res) => {
//   const userId = req.params.id;
//   const { id, name, price, rating, image, quantity } = req.body;

//   try {
//     let existingItem = await Food.findOne({ id, userId: userId });

//     if (existingItem) {
//       let updatedItem = await Food.findOneAndUpdate(
//         { id, userId },
//         {
//           $set: {
//             quantity: existingItem.quantity + 1,
//             totalPrice: existingItem.price * (existingItem.quantity + 1),
//           },
//         },
//         {
//           upsert: true,
//           new: true,
//         }
//       );

//       if (!updatedItem) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Failed to add to cart" });
//       }

//       return res.status(200).json({ success: true, message: "Added to cart" });
//     }

//     let newFood = await Food.create({
//       id,
//       name,
//       price,
//       rating,
//       image,
//       quantity,
//       userId,
//       totalPrice: price * quantity,
//     });

//     const savedFood = await newFood.save();

//     let user = await User.findOneAndUpdate(
//       { _id: userId },
//       {
//         $push: {
//           cartItems: savedFood._id,
//         },
//       }
//     );

//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Failed to add to cart" });
//     }

//     return res.status(200).json({ success: true, message: "Added to cart" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // GET CART ITEMS ROUTE
// const getCart = async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const cartItems = await Food.find({ userId });

//     if (!cartItems) {
//       return res
//         .status(400)
//         .json({ success: false, message: "No items found" });
//     }

//     return res.status(200).json({ success: true, cartItems });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // REMOVE FROM CART ROUTE
// const removeFromCart = async (req, res) => {
//   const id = req.params.id;

//   try {
//     let food = await Food.findOneAndDelete({ _id: id });

//     if (!food) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Food not found" });
//     }
//     return res
//       .status(200)
//       .json({ success: true, message: "Food Removed from cart" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // INCREMENT QUANTITY ROUTE
// const incrementQuantity = async (req, res) => {
//   const id = req.params.id;

//   try {
//     let food = await Food.findOneAndUpdate(
//       { _id: id },
//       [
//         {
//           $set: {
//             quantity: { $add: ["$quantity", 1] },
//             totalPrice: { $multiply: ["$price", { $add: ["$quantity", 1] }] },
//           },
//         },
//       ],
//       {
//         upsert: true,
//         new: true,
//       }
//     );

//     if (!food) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Food not found" });
//     }

//     return res
//       .status(200)
//       .json({ success: true, message: "Food quantity incremented", food });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // DECREMENT QUANTITY ROUTE
// const decrementQuantity = async (req, res) => {
//   const id = req.params.id;

//   try {
//     let food = await Food.findOneAndUpdate(
//       { _id: id, quantity: { $gt: 0 } },
//      [ {
//         $set: {
//           quantity: { $subtract: ["$quantity", 1] },
//           totalPrice: { $subtract: ["$totalPrice", "$price"] },
//         },
//       }],
//       {
//         upsert: true,
//         new: true,
//       }
//     );

//     if (!food) {
//       return res.status(400).json({
//         success: false,
//         message: "Food not found or quantity already at the maximum",
//       });
//     }
//     return res
//       .status(200)
//       .json({ success: true, message: "Food quantity decremented", food });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };


























// const Food = require("../models/Food");
// const User = require("../models/User");
// const Cart = require("../models/Cart"); // Import the Cart model

// ADD TO CART ROUTE
const addToCart = async (req, res) => {
  const userId = req.params.id;
  const { foodId, quantity } = req.body; // Assuming the request body contains foodId and quantity

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Check if the food item exists
    const foodItem = await Food.findById(foodId);
    if (!foodItem) {
      return res.status(400).json({ success: false, message: "Food item not found" });
    }




    // const totalPrice = quantity * foodItem.price;







// Check if a cart exists for the user
let cart = await Cart.findOne({ user: userId }).populate('items.food');
// totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.food.price, 0);

// If no cart exists for the user, create a new one
if (!cart) {
  cart = new Cart({
    user: userId,
    items: [{ food: foodId, quantity }],
    // totalPrice: items ? items.reduce((total, item) => total + item.quantity * item.food.price, 0) : 0
    totalPrice: quantity * foodItem.price,  // Assuming food is properly defined
    totalQuantity: quantity

    // totalPrice: totalPrice
    // totalPrice: quantity * food.price
  });

} 

else {
  // Check if the item already exists in the cart
  const existingItem = cart.items.find(item => item.food.equals(foodId));

  // let totalPriceChange = 0;
  // let totalQuantityChange = 0;


  // If the item exists in the cart, update its quantity
  if (existingItem) {
    existingItem.quantity += quantity;
    // totalPriceChange = quantity * foodItem.price;
    // totalQuantityChange = quantity;

  } else {
    // If the item does not exist in the cart, add it
    cart.items.push({ food: foodId, quantity });
    // totalPriceChange = quantity * foodItem.price;
    // totalQuantityChange = quantity;

  }

  // Update totalPrice
  // cart.totalPrice = totalPrice;
  // cart.totalPrice += totalPriceChange;
  // cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);

  // cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.food.price, 0);

  console.log('Quantity:', quantity);
  console.log('Food Item Price:', foodItem.price);
}

// Save the cart
await cart.save();






    return res.status(200).json({ success: true, message: "Added to cart", cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET CART ITEMS ROUTE
const getCart = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find all cart items for the user 
    // const cartItems = await Cart.find({ user : userId }).populate("foodId");



    const cartItems = await Cart.findOne({ user: userId }).populate("items.food");

console.log(cartItems);

    return res.status(200).json({ success: true, cartItems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// REMOVE FROM CART ROUTE
const removeFromCart = async (req, res) => {
  // const userId = req.params.userId;
  // const foodId = req.params.foodId;
  const cartId = req.params.cartId;
  const itemId = req.params.itemId;
  console.log(itemId);  
console.log(cartId);
  try {
    // Find the cart item and delete it
    // await Cart.findOneAndDelete({  itemId });

    const result = await Cart.findOneAndUpdate(
      { "items._id": itemId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );
    
   


    await result.save();
    


    return res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// INCREMENT QUANTITY ROUTE
const incrementQuantity = async (req, res) => {
  const cartId = req.params.cartId;
  const itemId = req.params.itemId;
  // const userId = req.params.userId;
  // const foodId = req.params.foodId;

  try {


      // Find the cart item and increment the quantity
      let cartItem = await Cart.findOneAndUpdate(
        { _id: cartId, "items._id": itemId },
        { $inc: { "items.$.quantity": 1 } },
        { new: true }
      );


    // // Find the cart item and increment the quantity
    // let cartItem = await Cart.findOne({ userId, foodId });
    // if (!cartItem) {
    //   return res.status(400).json({ success: false, message: "Cart item not found" });
    // }

    // cartItem.quantity++;
    // // cartItem.totalPrice = cartItem.quantity * cartItem.foodId.price;
    await cartItem.save();

    return res.status(200).json({ success: true, message: "Quantity incremented", cartItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DECREMENT QUANTITY ROUTE
const decrementQuantity = async (req, res) => {
  const cartId = req.params.cartId;
  const itemId = req.params.itemId;

  try {


    
      // Find the cart item and increment the quantity
      let cartItem = await Cart.findOneAndUpdate(
        { _id: cartId, "items._id": itemId },
        { $inc: { "items.$.quantity": -1 } },
        { new: true }
      );


    // // Find the cart item and decrement the quantity
    // let cartItem = await Cart.findOne({ userId, foodId });
    // if (!cartItem) {
    //   return res.status(400).json({ success: false, message: "Cart item not found" });
    // }

    // if (cartItem.quantity === 1) {
    //   // If quantity is already 1, remove the item from the cart
    //   await Cart.findOneAndDelete({ userId, foodId });
    //   return res.status(200).json({ success: true, message: "Item removed from cart" });
    // }

    // cartItem.quantity--;
    // cartItem.totalPrice = cartItem.quantity * cartItem.foodId.price;
    await cartItem.save();

    return res.status(200).json({ success: true, message: "Quantity decremented", cartItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// module.exports = { addToCart, getCart, removeFromCart, incrementQuantity, decrementQuantity };












// // CHECKOUT ROUTE
// const checkout = async (req, res) => {
//   const userId = req.id;

//   try {
//     const cartItems = await Food.find({ userId });
    
//     const order = new Order({
//       userId: userId,
//       items: cartItems.map(item => ({
//         // foodId: item._id,
//         quantity: item.quantity
//       }))
//     });

//     // Save order to database
//     await order.save();


//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",  
//       line_items: cartItems.map((item) => {
//         return {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: item.name,
//               images: [item.image],
//             },
//             unit_amount: item.price * 100,
//           },

//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${process.env.CLIENT_URL}/success`,
//       //  "https://flavoro-clone.vercel.app/success",
//       cancel_url: `${process.env.CLIENT_URL}`,
//       // "https://flavoro-clone.vercel.app/",
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // CLEAR CART ROUTE
// const clearCart = async (req, res) => {
//   const userId = req.id;

//   try {
//     const deletedItems = await Food.deleteMany({ userId });
//     const deletedList = await User.findOneAndUpdate(
//       { _id: userId },
//       {
//         cartItems: [],
//       }
//     );

//     if (!deletedItems) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Failed to clear cart" });
//     }

//     return res.status(200).json({ success: true, message: "Order Confirmed" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };








// CHECKOUT ROUTE
const checkout = async (req, res) => {
  const userId = req.id;

  try {
    // const userId = req.id;
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.food');
    console.log('Cart Items:', cart.items); // Add this logging

    // // Create an order object based on the cart items
    // const order = new Order({
    //   user: userId,
    //   items: cart.items.map(item => ({
    //     food: item.food._id,
    //     quantity: item.quantity
    //   })),
    //   totalPrice: cart.totalPrice,
    //   totalQuantity: cart.totalQuantity,
    //   status: "processing" // or you can set it to "processing" if you prefer
    // });

    // // Save the order to the database
    // await order.save();

    // Create a session for Stripe checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.items.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.food.name,
              images: [item.food.image],
            },
            unit_amount: item.food.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });

    // Clear the user's cart after checkout
    // cart.items = [];
    // cart.totalPrice = 0;
    // cart.totalQuantity = 0;
    // await cart.save();

    res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// CLEAR CART ROUTE
const clearCart = async (req, res) => {
  const userId = req.id;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.food');

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Create an order object based on the cart items only if the cart is not empty
    if (cart.items.length > 0) {
      const order = new Order({
        user: userId,
        items: cart.items.map(item => ({
          food: item.food._id,
          quantity: item.quantity
        })),
        totalPrice: cart.totalPrice,
        totalQuantity: cart.totalQuantity,
        status: "processing"
      });

      // Save the order to the database
      await order.save();
    }

    // Clear the cart items
    cart.items = [];
    cart.totalPrice = 0;
    cart.totalQuantity = 0;
    await cart.save();

    return res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
















module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  checkout,
  clearCart,
};
