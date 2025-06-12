import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userModules: [],
  pageRight: [],
  error: "",
};

const rightSlice = createSlice({
  name: "rightInfo",
  initialState,
  reducers: {
    rightSuccess: (state, { payload }) => {
      state.userModules = payload?.userModules;
      state.pageRight = payload?.pageRight;
      state.error = "";
    },
    rightClear: (state) => {
      state.error = "";
      state.userModules = [];
      state.pageRight = [];
    },
  },
});

export const { rightSuccess, rightFail, rightClear } = rightSlice.actions;

export const allPageRights = (state) => state.rightInfo.pageRight;

export default rightSlice.reducer;
