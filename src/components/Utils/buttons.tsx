import { changePressBtn, changeMusicLink } from "../Utils/Redux/features/statesMusic-slice";
import { store } from "./Redux/store";
import { statesMusicType } from "../Utils/Redux/features/statesMusic-slice";
import { changeLocalHistoryArray } from "./historyArrayFunctions";

const dispatch = store.dispatch;

export async function changeMusic(musicStates: statesMusicType['pressBtn'], changeBtn?: {} | null, musicLink: statesMusicType['musicLink'] = null, changeHistory = true) {

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