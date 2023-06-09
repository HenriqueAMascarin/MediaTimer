import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalValue: 0,
    runningValue: 0,
}

export const timerValuesSlice = createSlice({
    name: "timerValues",
    initialState, 
    reducers: {
        changeTotalValue: (state, action: PayloadAction<number>) => {
            state.totalValue = action.payload;
        },
        changeRunningValue: (state, action: PayloadAction<number>) => {
            state.runningValue = action.payload;
        }
    }
})

export const {changeTotalValue, changeRunningValue} = timerValuesSlice.actions;
export const timerValuesReducer = timerValuesSlice.reducer;