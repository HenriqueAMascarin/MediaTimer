import { sequenceTimer } from "../TimerAnimations/TimerSequence";
import { timerPause } from "../TimerAnimations/TimerPause";
import { RootState } from "../../Utils/Redux/store";
import { changeRunningValue, changeTotalValue } from "../../Utils/Redux/features/timerValues-slice";
import { changeIsInterval, changeIsPaused, changeIsPickingValue } from "../../Utils/Redux/features/stateTimer-slice";
import { store } from "../../Utils/Redux/store";

const dispatch = store.dispatch;

export function playTimer(dataNumbers: RootState['dataNumbers'], heightItem: number) {
  const numberHours = Math.round(dataNumbers.scrollOne / heightItem) * 3600;
  const numberMinutes = Math.round(dataNumbers.scrollTwo / heightItem) * 60;
  const numberSeconds = Math.round(dataNumbers.scrollThree / heightItem);

  const timeStampValue = numberHours + numberMinutes + numberSeconds;

  dispatch(changeRunningValue(timeStampValue));
  dispatch(changeTotalValue(timeStampValue));
  dispatch(changeIsInterval(true));
  sequenceTimer(true);
}

export function pauseTimer(stateTimer: RootState['stateTimer']) {
  const isPaused = stateTimer.isPaused;

  timerPause(isPaused);
  isPaused ? dispatch(changeIsInterval(false)) : dispatch(changeIsInterval(true));
}

export function stopTimer() {
  dispatch(changeIsInterval(false));
  dispatch(changeIsPickingValue(false));
  dispatch(changeIsPaused(false));

  dispatch(changeRunningValue(0));
  dispatch(changeTotalValue(0));

  sequenceTimer(false);
  timerPause(false);
}
