import { requestPermissionAndShowNotification } from "@src/components/Timer/timerUtils/notificationUtils";
import { store } from "@src/components/Utils/Redux/store";
import { timerPauseOrResume } from "@src/components/Timer/TimerAnimations/timerPauseOrResume";
import { stopIntervalTimer } from "@src/components/Timer/timerUtils/stopTimerUtils";
import { removeStateAppListener } from "@src/components/Timer/timerUtils/removeAppStateListener";
import { changeIsPaused } from "@src/components/Utils/Redux/features/stateTimer-slice";

const dispatch = store.dispatch;

export function pauseOrResumeTimerAnimation(isGoingToPause: boolean) {
  timerPauseOrResume({ isGoingToPause: true });
}

export function pauseTimer() {
  const { audioPlayerState } = store.getState().stateMusic.music;

  dispatch(changeIsPaused(true));

  pauseOrResumeTimerAnimation(true);

  audioPlayerState?.pause();

  stopIntervalTimer();

  removeStateAppListener();

  requestPermissionAndShowNotification({
    timerTimestamp: 0,
    isPaused: true,
  });
}
