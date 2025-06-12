import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {},
};

const addProducttypeSlice = createSlice({
  name: "addProducttype",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    clearFormData: (state) => {
      state.formData = {};
    },
    updateProductionData: (state, action) => {
      const { pageType, data } = action.payload;
      state[pageType] = { ...state[pageType], ...data };
    },
  },
});

export const { setFormData, clearFormData, updateProductionData } =
  addProducttypeSlice.actions;
export default addProducttypeSlice.reducer;
