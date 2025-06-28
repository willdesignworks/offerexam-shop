import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import filtersReducer from "./filtersSlice";
import loadingReducer from "./loadingSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    loading: loadingReducer,
    ui: uiReducer,
  },
});

export default store;
