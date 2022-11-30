import { configureStore } from "@reduxjs/toolkit";
import warenkorbReducer from "./warenkorbSlice";

export default configureStore({
  reducer: {
    warenkorb: warenkorbReducer,
  },
});
