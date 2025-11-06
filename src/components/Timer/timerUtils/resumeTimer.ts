import {
  startNotificationAndTimer,
  startNotificationAndTimerType,
} from "@src/components/Timer/timerUtils/startNotificationAndTimer";
import { timerPauseOrResume } from "@src/components/Timer/TimerAnimations/timerPauseOrResume";
import { store } from "@src/components/Utils/Redux/store";

export default async function resumeTimer({
  totalTimerTimestamp,
}: startNotificationAndTimerType) {
  const { audioPlayerState } = store.getState().stateMusic.music;

  timerPauseOrResume({ isGoingToPause: false });

  audioPlayerState?.play();

  await startNotificationAndTimer({ totalTimerTimestamp });
}
