import {
  changeTimerInterval,
  changeTotalValue,
} from "@src/components/Utils/Redux/features/timerValues-slice";
import { store } from "@src/components/Utils/Redux/store";
import BackgroundTimer from "react-native-background-timer";
import notifee from "@notifee/react-native";
import {
  changeIsPaused,
  changeIsPlay,
} from "@src/components/Utils/Redux/features/stateTimer-slice";
import { timerPause } from "@src/components/Timer/TimerAnimations/timerPause";
import { sequenceTimer } from "@src/components/Timer/TimerAnimations/timerSequence";
import { removeStateAppListener } from "@src/components/Timer/timerUtils/removeAppStateListener";

const dispatch = store.dispatch;

export function stopIntervalTimer() {
  const { timerInterval } = store.getState().timerValues;

  BackgroundTimer.stopBackgroundTimer();

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  dispatch(changeTimerInterval(null));
}

export function stopTimer() {
  const { stateMusic, stateAlert } = store.getState();

  stateMusic.music.audioPlayerState.removeAllListeners("playbackStatusUpdate");

  stateMusic.music.audioPlayerState.pause();

  stateMusic.music.audioPlayerState.seekTo(0);

  notifee.cancelAllNotifications();

  stopIntervalTimer();
  removeStateAppListener();

  dispatch(changeIsPaused(false));
  dispatch(changeIsPlay(false));
  dispatch(changeTotalValue(0));

  sequenceTimer(false);
  timerPause(false);

  if (stateAlert.isAlert) {
    stateAlert.alertSound.seekTo(0);

    stateAlert.alertSound.play();
  }
}
