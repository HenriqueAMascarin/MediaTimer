import {
  startNotificationAndTimer,
  startNotificationAndTimerInterface,
} from "@src/components/Timer/timerUtils/startNotificationAndTimer";
import { timerPauseOrResume } from "@src/components/Timer/TimerAnimations/timerPauseOrResume";
import { store } from "@src/components/Utils/Redux/store";
import { changeIsPaused } from "@src/components/Utils/Redux/features/stateTimer-slice";

const dispatch = store.dispatch;

interface resumeTimerInterface
  extends Omit<startNotificationAndTimerInterface, "timerTimestamp"> {
  runningValueTimestamp: number;
}

export default async function resumeTimer({
  runningValueTimestamp,
  timerStates,
  translateTextFunction,
}: resumeTimerInterface) {
  dispatch(changeIsPaused(false));

  timerPauseOrResume({ isGoingToPause: false });

  timerStates.audioPlayerState?.play();

  await startNotificationAndTimer({
    translateTextFunction,
    timerTimestamp: runningValueTimestamp,
    timerStates,
  });
}
