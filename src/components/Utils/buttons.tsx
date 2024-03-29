import { AVPlaybackSource } from "expo-av";
import { changePressBtn, changeMusicLink } from "../Utils/Redux/features/statesMusic-slice";
import { store } from "./Redux/store";
import { statesMusicType } from "../Utils/Redux/features/statesMusic-slice";
import { changeLocalHistoryArray } from "./changeLocalHistoryArray";

const dispatch = store.dispatch;

export function changeMusic(musicStates: statesMusicType['pressBtn'], changeBtn?: {} | null, musicLink: AVPlaybackSource | string | null = null, changeHistory = true) {

    if (changeHistory) {
        changeLocalHistoryArray();
    }

    let newBtnsObj = { ...musicStates };

    for (let key in musicStates) {
        newBtnsObj[key] = false;
    }

    newBtnsObj = { ...newBtnsObj, ...changeBtn };

    dispatch(changePressBtn(newBtnsObj));

    dispatch(changeMusicLink(musicLink));

}