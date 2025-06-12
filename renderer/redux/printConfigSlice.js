// slices/printConfigSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIndustry: null, // Selected industry (e.g., "plywood", "cement")
  tableData: {
    plywood: [
      {
        key: 1,
        fieldName: "Material Product",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 2,
        fieldName: "Material Category",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 3,
        fieldName: "Material Thickness",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 4,
        fieldName: "Material Group",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 5,
        fieldName: "Material Grade",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 6,
        fieldName: "Material DesignCode",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 7,
        fieldName: "Material Finish Code",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 8,
        fieldName: "Material Panel Code",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 9,
        fieldName: "Lipping Code",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 10,
        fieldName: "Material Code",
        type: "alphanumeric",
        selected: false,
      },
      { key: 11, fieldName: "UOM", type: "alphanumeric", selected: false },
      { key: 12, fieldName: "Batch No.", type: "date", selected: false },
      { key: 13, fieldName: "MRP", type: "numeric", selected: false },
    ],
    cement: [
      {
        key: 1,
        fieldName: "Packer Details",
        type: "text/input",
        selected: false,
      },
      { key: 2, fieldName: "Grade", type: "alphanumeric", selected: false },
      { key: 3, fieldName: "DI No", type: "numeric", selected: false },
      { key: 4, fieldName: "State", type: "text/input", selected: false },
      { key: 5, fieldName: "Fly ash(%)", type: "numeric", selected: false },
      { key: 6, fieldName: "MRP", type: "text/input", selected: false },
      { key: 7, fieldName: "Message", type: "numeric", selected: false },
    ],
    fertilizer: [],
    pipes: [],
    wiresCables: [],
    petroleum: [],
  },
  qrCodeOption: null, // QR code option ("yes" or "no")
};

const printConfigSlice = createSlice({
  name: "printConfig",
  initialState,
  reducers: {
    setSelectedIndustry: (state, action) => {
      state.selectedIndustry = action.payload; // Update selected industry
    },
    setFields: (state, action) => {
      state.fields = action.payload;
    },
    updateTableData: (state, action) => {
      const { industry, data } = action.payload;
      state.tableData[industry] = data; // Update table data for a specific industry
    },
    setQrCodeOption: (state, action) => {
      state.qrCodeOption = action.payload; // Update QR code option
    },
    addRowToTable: (state, action) => {
      const { industry, newRow } = action.payload;
      state.tableData[industry].push(newRow); // Add a new row to the table
    },
    resetPrintConfig: (state) => {
      // Reset the state to initial values
      state.selectedIndustry = null;
      state.tableData = initialState.tableData;
      state.qrCodeOption = null;
    },
  },
});

// Export actions
export const {
  setSelectedIndustry,
  setFields,
  updateTableData,
  setQrCodeOption,
  addRowToTable,
  resetPrintConfig,
} = printConfigSlice.actions;

// Export the reducer
export default printConfigSlice.reducer;
