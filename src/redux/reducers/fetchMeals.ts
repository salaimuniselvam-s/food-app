import { createSlice } from "@reduxjs/toolkit";
import {
  allMealsNamespace,
  fetchAllMeals,
} from "../actions/fetchAllMealsAction";
import { MealsState } from "../../types/inteface";

export const mealInitialState: MealsState = {
  loading: false,
  data: { meals: [] },
  errorMessage: null,
};

const allMeals = createSlice({
  name: allMealsNamespace,
  initialState: mealInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMeals.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchAllMeals.fulfilled, (state, action) => {
        state.data.meals = action.payload.meals
          .filter((meal) => meal.strMeal.length < 25)
          .slice(0, 10);
        state.loading = false;
      })
      .addCase(fetchAllMeals.rejected, (state, action) => {
        state.data.meals = [];
        state.loading = false;
        state.errorMessage =
          action.error.message || "Failed to fetch meals data";
      });
  },
});

export default allMeals.reducer;
