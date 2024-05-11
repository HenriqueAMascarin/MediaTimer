import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalValue: 0,
    runningValueTimestamp: 0,
}

export const timerValuesSlice = createSlice({
    name: "timerValues",
    initialState, 
    reducers: {
        changeTotalValue: (state, action: PayloadAction<number>) => {
            state.totalValue = action.payload;
        },
        changeRunningValueTimestamp: (state, action: PayloadAction<typeof initialState.runningValueTimestamp>) => {
            state.runningValueTimestamp = action.payload;
        }
    }
})

export const {changeTotalValue, changeRunningValueTimestamp} = timerValuesSlice.actions;
export const timerValuesReducer = timerValuesSlice.reducer;