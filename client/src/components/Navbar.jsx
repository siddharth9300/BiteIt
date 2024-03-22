import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import NavList from "./NavList";
import axios from "axios";
import { loginUser, logoutUser, setUser } from "../redux/slices/AuthSlice";
import { getCart } from "../helper";
import { setCart } from "../redux/slices/CartSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ImSpoonKnife } from "react-icons/im";
axios.defaults.withCredentials = true;

const Navbar = () => {
  const dispatch = useDispatch();
  // const [toggleNav, setToggleNav] = useState(false);

  const auth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  const getUser = async () => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/get-user`, {
      withCredentials: true,
    });
    const data = await res.data;
    dispatch(setUser(data.user));
    dispatch(loginUser());
  };

  getCart(user).then((data) => dispatch(setCart(data.cartItems)));

  useEffect(() => {
    getUser();
  }, []);


  const handleLogout = async () => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/logout`);
    const data = await res.data;
    dispatch(logoutUser());
    toast.success(data.message);
    window.location.href = "/";
  };

  return (

<>

{/* 
    <nav className="flex flex-col lg:flex-row justify-between py-3 mx-6 mb-10">
      <div>
        <h3 className="text-xl font-bold text-gray-600">
          {new Date().toUTCString().slice(0, 16)}
        </h3>
        <h1 className="text-2xl font-bold ">Bite It</h1>
      </div>
      <div>
        <input
          type="search"
          name="search"
          id=""
          placeholder="Search here"
          autoComplete="off"
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="p-3 border border-gray-400 text-sm rounded-lg outline-none w-full lg:w-[25vw]"
        />
      </div>


      <GiHamburgerMenu
        className={`absolute top-5 right-5 lg:right-8 lg:top-6 text-2xl text-gray-600 cursor-pointer ${
          toggleNav && "hidden"
        } transition-all ease-in-out duration-500`}
        onClick={() => setToggleNav(true)}
      />
      <MdClose
        className={`absolute top-5 right-5 lg:right-8 lg:top-6 text-2xl text-gray-600 cursor-pointer ${
          !toggleNav && "hidden"
        } transition-all ease-in-out duration-500`}
        onClick={() => setToggleNav(false)}
      />
      <NavList toggleNav={toggleNav} setToggleNav={setToggleNav} auth={auth} />
    </nav> */}




    <header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg> */}
      <h1 className="text-3xl font-bold flex gap-2 "><ImSpoonKnife /> Bite It</h1>
    </a>


    
    <div class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <input
          type="search"
          name="search"
          id=""
          placeholder="Search here"
          autoComplete="off"
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="p-3 border border-gray-400 text-sm rounded-lg outline-none w-full lg:w-[25vw]"
        />
    </div>

    {auth &&  (
          <div className="flex flex-col">
          <Link to="/orders" className="hover:text-black select-none mr-10">
            My Orders
          </Link>
         
        </div>
      )}
    {/* <NavList auth={auth} /> */}

    <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    {auth ? (
        <li onClick={handleLogout} className="hover:text-black select-none list-none">Logout</li>
        ) : (
          <div className="flex flex-col">
          <Link to="/login" className="hover:text-black select-none">
            Login / Signup
          </Link>
          {/* <Link to="/signup" className="hover:text-black select-none">
            Signup{" "}
          </Link> */}
        </div>
      )}
     
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</header>








</>
  );
};

export default Navbar;
