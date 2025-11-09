import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AudioPlayer } from 'expo-audio';

export type stateAlertType = {
  isAlert: boolean,
  alertSound: AudioPlayer | null;
}

const initialState: stateAlertType = {
  isAlert: true,
  alertSound: null,
};

export const stateAlertSlice = createSlice({
  name: "stateMusic",
  initialState,
  reducers: {
    changeIsAlert: (state, action: PayloadAction<boolean>) => {
      state.isAlert = action.payload;
    },
    changeAlertSound: (
      state,
      action: PayloadAction<typeof initialState.alertSound>
    ) => {
      state.alertSound = action.payload;
    },
  },
});

export const { changeIsAlert, changeAlertSound } = stateAlertSlice.actions;
export const stateAlertReducer = stateAlertSlice.reducer;
