import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuth: false,
    isAdmin: false, // Add isAdmin property

  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuth = true;
      state.isAdmin = action.payload.isAdmin; // Set isAdmin based on payload

    },
    logoutUser: (state, action) => {
      state.user = null;
      state.isAuth = false;
      state.isAdmin = false; // Reset isAdmin to false on logout

    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAdmin = action.payload.isAdmin; // Set isAdmin based on payload

    },
  },
});

export const { loginUser, logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;
