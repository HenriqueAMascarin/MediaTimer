import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlay: false,
  isPaused: false,
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
  },
});

export const { changeIsPlay, changeIsPaused } =
  stateTimerSlice.actions;
export const stateTimerReducer = stateTimerSlice.reducer;
