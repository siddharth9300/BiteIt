import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);

  // const cartItems = useSelector((state) => state.cart.cart);
  // console.log(cartItems);
  // const totalQty = cartItems ? cartItems.reduce((totalQty, item) => totalQty + item.quantity, 0) : 0;
  // const totalPrice = cartItems ? cartItems.reduce((total, item) => total + item.quantity * item.food.price, 0) : 0;
  

  const cartItems = useSelector((state) => state.cart.cart);
  console.log(cartItems);
  
  // Check if cartItems is an array
  const totalQty = Array.isArray(cartItems) ? cartItems.reduce((totalQty, item) => totalQty + item.quantity, 0) : 0;
  
  // Check if cartItems is an array and each item has the expected structure
  // const totalPrice = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.items[0].quantity * item.food.price, 0) : 0;
  

console.log(totalQty);
// console.log(cartItems.items[0].food.name);

  const navigate = useNavigate();

  const checkout = async () => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/checkout`);
    const {url}= await res.data;
    window.location.href = url;
  };

  return (
    <>
      <div
        className={`fixed right-0 top-0 w-full lg:w-[20vw] h-full p-5 bg-white mb-3 ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50`}
      >
        <div className="flex justify-between items-center my-3">
          <span className="text-xl font-bold text-gray-800">My Order</span>
          <IoMdClose
            onClick={() => setActiveCart(!activeCart)}
            className="border-2 border-gray-600 text-gray-600 font-bold  p-1 text-xl  rounded-md hover:text-red-300 hover:border-red-300 cursor-pointer"
          />
        </div>

        {cartItems && cartItems.items && cartItems.items.length > 0 ? (
          cartItems.items.map((item) => {
            // console.log(item.food.name);
            return <ItemCard key={item._id} cartId={cartItems._id }{...item}  />;
          })
        ) : (
          <h2 className="text-center text-xl font-bold text-gray-800">
            Your cart is empty
          </h2>
        )}

        <div className="absolute bottom-0 ">
          <h3 className="font-semibold text-gray-800">Items : {cartItems && cartItems.totalQuantity ? cartItems.totalQuantity : 0} </h3>
          <h3 className="font-semibold text-gray-800">
          Total Amount : {cartItems && cartItems.totalPrice ? cartItems.totalPrice : 0}
          </h3>
          <hr className="w-[90vw] lg:w-[18vw] my-2" />
          <button
            onClick={checkout}
            className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-[90vw] lg:w-[18vw] mb-5"
          >
            Checkout
          </button>
        </div>
      </div>
      <FaShoppingCart
        onClick={() => setActiveCart(!activeCart)}
        className={`rounded-full bg-white shadow-md text-5xl p-3 fixed bottom-4 right-4 ${
          totalQty > 0 && "animate-bounce delay-500 transition-all"
        } `}
      />
    </>
  );
};

export default Cart;
