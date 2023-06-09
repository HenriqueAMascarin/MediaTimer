import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    scrollOne: 0, 
    scrollTwo: 0, 
    scrollThree: 0,
}

type payloadScroll = typeof initialState;

export const dataNumbersSlice = createSlice({
    name: "dataNumbers",
    initialState,
    reducers: {
        changeScrollValues: (state, action: PayloadAction<payloadScroll>) => {
            state.scrollOne = action.payload.scrollOne;
            state.scrollTwo = action.payload.scrollTwo;
            state.scrollThree = action.payload.scrollThree;
        },
    }
})

export const {changeScrollValues} = dataNumbersSlice.actions;
export const dataNumbersReducer = dataNumbersSlice.reducer;