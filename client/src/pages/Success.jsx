import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
axios.defaults.withCredentials = true;
import { useNavigate  } from "react-router-dom"; // Import useHistory from react-router-dom

const Success = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate (); // Initialize useHistory hook

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const clearCart = async () => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/clear-cart`);
    const data = await res.data;
    toast.success(data.message);
  };

  useEffect(() => {
    clearCart();


    const timeoutId = setTimeout(() => {
      navigate("/orders");
    }, 10000);

    return () => clearTimeout(timeoutId);

  }, [navigate]);

  return (

    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <PropagateLoader color="#36d7b7" />
      ) : (
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Order Successful!
          </h2>
          <p>Your order has been sucessfully placed</p>
        </div>
      )}
    </div>
  );
};

export default Success;
