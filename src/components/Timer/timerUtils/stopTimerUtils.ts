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
import { stateAlertType } from "@src/components/Utils/Redux/features/stateAlert-slice";
import { statesMusicType } from "@src/components/Utils/Redux/features/statesMusic-slice";

const dispatch = store.dispatch;

type stopTimerType = {
  isAlert: stateAlertType["isAlert"];
  alertSound: stateAlertType["alertSound"];
  audioPlayerState: statesMusicType["music"]["audioPlayerState"];
};

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

export function stopTimer({
  isAlert,
  alertSound
  audioPlayerState,
  timerInterval
}: stopTimerType) {
  audioPlayerState?.removeAllListeners("playbackStatusUpdate");

  audioPlayerState?.pause();

  audioPlayerState?.seekTo(0);

  notifee.cancelAllNotifications();

  stopIntervalTimer({timerInterval: });
  removeStateAppListener();

  dispatch(changeIsPaused(false));
  dispatch(changeIsPlay(false));
  dispatch(changeTotalValue(0));

  timerPauseOrResume({ isGoingToPause: false });
  sequenceTimer(false);

  if (isAlert && alertSound) {
    alertSound?.seekTo(0);

    alertSound?.play();
  }
}
