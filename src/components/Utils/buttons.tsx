import { AVPlaybackSource } from "expo-av";
import { changePressBtn, changeMusicLink } from "../Utils/Redux/features/statesMusic-slice";
import { store } from "./Redux/store";
import { statesMusicType } from "../Utils/Redux/features/statesMusic-slice";
import { changeHistoryArray } from "./Redux/features/stateHistory-slice";

const dispatch = store.dispatch;

export function changeMusic(musicStates: statesMusicType['pressBtn'], changeBtn?: {} | null, musicLink?: AVPlaybackSource | string, historyArray:) {

    let newBtnsObj = { ...musicStates };

    for (let key in musicStates) {
        newBtnsObj[key] = false;
    }

    newBtnsObj = { ...newBtnsObj, ...changeBtn };

    let newArr = [...historyItems];

    for (const key in newArr) {
        newArr[key].isSelected = false;
    }

    dispatch(changeHistoryArray(newArr))
    dispatch(changePressBtn(newBtnsObj));

    if (musicLink) dispatch(changeMusicLink(musicLink));

}