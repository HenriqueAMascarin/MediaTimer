import {
  displayTimerNotificationType,
  requestPermissionAndShowNotification,
} from "@src/components/Timer/timerUtils/notificationUtils";
import { store } from "@src/components/Utils/Redux/store";
import { timerPauseOrResume } from "@src/components/Timer/TimerAnimations/timerPauseOrResume";
import { stopIntervalTimer } from "@src/components/Timer/timerUtils/stopTimerUtils";
import { removeStateAppListener } from "@src/components/Timer/timerUtils/removeAppStateListener";
import { changeIsPaused } from "@src/components/Utils/Redux/features/stateTimer-slice";
import { statesMusicType } from "@src/components/Utils/Redux/features/statesMusic-slice";
import { timerRunningValuesType } from "@src/components/Utils/Redux/features/timerRunningValues-slice";

const dispatch = store.dispatch;

type pauseTimerType = {
  timerProperties: {
    audioPlayerState: statesMusicType["music"]["audioPlayerState"];
    timerInterval: timerRunningValuesType["timerInterval"];
    appStateListener: timerRunningValuesType["appStateListener"];
  };
  translateTextFunction: displayTimerNotificationType['translateTextFunction']
};

export function pauseOrResumeTimerAnimation(isGoingToPause: boolean) {
  timerPauseOrResume({ isGoingToPause });
}

export function pauseTimer({
  timerProperties,
  translateTextFunction,
}: pauseTimerType) {
  dispatch(changeIsPaused(true));

  pauseOrResumeTimerAnimation(true);

  timerProperties.audioPlayerState?.pause();

  stopIntervalTimer({ timerInterval: timerProperties.timerInterval });

  removeStateAppListener({
    appStateListener: timerProperties.appStateListener,
  });

  requestPermissionAndShowNotification({timerTimestamp: 0, translateTextFunction});
}
