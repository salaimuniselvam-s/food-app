import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addressForm, Meal } from "../../types/inteface";

interface MealWithAddress extends Meal, addressForm {}

const initialState: { orders: MealWithAddress[] } = {
  orders: [],
};

const orderedItems = createSlice({
  name: "orderedItems",
  initialState,
  reducers: {
    addItemsToOrderedCart(
      state,
      action: PayloadAction<MealWithAddress | MealWithAddress[]>
    ) {
      state.orders = Array.isArray(action.payload)
        ? [...state.orders, ...action.payload]
        : [...state.orders, action.payload];
    },
  },
});

export const { addItemsToOrderedCart } = orderedItems.actions;

export default orderedItems.reducer;
