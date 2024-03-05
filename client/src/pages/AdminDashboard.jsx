// AdminDashboard.js

import React from "react";
import Navbar from "../components/Navbar";
// import ManageMenu from "../components/ManageMenu"; // A component for managing menu items
// import ManageUsers from "../components/ManageUsers"; // A component for managing users
import Cart from "../components/Cart";

const AdminDashboard = () => {
    
  return (
    <>
      <Navbar />
    {/* //   <ManageMenu /> 
    //   <ManageUsers />  */}
      <Cart /> 
    </>
  );
};

export default AdminDashboard;
