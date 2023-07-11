import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { Meal } from "../../types/inteface";

export const allMealsNamespace = "allMeals";

export interface MealsState {
  loading: boolean;
  data: { meals: Meal[] };
  errorMessage: string | null;
}

export const fetchAllMeals = createAsyncThunk(
  `${allMealsNamespace}/fetchAllMeals`,
  async (meal: string, thunkApi) => {
    try {
      const response = await axios.get(`${API_URL}/search.php?f=${meal}`);
      // if no meals found for given search input
      if (!response.data)
        return thunkApi.rejectWithValue({
          message: "No meals found",
        });
      return response.data as { meals: Meal[] };
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError;
      return thunkApi.rejectWithValue({
        axiosError,
      });
    }
  }
);
