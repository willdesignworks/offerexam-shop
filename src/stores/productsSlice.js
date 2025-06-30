import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // 所有商品資料
  filteredItems: [], // 篩選出來的商品
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload; // 設定商品（初始化載入）
    },
    setFilteredItems(state, action) {
      state.filteredItems = action.payload; // 設定篩選後
    },
  },
});

export const { setItems, setFilteredItems } = productsSlice.actions;
export default productsSlice.reducer;
