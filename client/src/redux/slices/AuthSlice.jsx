import { createSlice } from "@reduxjs/toolkit";



const getInitialState = () => {
  const storedState = localStorage.getItem("authState");
  return storedState
    ? JSON.parse(storedState)
    : {
        user: null,
        isAuth: false,
        isAdmin: false,
      };
};


const authSlice = createSlice(
  
  {
  name: "auth",
  initialState: getInitialState(),

  // initialState: {
  //   user: null,
  //   isAuth: false,
  //   isAdmin: false, // Add isAdmin property

  // },
  
  reducers: {
    loginUser: (state, action) => {
      state.isAuth = true;
      state.isAdmin = action.payload.isAdmin; // Set isAdmin based on payload
      state.user = action.payload.user;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.isAuth = false;
      state.isAdmin = false; // Reset isAdmin to false on logout
      localStorage.setItem("authState", JSON.stringify(state));
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAdmin = action.payload.isAdmin; // Set isAdmin based on payload
      localStorage.setItem("authState", JSON.stringify(state));
    },
  },
});

export const { loginUser, logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;
