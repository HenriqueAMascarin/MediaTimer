import {
  startNotificationAndTimer,
  startNotificationAndTimerType,
} from "@src/components/Timer/timerUtils/startNotificationAndTimer";
import { timerPauseOrResume } from "@src/components/Timer/TimerAnimations/timerPauseOrResume";
import { store } from "@src/components/Utils/Redux/store";
import { changeIsPaused } from "@src/components/Utils/Redux/features/stateTimer-slice";
import { statesMusicType } from "@src/components/Utils/Redux/features/statesMusic-slice";

const dispatch = store.dispatch;

type resumeTimerType = {
  runningValueTimestamp: number;
  timerStates: startNotificationAndTimerType['timerStates'];
};

export default async function resumeTimer({
  runningValueTimestamp,
  timerStates,
}: resumeTimerType) {
  dispatch(changeIsPaused(false));

  timerPauseOrResume({ isGoingToPause: false });

  timerStates.audioPlayerState?.play();

  await startNotificationAndTimer({ timerTimestamp: runningValueTimestamp, timerStates });
}
