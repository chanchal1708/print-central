//add productionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addproductionData: {},
};

const addproductionSlice = createSlice({
  name: "addproduction",
  initialState,
  reducers: {
    saveaddProductionData(state, action) {
      state.addproductionData = action.payload;
    },
  },
});

export const { saveaddProductionData } = addproductionSlice.actions;
export default addproductionSlice.reducer;
