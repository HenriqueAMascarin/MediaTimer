import { configureStore } from "@reduxjs/toolkit";
import { stateTimerReducer } from "./features/stateTimer-slice";
import { timerValuesReducer } from "./features/timerValues-slice";
import { stateMusicReducer } from "./features/statesMusic-slice";
import { stateHistoryReducer } from "./features/stateHistory-slice";

export const store = configureStore({
  reducer: { stateTimer: stateTimerReducer, timerValues: timerValuesReducer, stateMusic: stateMusicReducer, stateHistory: stateHistoryReducer },
});

export type RootState = ReturnType<typeof store.getState>;
