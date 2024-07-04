// AdminDashboard.js


import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ManageMenu from "../components/ManageMenu"; // A component for managing menu items
import ManageUsers from "../components/ManageUsers"; // A component for managing users
import Cart from "../components/Cart";
import AdminOrders from "./AdminOrders";
import { MdRestaurantMenu } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";

const AdminDashboard = () => {



  const [activeComponent, setActiveComponent] = useState("manageMenu");

  // Function to handle component change
  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  // Render the active component based on the state
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "manageMenu":
        return <ManageMenu />;
      case "manageUsers":
        return <ManageUsers />;
      case "orders":
        return <AdminOrders />;
      default:
        return null;
    }
  };
    
  return (
    <>
       {/* <Navbar /> */}
      <h1 className="text-4xl flex justify-center font-bold mt-4">Admin Dashboard</h1>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/6 h-100%  ">
          {/* Button for Manage Menu */}
          <button
            className="w-full p-2 mb-2 bg-green-600 text-white rounded-r flex"
            onClick={() => handleComponentChange("manageMenu")}
          ><MdRestaurantMenu className="flex text-xl mr-4 ml-2"/>
            Manage Menu
          </button>
          {/* Button for Manage Users */}
          <button
            className="w-full p-2 mb-2 bg-green-600 text-white  rounded-r flex"
            onClick={() => handleComponentChange("manageUsers")}
          >          <FaUsers className="flex text-xl mr-4 ml-2"/>

            Manage Users
          </button>
          {/* Button for Orders */}
          <button
            className="w-full p-2 mb-2 bg-green-600 text-white  rounded-r flex"
            onClick={() => handleComponentChange("orders")}
            >          <BiFoodMenu className="flex text-xl mr-4 ml-2"/>
            Orders
          </button>
        </div>
        {/* Main Content */}
        <div className="w-3/4 p-4">{renderActiveComponent()}</div>
      </div>
      {/* <Cart />  */}
   
    </>
  );
};

export default AdminDashboard;
