import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlay: false,
  isPaused: false,
  isPickingValue: false,
};

export const stateTimerSlice = createSlice({
  name: "stateTimer",
  initialState,
  reducers: {
    changeIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    changeIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    changeIsPickingValue: (state, action: PayloadAction<boolean>) => {
      state.isPickingValue = action.payload;
    },
  },
});

export const { changeIsPlay, changeIsPaused, changeIsPickingValue } =
  stateTimerSlice.actions;
export const stateTimerReducer = stateTimerSlice.reducer;
