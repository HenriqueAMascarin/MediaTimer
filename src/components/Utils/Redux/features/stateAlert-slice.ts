import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAlert: true,
};

export const stateAlertSlice = createSlice({
  name: "stateMusic",
  initialState,
  reducers: {
    changeIsAlert: (state, action: PayloadAction<boolean>) => {
      state.isAlert = action.payload;
    },
  },
});

export const { changeIsAlert } = stateAlertSlice.actions;
export const stateAlertReducer = stateAlertSlice.reducer;
