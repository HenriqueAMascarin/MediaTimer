import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlay: false, 
    isPaused: false,
    isPickingValue: false,
    isInterval: false,
}

type initialType = typeof initialState;

export const stateTimerSlice = createSlice({
    name: "stateTimer",
    initialState,
    reducers: {
        changeIsPlay: (state, action: PayloadAction<boolean>) => {
            state.isPlay = action.payload;
        },
        changeIsPaused: (state, action: PayloadAction<boolean>) => {
            state.isPaused = action.payload;
        },
        changeIsPickingValue: (state, action: PayloadAction<boolean>) => {
            state.isPickingValue = action.payload;
        },
        changeIsInterval: (state, action: PayloadAction<boolean>) => {
            state.isInterval = action.payload;
        }
    }
})

export const { changeIsPlay, changeIsPaused, changeIsPickingValue, changeIsInterval } = stateTimerSlice.actions;
export const stateTimerReducer = stateTimerSlice.reducer;