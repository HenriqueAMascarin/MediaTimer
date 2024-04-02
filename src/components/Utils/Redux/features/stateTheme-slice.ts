import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { colorsStyle } from "@src/components/Utils/colorsStyle";

export type themesType = "light" | "dark";

const initialState = colorsStyle.lightTheme;

export type typeStateTheme = typeof initialState;

export const stateThemeSlice = createSlice({
  name: "stateTheme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<themesType>) => {
      if (action.payload == "dark") {
       return  state = colorsStyle.darkTheme;
      } else {
        return state = colorsStyle.lightTheme;
      }
    },
  },
});

export const { changeTheme } = stateThemeSlice.actions;
export const stateThemeReducer = stateThemeSlice.reducer;
