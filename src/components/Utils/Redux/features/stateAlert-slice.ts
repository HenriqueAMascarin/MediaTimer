import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAudioPlayer } from 'expo-audio';

const initialState = {
  isAlert: true,
  alertSound: useAudioPlayer(require("@assets/sounds/timer.mp3"))
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
