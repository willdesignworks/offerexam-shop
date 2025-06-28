import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filteredItems: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setFilteredItems(state, action) {
      state.filteredItems = action.payload;
    },
  },
});

export const { setItems, setFilteredItems } = productsSlice.actions;
export default productsSlice.reducer;
