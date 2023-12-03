import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AVPlaybackSource } from "expo-av";

type initialType = {
    isSelection: boolean,
    pressBtn: {
        [key: string]: boolean,
        forest: boolean,
        waves: boolean,
        fire: boolean,
        youtube: boolean
    },
    musicLink: AVPlaybackSource | null,
}

const initialState: initialType = {
    isSelection: false,
    pressBtn: {
        forest: false,
        waves: false,
        fire: false,
        youtube: false
    },
    musicLink: null
}

export const stateMusicSlice = createSlice({
    name: "stateMusic",
    initialState,
    reducers: {
        changeSelection: (state, action: PayloadAction<boolean>) => {
            state.isSelection = action.payload;
        },
        changePressBtn: (state, action: PayloadAction<typeof initialState.pressBtn>) => {
            state.pressBtn = action.payload;
        },
        changeMusicLink: (state, action: PayloadAction<typeof initialState.musicLink>) => {
            state.musicLink = action.payload;
        }
    }
})

export const { changeSelection, changePressBtn, changeMusicLink } = stateMusicSlice.actions;
export const stateMusicReducer = stateMusicSlice.reducer;