import { configureStore } from "@reduxjs/toolkit";
import { dataNumbersReducer } from "./features/dataNumbers-slice";
import { stateTimerReducer } from "./features/stateTimer-slice";
import { timerValuesReducer } from "./features/timerValues-slice";
import { AnyAction, Dispatch } from "redux";

export const store = configureStore({
    reducer: {
        dataNumbers: dataNumbersReducer,
        stateTimer: stateTimerReducer,
        timerValues: timerValuesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export interface reduxPassChildren {
    dataInfo: RootState,
    dispatch: Dispatch<AnyAction>
}