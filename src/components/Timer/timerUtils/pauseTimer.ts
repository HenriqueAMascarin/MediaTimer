import { requestPermissionAndShowNotification } from "@src/components/Timer/timerUtils/notificationUtils";
import { store } from "@src/components/Utils/Redux/store";
import { timerPauseOrResume } from "@src/components/Timer/TimerAnimations/timerPauseOrResume";
import { stopIntervalTimer } from "@src/components/Timer/timerUtils/stopTimerUtils";
import { removeStateAppListener } from "@src/components/Timer/timerUtils/removeAppStateListener";

export function pauseOrResumeTimerAnimation(isGoingToPause: boolean) {
  timerPauseOrResume({isGoingToPause: true});
}

export function pauseTimer() {
  const { audioPlayerState } = store.getState().stateMusic.music;

  pauseOrResumeTimerAnimation(true);

  audioPlayerState?.pause();

  stopIntervalTimer();

  removeStateAppListener();

  requestPermissionAndShowNotification({
    totalTimerTimestamp: 0,
    isPaused: true,
  });
}
