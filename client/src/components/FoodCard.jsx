import axios from "axios";
import React, { useState } from "react";
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
  image,
  category,
  rating,
  handleToast,
  fetchDataCallback,
  // userRole,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: name,
    price: price,
    image: image,
    category: category,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addToCart = async ({ id, name, image, price, rating, quantity }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/add-to-cart/${user._id}`,
      {foodId: id, quantity: 1 
        // id,
        // image,
        // name,
        // price,
        // rating,
        // quantity,
      }
    );
    const data = await res.data;
    toast.success(data.message);
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };






  

  const editItem = async (e) => {
    // Open a form or modal for editing with current values populated
    // const newName = prompt('Enter new name:', name);
    // const newPrice = prompt('Enter new price:', price);
    e.preventDefault();

    try {
      // Send a request to update the food item details
      const { name, price, image, category } = editFormData;
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/update-menu-item/${id}`,
        {
          name,
          price,
          image,
          category,

          // name: newName,
          // img,
          // price: parseInt(newPrice), // Assuming price is a number
        }
      );
      const data = res.data;
      toast.success(data.message);
      // Optionally, update the UI with the new details
      // You can reload the page or update the state with the new values
      // window.location.reload();
      fetchDataCallback();
      setShowEditModal(false); // Close the edit modal after successful edit

    } catch (error) {
      console.error("Failed to update item: ", error);
      toast.error("Failed to update item");
    }
  };
  function handleDeleteModal() {
    setShowDeleteModal(true);
  }

  function handleEditModal() {
    // setEditFormData({ name, price, image: img, category: "" });
    setShowEditModal(true);
  }

  const deleteItem = async (fetchDataCallback) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/remove-menu-item/${id}`
      );
      const data = res.data;
      toast.success(data.message);
      // window.location.reload();
      fetchDataCallback();
    } catch (error) {
      console.error("Failed to delete item: ", error);
      toast.error("Failed to delete item");
    }
  };

  return (
    <>
     <div class=" m-2 flex w-1/4 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md ">
  <div class=" mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
    <img class="object-cover w-full h-full" src={image} alt="product image" />
  </div>
  <div class="mt-4 px-5 pb-5">
    <h5 class="text-xl tracking-tight text-slate-900 font-semibold">{name}</h5>
    <div class="mt-2 mb-5 flex items-center justify-between">
      <p>
        <span class="text-3xl font-bold text-green-500">₹{price}</span>
      </p>
    </div>
    <div class="flex items-center justify-between gap-x-3">
      {isAdmin ? (
        <>
          <button
            onClick={handleEditModal}
            class="px-3 py-1 text-white bg-red-500 hover:bg-red-600  transition-all duration-200  rounded-md text-xl w-40">
            Edit
          </button>
          <button
            onClick={handleDeleteModal}
            class="px-3 py-1 text-white bg-red-500 hover:bg-red-600  transition-all duration-200 rounded-md text-xl w-40">
            Delete
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            !user
              ? toast.error("Please login to add to cart")
              : addToCart({ id, name, image, price, rating, quantity: 1 });
          }}
          class="px-3 py-1 text-white bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-md text-xl  w-56  mx-auto">
          Add to cart
        </button>
      )}
    </div>
  </div>
</div>



      {showEditModal && (
        <form onSubmit={editItem} className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-1/3">
            <h2 className="text-lg font-bold mb-4">Edit Item</h2>

            <label htmlFor="name">Name of Item</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
              placeholder="Name of Item"
              id="name"
              name="name"
              value={editFormData.name}
              onChange={handleEditChange}></input>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
              placeholder="Enter Price here"
              id="price"
              name="price"
              value={editFormData.price}
              onChange={handleEditChange}></input>

            <label htmlFor="imageUrl">Image Url</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
              placeholder="https://example.com/image.jpg"
              id="imageUrl"
              name="image"
              value={editFormData.image}
              onChange={handleEditChange}></input>

            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={editFormData.category}
              onChange={handleEditChange}>
              <option value="">Select Category</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
              <option value="Breakfast">Breakfast</option>
            </select>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                type="submit">
                Confirm
              </button>
            </div>
          </div>
        </form>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-8 py-6">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete {name}?
            </h2>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg focus:outline-none"
                onClick={() => deleteItem(fetchDataCallback)}>
                Delete
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-lg focus:outline-none"
                onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodCard;
