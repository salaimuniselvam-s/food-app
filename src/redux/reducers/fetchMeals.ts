import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { Meal } from "../../types/inteface";

const namespace = "allMeals";

interface MealsState {
  loading: boolean;
  data: Meal[];
  errorMessage: string | null;
}

const initialState: MealsState = {
  loading: false,
  data: [],
  errorMessage: null,
};

export const fetchAllMeals = createAsyncThunk(
  `${namespace}/fetchAllMeals`,
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${API_URL}/search.php?f=s`);
      return response.data as Meal[];
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError;
      return thunkApi.rejectWithValue({
        axiosError,
      });
    }
  }
);

const allMealsSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMeals.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchAllMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllMeals.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage =
          action.error.message || "Failed to fetch meals data";
      });
  },
});

export default allMealsSlice.reducer;
