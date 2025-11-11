import { requestPermissionAndShowNotification } from "@src/components/Timer/timerUtils/notificationUtils";
import { store } from "@src/components/Utils/Redux/store";
import { timerPauseOrResume } from "@src/components/Timer/TimerAnimations/timerPauseOrResume";
import { stopIntervalTimer } from "@src/components/Timer/timerUtils/stopTimerUtils";
import { removeStateAppListener } from "@src/components/Timer/timerUtils/removeAppStateListener";
import { changeIsPaused } from "@src/components/Utils/Redux/features/stateTimer-slice";
import { statesMusicType } from "@src/components/Utils/Redux/features/statesMusic-slice";
import { timerRunningValuesType } from "@src/components/Utils/Redux/features/timerRunningValues-slice";

const dispatch = store.dispatch;

type pauseTimerType = {
  audioPlayerState: statesMusicType["music"]["audioPlayerState"];
  timerInterval: timerRunningValuesType["timerInterval"];
  appStateListener: timerRunningValuesType["appStateListener"];
};

export function pauseOrResumeTimerAnimation(isGoingToPause: boolean) {
  timerPauseOrResume({ isGoingToPause });
}

export function pauseTimer({
  audioPlayerState,
  notificationProperties
  timerInterval,
  appStateListener,
}: pauseTimerType) {
  dispatch(changeIsPaused(true));

  pauseOrResumeTimerAnimation(true);

  audioPlayerState?.pause();

  stopIntervalTimer({ timerInterval });

  removeStateAppListener({ appStateListener });

  requestPermissionAndShowNotification({
    timerTimestamp: 0,
    isPaused: true,
  });
}
