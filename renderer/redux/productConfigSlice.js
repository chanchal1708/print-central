// store/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIndustry: null,
  selectedFields: [],
};

const productConfigSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductConfigDetails: (state, action) => {
      state.selectedIndustry = action.payload.industry;
      state.selectedFields = action.payload.fields;
    },
  },
});

export const { setProductConfigDetails } = productConfigSlice.actions;
export default productConfigSlice.reducer;
