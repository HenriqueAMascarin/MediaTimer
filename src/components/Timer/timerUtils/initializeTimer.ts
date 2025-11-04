import { sequenceTimer } from "@src/components/Timer/TimerAnimations/TimerSequence";
import { changeIsHistory } from "@src/components/Utils/Redux/features/stateHistory-slice";
import {
  changeIsSelection,
  statesMusicType,
} from "@src/components/Utils/Redux/features/statesMusic-slice";
import {
  changeRunningValueTimestamp,
  changeTotalValue,
} from "@src/components/Utils/Redux/features/timerValues-slice";
import { store } from "@src/components/Utils/Redux/store";
import { startNotificationAndTimer } from './startNotificationAndTimer';

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
  const timestampValue = numberHours + numberMinutes + numberSeconds;

  return { timestampValue };
}

function closeMenus() {
  dispatch(changeIsSelection(false));

  dispatch(changeIsHistory(false));
}

export async function initializeTimer(
  { firstListValue, secondListValue, thirdListValue }: playTimerType,
  { musicLink, audioPlayerState }: statesMusicType["music"]
) {
  if (firstListValue != 0 || secondListValue != 0 || thirdListValue != 0) {
    const { timestampValue } = formatTimestampTimer({
      firstListValue,
      secondListValue,
      thirdListValue,
    });

    closeMenus();

    if (musicLink != null) {
      const sound =
        typeof musicLink == "string" ? { uri: musicLink } : musicLink;

      audioPlayerState.replace(sound);

      // Loop for audio on finish
      audioPlayerState.addListener(
        "playbackStatusUpdate",
        ({ didJustFinish }) => {
          if (didJustFinish == true) {
            audioPlayerState.seekTo(0);
          }
        }
      );

      audioPlayerState.play();
    } else {
      // set no audio for audioPlayerState
      audioPlayerState.replace("");
    }

    dispatch(changeTotalValue(timestampValue));

    dispatch(changeRunningValueTimestamp(timestampValue));

    sequenceTimer(true);

    await startNotificationAndTimer(timestampValue);
  }
}
