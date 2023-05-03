import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: 0,
  },
  reducers: {
    messageChange: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { messageChange } = messageSlice.actions;
export default messageSlice.reducer;
