import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type historyItem = { nameMusic: string; authorMusic?: string; idMusic?: string, isSelected: boolean, uri?: string };

type initialTypeHistory = {
  isHistory: boolean;
  historyItems: historyItem[] | [];
};

const initialState: initialTypeHistory = {
  isHistory: false,
  historyItems: [],
};

export const stateHistorySlice = createSlice({
  name: "stateHistory",
  initialState,
  reducers: {
    changeIsHistory: (state, action: PayloadAction<initialTypeHistory["isHistory"]>) => {
      state.isHistory = action.payload;
    },
    changeHistoryArray: (state, action: PayloadAction<initialTypeHistory["historyItems"]>) => {
      state.historyItems = action.payload;
    },
  },
});

export const { changeHistoryArray, changeIsHistory } = stateHistorySlice.actions;
export const stateHistoryReducer = stateHistorySlice.reducer;
