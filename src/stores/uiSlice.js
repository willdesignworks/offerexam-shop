import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewMode: "card", // 預設
  sortOrder: { field: null, order: null }, // 預設不排序
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
  },
});

export const { setViewMode, setSortOrder } = uiSlice.actions;
export default uiSlice.reducer;
