import { sequenceTimer } from "../Timer/TimerAnimations/TimerSequence";
import { timerPause } from "../Timer/TimerAnimations/TimerPause";
import { buttonInterface } from "../Buttons/Buttons";

import { changeTimerInterval } from "./Redux/features/timerInterval-slice";
import { changeRunningValue, changeTotalValue } from "./Redux/features/timerValues-slice";
import { changeTimerState } from "./Redux/features/stateTimer-slice";
changeRunningValue

function startInterval({dataInfo, dispatch}: buttonInterface) {
    stopInterval({dataInfo: dataInfo, dispatch: dispatch});
    // dispatch(changeTimerInterval(setInterval(() => {
    //     dispatch(changeRunningValue(dataInfo.timerValues.runningValue -= 1));
    // }, 1000)));
}

export function stopInterval({dataInfo, dispatch}: buttonInterface) {
    clearInterval(dataInfo.timerInterval);
    // dispatch(changeTimerInterval(setTimeout(() =>{return null}) ));
    // ver do dispatch se ele recebe null
    
}

export function playTimer({dataInfo, dispatch}: buttonInterface, heightItem: number) {
    const numberHours = Math.round(dataInfo.dataNumbers.scrollOne / heightItem) * 3600;
    const numberMinutes = Math.round(dataInfo.dataNumbers.scrollTwo / heightItem) * 60;
    const numberSeconds = Math.round(dataInfo.dataNumbers.scrollThree / heightItem);
            
    let timeStampValue = (numberHours + numberMinutes + numberSeconds);

    sequenceTimer(true);
    dispatch(changeRunningValue(timeStampValue));
    dispatch(changeTotalValue(timeStampValue));

    setTimeout(() => {
        startInterval({dataInfo: dataInfo, dispatch: dispatch});
    }, 800);
}

export function pauseTimer({dataInfo, dispatch}: buttonInterface) {
    dispatch(changeTimerState({ isPlay: dataInfo.stateTimer.isPlay, isPaused: !dataInfo.stateTimer.isPaused, isPickingValue: dataInfo.stateTimer.isPickingValue }));

    const isPaused = !dataInfo.stateTimer.isPaused; // the state dont get the real value, because that we need to put ! to get real value

    timerPause(isPaused);
    isPaused ? stopInterval({dataInfo: dataInfo, dispatch: dispatch}) : startInterval({dataInfo: dataInfo, dispatch: dispatch});

}

export function stopTimer({dataInfo, dispatch}: buttonInterface) {
    sequenceTimer(false);
    timerPause(false);
    
    stopInterval({dataInfo: dataInfo, dispatch: dispatch});
    dispatch(changeRunningValue(0));
    dispatch(changeTotalValue(0));
}