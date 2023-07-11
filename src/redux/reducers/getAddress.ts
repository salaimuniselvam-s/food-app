import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addressForm } from "../../types/inteface";

export const addresInitialState: { address: addressForm } = {
  address: {
    Name: "",
    Address: "",
    phone: "",
    city: "",
    prefix: "",
    state: "",
  },
};

const getAddress = createSlice({
  name: "getAddress",
  initialState: addresInitialState,
  reducers: {
    updateAddress(state, action: PayloadAction<addressForm>) {
      state.address = { ...state.address, ...action.payload };
    },
  },
});

export const { updateAddress } = getAddress.actions;

export default getAddress.reducer;
