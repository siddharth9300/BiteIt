import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.food._id === action.payload.food._id
      );
      if (existingItem) {
        // state.cart = state.cart.map((item) =>
        //   item.food.id === action.payload.food.id
        //     ? { ...item, quantity: item.quantity + 1 }
        //     : item
        // );
        existingItem.quantity++;

      } else {
        state.cart.push(action.payload);
      }
    },
    
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.food.id !== action.payload.id);
    },
    incrementQty: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.food.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
      );
    },
    decrementQty: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.food.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
      );
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty,setCart } =
  CartSlice.actions;
export default CartSlice.reducer;
