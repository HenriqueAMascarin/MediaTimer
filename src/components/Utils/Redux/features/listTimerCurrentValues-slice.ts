import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  listOneCurrentNumber: 0,
  listTwoCurrentNumber: 0,
  listThreeCurrentNumber: 0,
};

export const listTimerCurrentValuesSlice = createSlice({
  name: "listTimerCurrentValues",
  initialState,
  reducers: {
    changeListOneCurrentNumber: (
      state,
      action: PayloadAction<typeof initialState.listOneCurrentNumber>
    ) => {
      state.listOneCurrentNumber = action.payload;
    },
    changeListTwoCurrentNumber: (
      state,
      action: PayloadAction<typeof initialState.listTwoCurrentNumber>
    ) => {
      state.listTwoCurrentNumber = action.payload;
    },
    changeListThreeCurrentNumber: (
      state,
      action: PayloadAction<typeof initialState.listThreeCurrentNumber>
    ) => {
      state.listThreeCurrentNumber = action.payload;
    },
  },
});

export const {
  changeListOneCurrentNumber,
  changeListTwoCurrentNumber,
  changeListThreeCurrentNumber,
} = listTimerCurrentValuesSlice.actions;

export const listTimerCurrentValuesReducer =
  listTimerCurrentValuesSlice.reducer;
