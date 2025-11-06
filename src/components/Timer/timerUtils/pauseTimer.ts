import {
  requestPermissionAndShowNotification
} from "@src/components/Timer/timerUtils/notificationUtils";
import { store } from "@src/components/Utils/Redux/store";
import { timerPause } from "@src/components/Timer/TimerAnimations/timerPause";
import { stopIntervalTimer } from "@src/components/Timer/timerUtils/stopTimerUtils";
import { removeStateAppListener } from "@src/components/Timer/timerUtils/removeAppStateListener";

function pauseOrResumeTimerAnimation(isGoingToPause: boolean) {
  timerPause(isGoingToPause);
}

export function pauseTimer() {
  const { audioPlayerState } = store.getState().stateMusic.music;

  pauseOrResumeTimerAnimation(true);

  audioPlayerState.pause();

  stopIntervalTimer();

  removeStateAppListener();

  requestPermissionAndShowNotification({
    totalTimerTimestamp: 0,
    isPaused: true,
  });
}
