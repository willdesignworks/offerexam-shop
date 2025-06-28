import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryKeyword: "", // 關鍵字搜尋
  selectedCategories: [], // 使用者勾選的分類
  minPrice: "", // 篩選條件：價格
  maxPrice: "",
  inStockOnly: false, // 篩選條件：庫存
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryKeyword(state, action) {
      state.categoryKeyword = action.payload;
    },
    toggleCategory(state, action) {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(
          (c) => c !== category
        );
      } else {
        state.selectedCategories.push(category);
      }
    },
    setMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
    setInStockOnly(state, action) {
      state.inStockOnly = action.payload;
    },
    resetFilters(state) {
      state.categoryKeyword = ""; // 關鍵字搜尋
      state.selectedCategories = []; // 使用者勾選的分類
      state.minPrice = ""; // 篩選條件：價格
      state.maxPrice = "";
      state.inStockOnly = false; // 篩選條件：庫存
    },
  },
});

export const {
  setCategoryKeyword,
  toggleCategory,
  setMinPrice,
  setMaxPrice,
  setInStockOnly,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
