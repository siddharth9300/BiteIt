import React, { useState } from 'react';
import CategoryMenu from './CategoryMenu'
import FoodItems from './FoodItems'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const ManageMenu = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user.isAdmin)

 

  return (
    <>
     <h1 className='text-4xl font-bold my-5 flex justify-center'>Menu</h1>
    {/* <button 
    onClick={handleAddItemClick}
    className="p-1 right-5 absolute  text-white bg-green-500 hover:bg-green-600 rounded-lg text-xl ">
Add Menu Item</button> */}
    <CategoryMenu />
    <FoodItems userRole={user.isAdmin} />
   



    </>
  )
}

export default ManageMenu