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
import { stopTimerType } from "@src/components/Timer/timerUtils/stopTimerUtils";
import { displayTimerNotificationType } from "@src/components/Timer/timerUtils/notificationUtils";

type playTimerType = {
  firstListValue: number;
  secondListValue: number;
  thirdListValue: number;
};

type initializeTimerType = {
  timerValues: playTimerType;
  timerStates: stopTimerType;
  translateTextFunction: displayTimerNotificationType["translateTextFunction"];
  musicLink: statesMusicType["music"]["musicLink"];
};

const dispatch = store.dispatch;

function closeMenus() {
  dispatch(changeIsSelection(false));

  dispatch(changeIsHistory(false));
}

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

export async function initializeTimer({
  timerValues,
  timerStates,
  translateTextFunction,
  musicLink,
}: initializeTimerType) {
  if (
    timerValues.firstListValue != 0 ||
    timerValues.secondListValue != 0 ||
    timerValues.thirdListValue != 0
  ) {
    const { totalTimerTimestamp } = formatTimestampTimer({
      ...timerValues,
    });

    closeMenus();

    if (musicLink != null) {
      const sound =
        typeof musicLink == "string" ? { uri: musicLink } : musicLink;

      timerStates.audioPlayerState?.replace(sound);

      // Loop for audio on finish
      timerStates.audioPlayerState?.addListener(
        "playbackStatusUpdate",
        ({ didJustFinish }) => {
          if (didJustFinish == true) {
            timerStates.audioPlayerState?.seekTo(0);
          }
        }
      );

      timerStates.audioPlayerState?.play();
    } else {
      // set no audio for audioPlayerState
      timerStates.audioPlayerState?.replace("");
    }

    dispatch(changeTotalValue(totalTimerTimestamp));

    dispatch(changeRunningValueTimestamp(totalTimerTimestamp));

    sequenceTimer(true);

    await startNotificationAndTimer({
      timerTimestamp: totalTimerTimestamp,
      timerStates,
      translateTextFunction,
    });
  }
}
