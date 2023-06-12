import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlay: false, 
    isPaused: false,
    isPickingValue: false,
}

type initialType = typeof initialState;

export const stateTimerSlice = createSlice({
    name: "stateTimer",
    initialState,
    reducers: {
        changeTimerState: (state, action: PayloadAction<initialType>) => {
            state.isPlay = action.payload.isPlay;
            state.isPaused = action.payload.isPaused;
            state.isPickingValue = action.payload.isPickingValue;
        }
    }
})

export const { changeTimerState } = stateTimerSlice.actions;
export const stateTimerReducer = stateTimerSlice.reducer;