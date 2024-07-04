import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/AuthSlice";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const[isLoading, setIsLoading] = useState(false); // Add this line
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/login`, {
      email,
      password,
    });
    const data = await res.data;
    console.log(data);

    // if (res.status === 200) {
      if (res.status === 200 ) {
        // console.log(data.user.isAdmin);
      dispatch(loginUser({ user: data.user, isAdmin: data.user.isAdmin }));
      toast.success(data.message);
      setIsLoading(false);
      navigate("/");
    }
  };

  return (
    <>{isLoading ? (
      <LoadingSpinner />
    ) :
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg p-5 shadow-lg flex flex-col gap-3 w-[80vw] lg:w-[20vw] text-sm"
      >
        <input
          type="email"
          name="email"
          id="email"
          className="outline-none border rounded-md px-3 py-2 focus:border-green-300 text-gray-600"
          autoComplete="off"
          placeholder="johndoe@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="outline-none border rounded-md px-3 py-2 focus:border-green-300 text-gray-600"
          autoComplete="off"
          placeholder="********"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link
          to="/forgot-password"
          className="text-xs text-gray-600 hover:underline cursor-pointer -mb-1"
        >
          Forgot Password
        </Link>
        <button
          type="submit"
          className="outline-none border rounded-md px-3 py-2 text-white bg-green-500 hover:bg-green-300"
        >
          Login{" "}
        </button>
        <p className="text-xs text-gray-600 flex gap-2 -mt-1">
          <span>Or</span>
          <Link to="/signup" className="hover:text-green-600">
            Create your account
          </Link>
        </p>
      </form>
    </div>
    }
    </>
  );
};

export default Login;
