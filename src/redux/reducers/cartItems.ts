import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "../../types/inteface";

const initialState: { carts: Meal[] } = {
  carts: [],
};

const cartItems = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItemsToCart(state, action: PayloadAction<Meal>) {
      state.carts = [...state.carts, action.payload];
    },
    removeItemsFromCart(state, action: PayloadAction<string | string[]>) {
      // removing items from array by individual product checkout or checking out multiple products in cart section
      state.carts = state.carts.filter((item) =>
        Array.isArray(action.payload)
          ? !action.payload.includes(item.idMeal)
          : item.idMeal !== action.payload
      );
    },
  },
});

export const { addItemsToCart, removeItemsFromCart } = cartItems.actions;

export default cartItems.reducer;
