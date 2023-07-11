import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../reducers";

// Create the store
const store = configureStore({
  reducer: rootReducer,
});

// Define the root state type
export type RootState = ReturnType<typeof rootReducer>;

// Define a custom hook for useDispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
