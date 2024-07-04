import React, { useEffect, useState } from "react";
// import FoodData from "../data/FoodData";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/slices/CategorySlice";
import axios from "axios";
const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
const [FoodItems, setFoodItems] = useState([]);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/get-menu-items`);
    const foodItems = response.data;
    const uniqueCategories = [...new Set(foodItems.map((food) => food.category))];
    setCategories(uniqueCategories);
    
  } catch (error) {
    console.error("Failed to fetch data: ", error);
  }
};
 

  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.category);

  return (
    <div className="ml-6">
      {/* <h3 className="text-xl font-semibold">Find the best food</h3> */}

      <div className="my-5 mx-auto justify-center flex gap-3">

        <button
          onClick={() => dispatch(setCategory("All"))}
          className={`px-3 py-2 bg-gray-200 font-bold rounded-lg hover:bg-green-500 hover:text-white ${
            selectedCategory === "All" && "bg-green-500 text-white"
          }`}
        >
          All
        </button>
        {categories.map((category, index) => {
          return (
            <button
              onClick={() => dispatch(setCategory(category))}
              key={index}
              className={`px-3 py-2 bg-gray-200 font-bold rounded-lg hover:bg-green-500 hover:text-white ${
                selectedCategory === category && "bg-green-500 text-white"
              } `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenu;
