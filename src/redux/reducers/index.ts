import { combineReducers } from "redux";

import allMealsSlice from "./fetchMeals";

// Combine multiple reducers into a root reducer
export const rootReducer = combineReducers({
  allMeals: allMealsSlice,
});
