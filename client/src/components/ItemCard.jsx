import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import axios from "axios";
import { getCart } from "../helper";
import { setCart } from "../redux/slices/CartSlice";

const ItemCard = ({ cartId, quantity, _id ,food  }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);


  // console.log(id, name, quantity, price, image, _id);
  const removeFromCart = async (itemId) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/remove-from-cart/${cartId}/${itemId}`
    );
    const data = await res.data;
    toast.success(data.message);
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };

  const incrementQuantity = async (itemId) => {
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/increment-quantity/${cartId}/${itemId}`
    );
    const data = await res.data;
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };

  const decrementQuantity = async (itemId) => {
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/decrement-quantity/${cartId}/${itemId}`
    );
    const data = await res.data;
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };

  return (
    <div className="flex gap-2 shadow-md rounded-lg p-2 mb-3">
      <MdDelete
        onClick={() => {
          removeFromCart(_id);
        }}
        className="absolute right-7 text-gray-600 cursor-pointer"
      />
      <img src={food.image} alt="" className="w-[50px] h-[50px] " />
      <div className="leading-5">
        <h2 className="font-bold text-gray-800">{food.name}</h2>
        <div className="flex justify-between mt-2">
          <span className="text-green-500 font-bold">₹{food.price}</span>
          <div className="flex justify-center items-center gap-2 absolute right-7">
            <AiOutlineMinus
              onClick={() =>
                quantity > 1 ? decrementQuantity(_id) : (quantity = 0)
              }
              className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
            />
            <span>{quantity}</span>
            <AiOutlinePlus
              onClick={() =>
                quantity >= 1 ? incrementQuantity(_id) : (quantity = 0)
              }
              className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
