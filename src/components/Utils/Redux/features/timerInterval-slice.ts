import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialType = NodeJS.Timer;

const initialState: initialType = setTimeout(() =>{});


export const timerIntervalSlice = createSlice({
    name: "timerInterval",
    initialState,
    reducers: {
        changeTimerInterval: (state, action: PayloadAction<initialType>) => {
            state = action.payload;
        }
    }
})

export const { changeTimerInterval } = timerIntervalSlice.actions;
export const timerIntervalReducer = timerIntervalSlice.reducer;