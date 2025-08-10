import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AudioSource } from "expo-audio";

export type statesMusicType = {
  isSelection: boolean;
  pressBtn: {
    [key: string | number]: boolean;
    reset: boolean;
    forest: boolean;
    waves: boolean;
    fire: boolean;
    audioFile: boolean;
  };
  musicLink: AudioSource | string | null;
};

const initialState: statesMusicType = {
  isSelection: false,
  pressBtn: {
    reset: true,
    forest: false,
    waves: false,
    fire: false,
    audioFile: false,
  },
  musicLink: null,
};

export const stateMusicSlice = createSlice({
  name: "stateMusic",
  initialState,
  reducers: {
    changeIsSelection: (state, action: PayloadAction<boolean>) => {
      state.isSelection = action.payload;
    },
    changePressBtn: (
      state,
      action: PayloadAction<typeof initialState.pressBtn>
    ) => {
      state.pressBtn = action.payload;
    },
    changeMusicLink: (
      state,
      action: PayloadAction<typeof initialState.musicLink>
    ) => {
      state.musicLink = action.payload;
    },
  },
});

export const { changeIsSelection, changePressBtn, changeMusicLink } =
  stateMusicSlice.actions;
export const stateMusicReducer = stateMusicSlice.reducer;
