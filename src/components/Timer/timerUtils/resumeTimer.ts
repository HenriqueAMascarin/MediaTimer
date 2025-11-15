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
}

export default async function resumeTimer({
  translateTextFunction,
}: resumeTimerInterface) {
  const { stateMusic, timerRunningValues } = store.getState();
  
  dispatch(changeIsPaused(false));

  timerPauseOrResume({ isGoingToPause: false });

  stateMusic.music.audioPlayerState?.play();

  await startNotificationAndTimer({
    translateTextFunction,
    timerTimestamp: timerRunningValues.runningValueTimestamp,
  });
}
