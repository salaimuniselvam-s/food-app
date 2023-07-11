import { combineReducers } from "redux";

import allMeals from "./fetchMeals";
import cartItems from "./cartItems";
import getMealById from "./fetchMealById";
import getAddress from "./getAddress";
import orderedItems from "./orderedItems";

// Combine multiple reducers into a root reducer
export const rootReducer = combineReducers({
  allMeals,
  getMealById,
  cartItems,
  getAddress,
  orderedItems,
});
