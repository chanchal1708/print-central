// store/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    selectedProduct: null,
  },
  reducers: {
    setselectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setselectedProduct } = productSlice.actions;
export default productSlice.reducer;
