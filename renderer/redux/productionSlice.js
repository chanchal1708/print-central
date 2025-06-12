// slices/productionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productionData: [],
  editData: null,
  selectedProduct: null,
};

const productionSlice = createSlice({
  name: "production",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setselectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addProduction: (state, action) => {
      state.productionData.push(action.payload);
    },
    deleteProduction: (state, action) => {
      state.productionData = state.productionData.filter(
        (item, index) => index !== action.payload
      );
    },
    setEditProduction: (state, action) => {
      state.editData = action.payload;
    },
    updateProduction: (state, action) => {
      state.productionData[action.payload.index] = action.payload.data;
      state.editData = null;
    },
  },
});

export const {
  setProduct,
  setselectedProduct,
  addProduction,
  deleteProduction,
  setEditProduction,
  updateProduction,
} = productionSlice.actions;
export default productionSlice.reducer;
