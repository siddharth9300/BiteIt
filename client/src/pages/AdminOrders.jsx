import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you use axios for making HTTP requests

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

    // Fetch all orders from the backend server
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/ordersByAdmin`); // Adjust the endpoint based on your backend routes
        setOrders(response.data.data); // Assuming the orders data is nested under a "data" key
        console.log('Orders:', response.data.data);
        console.log('Orders:', response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    useEffect(() => {

    fetchOrders();
  }, []);


  
  const updateStatus = async (orderId) => {
    try {
      // Update order status to "complete"
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/updateOrder/${orderId}`, { status: 'completed' });
      // Refresh orders after update
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };


  return (
    <>
    {/* <div className="container mx-auto">
    <h2 className="text-2xl font-semibold mb-4">All Orders (Admin)</h2>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map(order => (
        <div key={order._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-2">
         <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3> 
            <p className="text-gray-600">User: {order.user.name}</p>
            <p className="text-gray-600">Total Price: {order.totalPrice}</p>
            <p className="text-gray-600">Status: {order.status}</p>
            <h4 className="text-lg font-semibold mt-4">Items:</h4>
            <ul>
              {order.items.map(item => (
                <li key={item.food._id}>
                      <img src={item.food.image} alt={item.food.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />

                  <p>Name: {item.food.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div> */}




  <div className="container mx-auto">
    <h2 className="text-2xl font-semibold mb-4">All Orders (Admin)</h2>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">


  {orders.map(order => (

// <div key={order._id} class="flex justify-center items-center h-screen  text-gray-900"> 
<div key={order._id} class="  text-gray-900">
  <div class="rounded-md relative w-full h-full shadow-2xl p-3 bg-white">
    <div class="py-2">
      <div class="text-center text-xl font-bold">ORDER</div>
      <div class="text-center text-xs font-bold">The order details</div>
    </div>
    <div class="text-center text-xs font-bold mb-1">~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
    <div class="text-xs pl-2">
      <div class="text-xs mb-1">Customer：{order.user.name}</div>
      {/* <div class="text-xs mb-1">TelePhone：NULL to be added</div> */}
      <div>OrderNumber：{order._id}</div>
    </div>
    <div class="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-gray-900 my-3">
      <div class="flex text-sm justify-between pt-1 px-1">
        <span class="w-4/12 ">Name</span>
        <span class="w-2/12 text-center">Price</span>
        <span class="w-1/12 text-center"> X</span>
        <span class="w-2/12 text-center">Quantity</span>
        <span class="w-3/12 text-right">Amount</span>
      </div>
      <div class="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1">
      {order.items.map(item => (
        <div key={item.food._id} class="flex justify-between text-sm">
          <span class="w-4/12 ">{item.food.name}</span>
          <span class="w-2/12 text-center">₹{item.food.price}</span>
          <span class="w-1/12 text-center"> X</span>
          <span class="w-2/12 text-center">{item.quantity} </span>
          <span class="w-3/12 text-right">₹{item.quantity * item.food.price} </span>
        </div>
        ))}
    
      </div>
      <div class="flex text-sm justify-between pt-1 px-1">
        <span class="w-4/12 "></span>
        <span class="w-2/12 text-center"></span>
        <span class="w-1/12 text-center"> </span>
        <span class="w-2/12 text-center">{order.totalQuantity}</span>
        <span class="w-3/12 text-right">₹ {order.totalPrice}</span>
      </div>
    </div>
    <div class="text-xs">
      {/* <div class="mb-1">Discount：₹ null to be added</div> */}
      {/* <div class="mb-auto">Remark：to be added</div> */}
      <div class="mb-1 text-xl font-bold">Status: {order.status}   </div>
      {order.status !== "complete" && (
    <button
      className="p-1 text-white bg-green-500 hover:bg-green-600 rounded-lg text-xl"
      onClick={() => updateStatus(order._id)}
    >
      Mark as Complete
    </button>
  )}
      <div class="text-right mt-20">
        
        <div>Time：{order.createdAt}</div>
        <div class="font-bold text-sm">Total Quantity {order.totalQuantity}</div>
        <div class="font-bold text-sm">Total Amount：₹ {order.totalPrice}</div>
      </div>
    </div>
  </div>
</div>
  ))}
  </div>
  </div>

    </>

);
};

export default AdminOrders;
