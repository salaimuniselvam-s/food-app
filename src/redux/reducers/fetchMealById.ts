import { createSlice } from "@reduxjs/toolkit";
import {
  fetchIndividualMeals,
  fetchMealByIdNameSpace,
} from "../actions/fetchMealById";
import { mealInitialState } from "./fetchMeals";

const getMealById = createSlice({
  name: fetchMealByIdNameSpace,
  initialState: mealInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndividualMeals.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchIndividualMeals.fulfilled, (state, action) => {
        state.data.meals = action.payload.meals;
        state.loading = false;
      })
      .addCase(fetchIndividualMeals.rejected, (state, action) => {
        state.data.meals = [];
        state.loading = false;
        state.errorMessage =
          action.error.message || "Failed to fetch meals data";
      });
  },
});

export default getMealById.reducer;
