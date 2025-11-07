import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NativeEventSubscription } from "react-native";

export type timerValuesType = {
  totalValue: number;
  runningValueTimestamp: number;
  timerInterval: NodeJS.Timeout | null;
  appStateListener: NativeEventSubscription | null;
};

const initialState: timerValuesType = {
  totalValue: 0,
  runningValueTimestamp: 0,
  timerInterval: null,
  appStateListener: null,
};

export const timerRunningValuesSlice = createSlice({
  name: "timerRunningValues",
  initialState,
  reducers: {
    changeTotalValue: (state, action: PayloadAction<number>) => {
      state.totalValue = action.payload;
    },
    changeRunningValueTimestamp: (
      state,
      action: PayloadAction<typeof initialState.runningValueTimestamp>
    ) => {
      state.runningValueTimestamp = action.payload;
    },
    changeTimerInterval: (
      state,
      action: PayloadAction<timerValuesType["timerInterval"]>
    ) => {
      state.timerInterval = action.payload;
    },
    changeAppStateListener: (
      state,
      action: PayloadAction<timerValuesType["appStateListener"]>
    ) => {
      state.appStateListener = action.payload;
    },
  },
});

export const {
  changeTotalValue,
  changeRunningValueTimestamp,
  changeTimerInterval,
  changeAppStateListener,
} = timerRunningValuesSlice.actions;
export const timerRunningValuesReducer = timerRunningValuesSlice.reducer;
