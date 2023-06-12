import { configureStore } from "@reduxjs/toolkit";
import { dataNumbersReducer } from "./features/dataNumbers-slice";
import { stateTimerReducer } from "./features/stateTimer-slice";
import { timerValuesReducer } from "./features/timerValues-slice";
import { timerIntervalReducer } from "./features/timerInterval-slice";

export const store = configureStore({
    reducer: {
        dataNumbers: dataNumbersReducer,
        stateTimer: stateTimerReducer,
        timerValues: timerValuesReducer,
        timerInterval: timerIntervalReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;