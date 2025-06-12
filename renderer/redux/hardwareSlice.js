// slices/hardwareConfigSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  printer: "", // Selected printer
  printerHead: null, // Printer head number
  printerSoftware: "", // Selected printer software
};

const hardwareConfigSlice = createSlice({
  name: "hardwareConfig",
  initialState,
  reducers: {
    setPrinter: (state, action) => {
      state.printer = action.payload; // Update the selected printer
    },
    setPrinterHead: (state, action) => {
      state.printerHead = action.payload; // Update the printer head number
    },
    setPrinterSoftware: (state, action) => {
      state.printerSoftware = action.payload; // Update the selected printer software
    },
    resetHardwareConfig: (state) => {
      // Reset the state to initial values
      state.printer = "";
      state.printerHead = null;
      state.printerSoftware = "";
    },
  },
});

// Export actions
export const {
  setPrinter,
  setPrinterHead,
  setPrinterSoftware,
  resetHardwareConfig,
} = hardwareConfigSlice.actions;

// Export the reducer
export default hardwareConfigSlice.reducer;
