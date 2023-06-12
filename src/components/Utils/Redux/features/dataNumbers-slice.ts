import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    scrollOne: 0,
    scrollTwo: 0,
    scrollThree: 0,
}

export const dataNumbersSlice = createSlice({
    name: "dataNumbers",
    initialState,
    reducers: {
        changeScrollOne: (state, action: PayloadAction<number>) => {
            state.scrollOne = action.payload;
        },
        changeScrollTwo: (state, action: PayloadAction<number>) => {
            state.scrollTwo = action.payload;
        },
        changeScrollThree: (state, action: PayloadAction<number>) => {
            state.scrollThree = action.payload;
        }
    }
})

export const { changeScrollOne, changeScrollTwo, changeScrollThree} = dataNumbersSlice.actions;
export const dataNumbersReducer = dataNumbersSlice.reducer;