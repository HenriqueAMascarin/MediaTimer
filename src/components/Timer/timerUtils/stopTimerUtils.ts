import {
  changeTimerInterval,
  changeTotalValue,
  timerRunningValuesType,
} from "@src/components/Utils/Redux/features/timerRunningValues-slice";
import { store } from "@src/components/Utils/Redux/store";
import BackgroundTimer from "react-native-background-timer";
import notifee from "@notifee/react-native";
import {
  changeIsPaused,
  changeIsPlay,
} from "@src/components/Utils/Redux/features/stateTimer-slice";
import { timerPauseOrResume } from "@src/components/Timer/TimerAnimations/timerPauseOrResume";
import { sequenceTimer } from "@src/components/Timer/TimerAnimations/timerSequence";
import { removeStateAppListener } from "@src/components/Timer/timerUtils/removeAppStateListener";

const dispatch = store.dispatch;

type stopIntervalTimerType = {
  timerInterval: timerRunningValuesType["timerInterval"];
};

export function stopIntervalTimer({ timerInterval }: stopIntervalTimerType) {
  BackgroundTimer.stopBackgroundTimer();

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  dispatch(changeTimerInterval(null));
}

export function stopTimer() {
  const { timerRunningValues, stateMusic, stateAlert } = store.getState();

  removeStateAppListener({
    appStateListener: timerRunningValues.appStateListener,
  });

  stateMusic.music.audioPlayerState?.removeAllListeners("playbackStatusUpdate");

  stateMusic.music.audioPlayerState?.pause();

  stateMusic.music.audioPlayerState?.seekTo(0);

  stopIntervalTimer({ timerInterval: timerRunningValues.timerInterval });

  dispatch(changeIsPaused(false));

  dispatch(changeIsPlay(false));

  dispatch(changeTotalValue(0));

  timerPauseOrResume({ isGoingToPause: false });

  sequenceTimer(false);

  if (stateAlert.isAlert) {
    stateAlert.alertSoundPlayer?.seekTo(0);

    stateAlert.alertSoundPlayer?.play();
  }

  notifee.cancelAllNotifications();
}
