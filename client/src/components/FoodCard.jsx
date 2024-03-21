import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../helper";
import { setCart } from "../redux/slices/CartSlice";

const FoodCard = ({
  id,
  name,
  price,
  desc,
  img,
  rating,
  handleToast, 
  userRole,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const addToCart = async ({ id, name, img, price, rating, quantity }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/add-to-cart/${user._id}`,
      {
        id,
        image: img,
        name,
        price,
        rating,
        quantity,
      }
    );
    const data = await res.data;
    toast.success(data.message);
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };


  const editItem = async ({ id, name, img, price }) => {
    // Open a form or modal for editing with current values populated
    const newName = prompt('Enter new name:', name);
    const newPrice = prompt('Enter new price:', price);
  
    try {
      // Send a request to update the food item details
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/update-menu-item/${id}`,
        {
          name: newName,
          img,
          price: parseInt(newPrice), // Assuming price is a number
        }
      );
      const data = res.data;
      toast.success(data.message);
      // Optionally, update the UI with the new details
      // You can reload the page or update the state with the new values
      window.location.reload();
    } catch (error) {
      console.error('Failed to update item: ', error);
      toast.error('Failed to update item');
    }
  };


  const deleteItem = async () => {
    console.log(id)
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/remove-menu-item/${id}`
      );
      const data = res.data;
      toast.success(data.message);
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete item: ', error);
      toast.error('Failed to delete item');
    }
  };



  return (
    <div className="font-bold w-[250px] bg-white p-5 flex flex-col rounded-lg gap-2">
      <img
        src={img}
        alt=""
        className="w-auto h-[130px]  hover:scale-110 cursor-grab transition-all duration-500 ease-in-out "
      />
      <div className="text-sm flex justify-between">
        <h2>{name}</h2>
        <span className="text-green-500 ">₹{price}</span>
      </div>
      {/* <p className="text-sm font-normal">{desc.slice(0, 50)}...</p> */}
      <div className="flex justify-center  items-center">
        {/* <span className="flex justify-center items-center">
          <AiFillStar className="mr-1 text-yellow-400" /> {rating}
        </span> */}

        {userRole === "admin" ? (
          <>
            <button
               onClick={() => {
                !user
                  ? toast.error("Please login to add to cart")
                  : editItem({ id, name, img, price, rating, quantity: 1 });
              }}
              className="p-1 text-white bg-red-500 hover:bg-red-600 rounded-lg text-sm ">
              Edit
            </button>
            <button
              onClick={() => {
                !user
                  ? toast.error("Please login to add to cart")
                  : deleteItem();
              }}
              className="p-1 text-white bg-red-500 hover:bg-red-600 rounded-lg text-sm ">
              Delete
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              !user
                ? toast.error("Please login to add to cart")
                : addToCart({ id, name, img, price, rating, quantity: 1 });
            }}
            className="p-1 text-white bg-green-500 hover:bg-green-600 rounded-lg text-sm ">
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
