import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import { useSelector } from "react-redux"; // Import the useSelector hook
import AdminDashboard from "./pages/AdminDashboard";
import Orders from "./pages/Orders";
const App = () => {
  console.log(import.meta.env.VITE_SERVER_URL);

  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.isAdmin);
console.log(isAdmin);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route
          path="/success"
          element={<ProtectedRoute element={<Success />} />}
        /> */}
          <Route path="/" element={isAdmin ? <AdminDashboard /> : <Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
