// ManageUsers.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getAllUsers`);
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Customers (Admin)</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <div key={user._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-2">
              <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
              <p className="text-gray-600">Email: {user.email}</p>
              {/* Add more details if needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
