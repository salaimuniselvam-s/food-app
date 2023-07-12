import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { Meal } from "../../types/inteface";
import { generatePriceForProducts } from "../../utils/helpers";

export const fetchMealByIdNameSpace = "MealById";

export const fetchIndividualMeals = createAsyncThunk(
  `${fetchMealByIdNameSpace}/fetchIndividualMeals`,
  async (meal: string, thunkApi) => {
    try {
      const response = await axios.get(`${API_URL}/lookup.php?i=${meal}`);
      // if no meals found for given search input
      if (!response.data)
        return thunkApi.rejectWithValue({
          message: "No meals found",
        });
      // generating price for products based on the product id
      // as api does not contain price for the products
      const responseWithAmount = generatePriceForProducts(
        response.data as { meals: Meal[] }
      );
      return responseWithAmount;
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError;
      return thunkApi.rejectWithValue({
        axiosError,
      });
    }
  }
);
