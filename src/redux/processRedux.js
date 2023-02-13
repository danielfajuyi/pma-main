import { createSlice } from "@reduxjs/toolkit";

const processSlice = createSlice({
  name: "process",
  initialState: {
    isFetching: false,
    data: null,
    error: false,
  },
  reducers: {
    processStart: (state) => {
      state.isFetching = true;
    },
    processSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    },
    processFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { processStart, processSuccess, processFailure } =
  processSlice.actions;
export default processSlice.reducer;
