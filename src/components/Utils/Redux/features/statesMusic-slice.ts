import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AVPlaybackSource } from "expo-av";

export type statesMusicType = {
  isSelection: boolean;
  pressBtn: {
    [key: string | number]: boolean;
    reset: boolean;
    forest: boolean;
    waves: boolean;
    fire: boolean;
    youtube: boolean;
    audioFile: boolean;
  };
  isSelectionYoutube: boolean;
  musicLink: AVPlaybackSource | string | null;
};

const initialState: statesMusicType = {
  isSelection: false,
  pressBtn: {
    reset: true,
    forest: false,
    waves: false,
    fire: false,
    youtube: false,
    audioFile: false,
  },
  isSelectionYoutube: false,
  musicLink: null,
};

export const stateMusicSlice = createSlice({
  name: "stateMusic",
  initialState,
  reducers: {
    changeIsSelection: (state, action: PayloadAction<boolean>) => {
      state.isSelection = action.payload;
    },
    changeYoutube: (state, action: PayloadAction<boolean>) => {
      state.pressBtn.youtube = action.payload;
    },
    changeIsSelectionYoutube: (state, action: PayloadAction<boolean>) => {
      state.isSelectionYoutube = action.payload;
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

export const {
  changeIsSelection,
  changeYoutube,
  changePressBtn,
  changeMusicLink,
  changeIsSelectionYoutube,
} = stateMusicSlice.actions;
export const stateMusicReducer = stateMusicSlice.reducer;
