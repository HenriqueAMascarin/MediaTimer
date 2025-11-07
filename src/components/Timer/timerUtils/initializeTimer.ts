import { sequenceTimer } from "@src/components/Timer/TimerAnimations/timerSequence";
import { changeIsHistory } from "@src/components/Utils/Redux/features/stateHistory-slice";
import {
  changeIsSelection,
  statesMusicType,
} from "@src/components/Utils/Redux/features/statesMusic-slice";
import {
  changeRunningValueTimestamp,
  changeTotalValue,
} from "@src/components/Utils/Redux/features/timerRunningValues-slice";
import { store } from "@src/components/Utils/Redux/store";
import { startNotificationAndTimer } from "@src/components/Timer/timerUtils/startNotificationAndTimer";

type playTimerType = {
  firstListValue: number;
  secondListValue: number;
  thirdListValue: number;
};

const dispatch = store.dispatch;

function formatTimestampTimer({
  firstListValue,
  secondListValue,
  thirdListValue,
}: playTimerType) {
  const numberHours = firstListValue * 3600;
  const numberMinutes = secondListValue * 60;
  const numberSeconds = thirdListValue;
  const totalTimerTimestamp = numberHours + numberMinutes + numberSeconds;

  return { totalTimerTimestamp };
}

function closeMenus() {
  dispatch(changeIsSelection(false));

  dispatch(changeIsHistory(false));
}

export async function initializeTimer(
  { firstListValue, secondListValue, thirdListValue }: playTimerType,
  { audioPlayerState, musicLink }: statesMusicType["music"]
) {
  if (firstListValue != 0 || secondListValue != 0 || thirdListValue != 0) {
    const { totalTimerTimestamp } = formatTimestampTimer({
      firstListValue,
      secondListValue,
      thirdListValue,
    });

    closeMenus();

    if (musicLink != null) {
      const sound =
        typeof musicLink == "string" ? { uri: musicLink } : musicLink;

      audioPlayerState?.replace(sound);

      // Loop for audio on finish
      audioPlayerState?.addListener(
        "playbackStatusUpdate",
        ({ didJustFinish }) => {
          if (didJustFinish == true) {
            audioPlayerState?.seekTo(0);
          }
        }
      );

      audioPlayerState?.play();
    } else {
      // set no audio for audioPlayerState
      audioPlayerState?.replace("");
    }

    dispatch(changeTotalValue(totalTimerTimestamp));

    dispatch(changeRunningValueTimestamp(totalTimerTimestamp));

    sequenceTimer(true);

    await startNotificationAndTimer({ timerTimestamp: totalTimerTimestamp });
  }
}
