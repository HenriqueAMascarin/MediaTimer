import { sequenceTimer } from "../TimerAnimations/TimerSequence";
import { timerPause } from "../TimerAnimations/TimerPause";
import { reduxPassChildren } from "../../Utils/Redux/store";
import { changeRunningValue, changeTotalValue } from "../../Utils/Redux/features/timerValues-slice";
import { changeIsInterval, changeIsPaused, changeIsPickingValue, changeIsPlay } from "../../Utils/Redux/features/stateTimer-slice";


export function playTimer({ dataInfo, dispatch }: reduxPassChildren, heightItem: number) {
    const numberHours = Math.round(dataInfo.dataNumbers.scrollOne / heightItem) * 3600;
    const numberMinutes = Math.round(dataInfo.dataNumbers.scrollTwo / heightItem) * 60;
    const numberSeconds = Math.round(dataInfo.dataNumbers.scrollThree / heightItem);

    const timeStampValue = (numberHours + numberMinutes + numberSeconds);

    dispatch(changeRunningValue(timeStampValue));
    dispatch(changeTotalValue(timeStampValue));
    dispatch(changeIsInterval(true));
    sequenceTimer(true);
}
 
export function pauseTimer({ dataInfo, dispatch }: reduxPassChildren) {
    const isPaused = dataInfo.stateTimer.isPaused;

    timerPause(isPaused);
    isPaused ? dispatch(changeIsInterval(false)) : dispatch(changeIsInterval(true));
}

export function stopTimer({ dispatch }: reduxPassChildren) {
    dispatch(changeIsInterval(false));
    dispatch(changeIsPickingValue(false));
    dispatch(changeIsPaused(false));

    dispatch(changeRunningValue(0));
    dispatch(changeTotalValue(0));

    sequenceTimer(false);
    timerPause(false);
}