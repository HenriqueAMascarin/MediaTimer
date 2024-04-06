import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalValue: 0,
    runningValue: {hours: '00', minutes: '00', seconds: '00', timestamp: 0},
}

export const timerValuesSlice = createSlice({
    name: "timerValues",
    initialState, 
    reducers: {
        changeTotalValue: (state, action: PayloadAction<number>) => {
            state.totalValue = action.payload;
        },
        changeRunningValue: (state, action: PayloadAction<typeof initialState.runningValue>) => {
            state.runningValue = action.payload;
        }
    }
})

export const {changeTotalValue, changeRunningValue} = timerValuesSlice.actions;
export const timerValuesReducer = timerValuesSlice.reducer;