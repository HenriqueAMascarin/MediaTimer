import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NativeEventSubscription } from "react-native";
import { BackgroundTimer } from 'react-native-nitro-bg-timer'

export type timerRunningValuesType = {
  totalValue: number;
  runningValueTimestamp: number;
  appStateListener: NativeEventSubscription | null;
  timers: {
    internalTimerInterval: NodeJS.Timeout | null;
    backgroundTimerTimeout: ReturnType<typeof BackgroundTimer.setTimeout> | null;
  };
};

const initialState: timerRunningValuesType = {
  totalValue: 0,
  runningValueTimestamp: 0,
  appStateListener: null,
  timers: {
    internalTimerInterval: null,
    backgroundTimerTimeout: null,
  },
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
    changeInternalTimerInterval: (
      state,
      action: PayloadAction<
        timerRunningValuesType["timers"]["internalTimerInterval"]
      >
    ) => {
      state.timers.internalTimerInterval = action.payload;
    },
    changeBackgroundTimerTimeout: (
      state,
      action: PayloadAction<
        timerRunningValuesType["timers"]["backgroundTimerTimeout"]
      >
    ) => {
      state.timers.backgroundTimerTimeout = action.payload;
    },
    changeAppStateListener: (
      state,
      action: PayloadAction<timerRunningValuesType["appStateListener"]>
    ) => {
      state.appStateListener = action.payload;
    },
  },
});

export const {
  changeTotalValue,
  changeRunningValueTimestamp,
  changeAppStateListener,
  changeInternalTimerInterval,
  changeBackgroundTimerTimeout,
} = timerRunningValuesSlice.actions;

export const timerRunningValuesReducer = timerRunningValuesSlice.reducer;
