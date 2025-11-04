import {
  changeAppStateListener,
  changeRunningValueTimestamp,
  changeTimerInterval,
} from "@src/components/Utils/Redux/features/timerValues-slice";
import { requestPermissionAndShowNotification } from "@src/components/Timer/timerUtils/notificationUtils";
import { store } from "@src/components/Utils/Redux/store";
import { AppState } from "react-native";
import BackgroundTimer from "react-native-background-timer";
import { stopTimerInterval } from "@src/components/Timer/timerUtils/stopTimerInterval";

const dispatch = store.dispatch;

export async function startNotificationAndTimer(totalTimerTimestamp: number) {
  await requestPermissionAndShowNotification(totalTimerTimestamp);

  const timeNow = () => {
    return Math.round(Date.now() / 1000);
  };

  const initialTimeToAlert = timeNow() + totalTimerTimestamp;

  const timeLeftToAlert = () => {
    const newTimeNow = timeNow();

    return initialTimeToAlert - newTimeNow;
  };

  function playTimerInternal() {
    dispatch(
      changeTimerInterval(
        setInterval(() => {
          const newTimeLeftToAlert = timeLeftToAlert();

          if (newTimeLeftToAlert <= 0) {
          } else {
            dispatch(changeRunningValueTimestamp(newTimeLeftToAlert));
          }
        }, 1000)
      )
    );
  }

  playTimerInternal();

  dispatch(
    changeAppStateListener(
      AppState.addEventListener("change", (state) => {
        const { stateTimer } = store.getState();

        if (stateTimer.isPlay) {
          stopTimerInterval();

          if (state == "background") {
            // * 1000 to transform to ms
            const timestampToAlert = timeLeftToAlert() * 1000;

            BackgroundTimer.runBackgroundTimer(async () => {
              dispatch(changeIsPlay(false));
            }, timestampToAlert);
          } else if (state == "active") {
            playTimerInternal();
          }
        }
      })
    )
  );
}
