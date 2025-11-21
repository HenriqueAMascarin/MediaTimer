import {
  changeBackgroundTimerTimeout,
  changeInternalTimerInterval,
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
import { timerPauseOrResume } from "@src/components/Timer/animations/timerPauseOrResume";
import { sequenceTimer } from "@src/components/Timer/animations/timerSequence";
import { removeStateAppListener } from "@src/components/Timer/timerUtils/removeAppStateListener";

const dispatch = store.dispatch;

type stopIntervalTimerType = {
  timers: timerRunningValuesType["timers"];
};

export function removeClocks({ timers }: stopIntervalTimerType) {
  if (timers.internalTimerInterval) {
    clearInterval(timers.internalTimerInterval);

    dispatch(changeInternalTimerInterval(null));
  }

  if (timers.backgroundTimerTimeout) {
    BackgroundTimer.clearTimeout(timers.backgroundTimerTimeout);
    
    dispatch(changeBackgroundTimerTimeout(null));
  }
}

export function stopTimer() {
  const { timerRunningValues, stateMusic, stateAlert } = store.getState();

  removeClocks({ timers: timerRunningValues.timers });

  removeStateAppListener({
    appStateListener: timerRunningValues.appStateListener,
  });

  stateMusic.music.audioPlayerState?.pause();

  stateMusic.music.audioPlayerState?.seekTo(0);

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
