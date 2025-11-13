import {
  displayTimerNotificationType,
  requestPermissionAndShowNotification,
} from "@src/components/Timer/timerUtils/notificationUtils";
import { store } from "@src/components/Utils/Redux/store";
import { timerPauseOrResume } from "@src/components/Timer/TimerAnimations/timerPauseOrResume";
import { stopIntervalTimer } from "@src/components/Timer/timerUtils/stopTimerUtils";
import { removeStateAppListener } from "@src/components/Timer/timerUtils/removeAppStateListener";
import { changeIsPaused } from "@src/components/Utils/Redux/features/stateTimer-slice";

const dispatch = store.dispatch;

type pauseTimerType = {
  translateTextFunction: displayTimerNotificationType["translateTextFunction"];
};

export function pauseOrResumeTimerAnimation(isGoingToPause: boolean) {
  timerPauseOrResume({ isGoingToPause });
}

export function pauseTimer({
  translateTextFunction,
}: pauseTimerType) {
  const { stateMusic, timerRunningValues } = store.getState();

  dispatch(changeIsPaused(true));

  pauseOrResumeTimerAnimation(true);

  stateMusic.music.audioPlayerState?.pause();

  stopIntervalTimer({ timerInterval: timerRunningValues.timerInterval });

  removeStateAppListener({
    appStateListener: timerRunningValues.appStateListener,
  });

  requestPermissionAndShowNotification({
    timerTimestamp: 0,
    translateTextFunction,
    isPaused: true,
  });
}
