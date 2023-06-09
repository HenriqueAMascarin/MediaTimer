import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: NodeJS.Timer | null = null;

type initialType = typeof initialState;

export const timerIntervalSlice = createSlice({
    name: "timerInterval",
    initialState,
    reducers: {
        changeTimerInterval: (state, action: PayloadAction<initialType>) => {
            state = action.payload;
        }
    }
})