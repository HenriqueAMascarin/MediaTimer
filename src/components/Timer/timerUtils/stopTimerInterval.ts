import { changeTimerInterval } from '@src/components/Utils/Redux/features/timerValues-slice';
import { store } from '@src/components/Utils/Redux/store';
import BackgroundTimer from "react-native-background-timer";

const dispatch = store.dispatch;

export function stopTimerInterval() {
  const { timerValues } = store.getState();

  BackgroundTimer.stopBackgroundTimer();

  if (timerValues.timerInterval) {
    clearInterval(timerValues.timerInterval);
  }

  dispatch(changeTimerInterval(null));
}
