import { configureStore } from "@reduxjs/toolkit";
import { dataNumbersReducer } from "./features/dataNumbers-slice";
import { stateTimerReducer } from "./features/stateTimer-slice";
import { timerValuesReducer } from "./features/timerValues-slice";
import { stateMusicReducer } from "./features/statesMusic-slice";

export const store = configureStore({
    reducer: {
        dataNumbers: dataNumbersReducer,
        stateTimer: stateTimerReducer,
        timerValues: timerValuesReducer,
        stateMusic: stateMusicReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;