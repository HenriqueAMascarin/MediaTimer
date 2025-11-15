import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AudioPlayer } from "expo-audio";
import { store } from "@src/components/Utils/Redux/store";

export type stateAlertType = {
  isAlert: boolean;
  alertSoundPlayer: AudioPlayer | null;
};
const initialState: stateAlertType = {
  isAlert: true,
  alertSoundPlayer: null,
};

export const stateAlertSlice = createSlice({
  name: "stateAlert",
  initialState,
  reducers: {
    changeIsAlert: (state, action: PayloadAction<boolean>) => {
      state.isAlert = action.payload;
    },
    changeAlertSoundPlayer: (
      state,
      action: PayloadAction<typeof initialState.alertSoundPlayer>
    ) => {
      state.alertSoundPlayer = action.payload;
    },
  },
});

export const { changeIsAlert, changeAlertSoundPlayer } =
  stateAlertSlice.actions;
export const stateAlertReducer = stateAlertSlice.reducer;
