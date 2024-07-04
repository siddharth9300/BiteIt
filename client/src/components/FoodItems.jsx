import React from "react";
import FoodCard from "./FoodCard";
import FoodData from "../data/FoodData.js";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import  { useState, useEffect } from "react";

const FoodItems = () => {
  const [foodItems, setFoodItems] = useState([]);
  const category = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);
  const handleToast = (name) => toast.success(`Added ${name} `);
  // console.log("this is food item " + userRole);
  // const user = useSelector((state) => state.auth.user);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  // const isAdmin = user && typeof user.isAdmin === 'boolean' ? user.isAdmin : false;

// console.log(user.isAdmin);



  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: '' 
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddItemClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, image ,category} = formData;
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/add-menu-item`, {
        name,
        price,
        image,
        category
      });
      console.log('Menu item added successfully:', response.data);
      // You can add further actions here, like refreshing the menu items list
      toast.success("Menu item added successfully.");
      setFormData({ name: '', price: '', image: '', category: ''});
      setShowModal(false);
      fetchData();
      
    } catch (error) {
      console.error('Failed to add menu item:', error);
    }
  };








  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/get-menu-items`);
      setFoodItems(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };





  


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-wrap gap-10 justify-center lg:justify-start mx-6 my-10">

      {/* {user.isAdmin && */}
     { isAdmin &&
      
 <button 
 onClick={handleAddItemClick}
 className="p-1 top-[15vh] right-12 absolute  text-white bg-green-500 hover:bg-green-600 rounded-lg text-xl ">
Add Menu Item</button>
    }

<div className=" w-full  mx-auto flex-wrap justify-center  flex">

{foodItems
          .filter((food) => {
            // Filter based on category
            if (category === "All" || category === food.category) {
              // Filter based on search term
              return food.name && typeof food.name === 'string' && food.name.toLowerCase().includes(search.toLowerCase());
            }
            return false;
          }
        ).map((food) => (
          <FoodCard
            // userRole={userRole}
            key={food._id}
            id={food._id}
            name={food.name}
            price={food.price}
            desc={food.desc}
            rating={food.rating}
            category={food.category}
            image={food.image}
            handleToast={handleToast}
            fetchDataCallback={fetchData}

          />
        ))}

        </div>
      </div>



      {showModal && (
        <form onSubmit={handleSubmit} className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-1/3">
            <h2 className="text-lg font-bold mb-4">Edit Item</h2>

            <label htmlFor="name">Name of Item</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
              placeholder="Name of Item"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}></input>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
              placeholder="Enter Price here"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}></input>

            <label htmlFor="imageUrl">Image Url</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
              placeholder="https://example.com/image.jpg"
              id="imageUrl"
              name="image"
              value={formData.image}
              onChange={handleChange}></input>

            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={formData.category}
              onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Dessert ">Dessert</option>
            </select>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}>
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
    </>
  );
};

export default FoodItems;
