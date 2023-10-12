import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isSelection: false,
}

export const stateMusicSlice = createSlice({
    name: "stateMusic",
    initialState,
    reducers: {
        changeSelection: (state, action: PayloadAction<boolean>) => {
            state.isSelection = action.payload;
        },
    }
})

export const { changeSelection } = stateMusicSlice.actions;
export const stateMusicReducer = stateMusicSlice.reducer;