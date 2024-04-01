import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you use axios for making HTTP requests

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from the backend server
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/ordersByUser`); // Adjust the endpoint based on your backend routes
        setOrders(response.data.data); // Assuming the orders data is nested under a "data" key
        console.log('Orders:', response.data.data);
        console.log('Orders:', response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Orders</h2>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map(order => (
        <div key={order._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-2">
            {/* <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3> */}
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
                  {/* Add more details if needed */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Orders;
