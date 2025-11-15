import { sequenceTimer } from "@src/components/Timer/TimerAnimations/timerSequence";
import { changeIsHistory } from "@src/components/Utils/Redux/features/stateHistory-slice";
import { changeIsSelection } from "@src/components/Utils/Redux/features/statesMusic-slice";
import {
  changeRunningValueTimestamp,
  changeTotalValue,
} from "@src/components/Utils/Redux/features/timerRunningValues-slice";
import { store } from "@src/components/Utils/Redux/store";
import { startNotificationAndTimer } from "@src/components/Timer/timerUtils/startNotificationAndTimer";
import { displayTimerNotificationType } from "@src/components/Timer/timerUtils/notificationUtils";
import { listTimerCurrentValuesType } from "@src/components/Utils/Redux/features/listTimerCurrentValues-slice";

type initializeTimerType = {
  translateTextFunction: displayTimerNotificationType["translateTextFunction"];
};

const dispatch = store.dispatch;

function closeMenus() {
  dispatch(changeIsSelection(false));

  dispatch(changeIsHistory(false));
}

function formatTimestampTimer({
  listOneCurrentNumber,
  listTwoCurrentNumber,
  listThreeCurrentNumber,
}: listTimerCurrentValuesType) {
  const numberHours = listOneCurrentNumber * 3600;
  const numberMinutes = listTwoCurrentNumber * 60;
  const numberSeconds = listThreeCurrentNumber;
  const totalTimerTimestamp = numberHours + numberMinutes + numberSeconds;

  return { totalTimerTimestamp };
}

export async function initializeTimer({
  translateTextFunction,
}: initializeTimerType) {
  const { stateMusic, listTimerCurrentValues } = store.getState();

  if (
    listTimerCurrentValues.listOneCurrentNumber != 0 ||
    listTimerCurrentValues.listTwoCurrentNumber != 0 ||
    listTimerCurrentValues.listThreeCurrentNumber != 0
  ) {
    const musicLink = stateMusic.music.musicLink;

    const { totalTimerTimestamp } = formatTimestampTimer({
      ...listTimerCurrentValues,
    });

    closeMenus();

    if (stateMusic.music.audioPlayerState) {
      if (musicLink != null) {
        const sound =
          typeof musicLink == "string" ? { uri: musicLink } : musicLink;

        stateMusic.music.audioPlayerState.replace(sound);

        const notHasListenerPlaybackStatusUpdate =
          stateMusic.music.audioPlayerState.listenerCount(
            "playbackStatusUpdate"
          ) <= 0;

        if (notHasListenerPlaybackStatusUpdate) {
          // Loop for audio on finish
          stateMusic.music.audioPlayerState?.addListener(
            "playbackStatusUpdate",
            ({ didJustFinish }) => {
              if (didJustFinish == true) {
                stateMusic.music.audioPlayerState?.seekTo(0);
              }
            }
          );
        }

        stateMusic.music.audioPlayerState.play();
      } else {
        // set no audio for audioPlayerState
        stateMusic.music.audioPlayerState?.replace("");
      }
    }

    dispatch(changeTotalValue(totalTimerTimestamp));

    dispatch(changeRunningValueTimestamp(totalTimerTimestamp));

    sequenceTimer(true);

    await startNotificationAndTimer({
      timerTimestamp: totalTimerTimestamp,
      translateTextFunction,
    });
  }
}
