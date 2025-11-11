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

export type stopTimerType = {
  alertValues: {
    isAlert: stateAlertType["isAlert"];
    alertSoundPlayer: stateAlertType["alertSoundPlayer"];
  };
  audioPlayerState: statesMusicType["music"]["audioPlayerState"];
  timerLogicStates: {
    timerInterval: timerRunningValuesType["timerInterval"];
    appStateListener: timerRunningValuesType["appStateListener"];
  };
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
  alertValues,
  audioPlayerState,
  timerLogicStates,
}: stopTimerType) {
  audioPlayerState?.removeAllListeners("playbackStatusUpdate");

  audioPlayerState?.pause();

  audioPlayerState?.seekTo(0);

  notifee.cancelAllNotifications();

  stopIntervalTimer({ timerInterval: timerLogicStates.timerInterval });
  removeStateAppListener({ appStateListener: timerLogicStates.appStateListener });

  dispatch(changeIsPaused(false));
  dispatch(changeIsPlay(false));
  dispatch(changeTotalValue(0));

  timerPauseOrResume({ isGoingToPause: false });
  sequenceTimer(false);

  if (alertValues.isAlert && alertValues.alertSoundPlayer) {
    alertValues.alertSoundPlayer?.seekTo(0);

    alertValues.alertSoundPlayer?.play();
  }
}
