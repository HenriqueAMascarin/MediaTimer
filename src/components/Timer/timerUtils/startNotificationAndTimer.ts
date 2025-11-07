import {
  changeAppStateListener,
  changeRunningValueTimestamp,
  changeTimerInterval,
} from "@src/components/Utils/Redux/features/timerRunningValues-slice";
import { requestPermissionAndShowNotification } from "@src/components/Timer/timerUtils/notificationUtils";
import { store } from "@src/components/Utils/Redux/store";
import { AppState } from "react-native";
import BackgroundTimer from "react-native-background-timer";
import {
  stopIntervalTimer,
  stopTimer,
} from "@src/components/Timer/timerUtils/stopTimerUtils";
import { changeIsPlay } from "@src/components/Utils/Redux/features/stateTimer-slice";

const dispatch = store.dispatch;

export type startNotificationAndTimerType = {
  timerTimestamp: number;
};

export async function startNotificationAndTimer({
  timerTimestamp,
}: startNotificationAndTimerType) {
  await requestPermissionAndShowNotification({ timerTimestamp });

  const timeNow = () => {
    return Math.round(Date.now() / 1000);
  };

  const initialTimeToAlert = timeNow() + timerTimestamp;

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
            stopTimer();
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
        const { isPlay } = store.getState().stateTimer;

        if (isPlay) {
          stopIntervalTimer();

          if (state == "background") {
            // * 1000 to transform to ms
            const timestampToAlert = timeLeftToAlert() * 1000;

            BackgroundTimer.runBackgroundTimer(async () => {
              stopTimer();
            }, timestampToAlert);
          } else if (state == "active") {
            playTimerInternal();
          }
        }
      })
    )
  );

  dispatch(changeIsPlay(true));
}
