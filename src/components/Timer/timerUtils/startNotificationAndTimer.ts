import {
  changeAppStateListener,
  changeBackgroundTimerTimeout,
  changeInternalTimerInterval,
  changeRunningValueTimestamp,
} from "@src/components/Utils/Redux/features/timerRunningValues-slice";
import {
  displayTimerNotificationType,
  requestPermissionAndShowNotification,
} from "@src/components/Timer/timerUtils/notificationUtils";
import { store } from "@src/components/Utils/Redux/store";
import { AppState } from "react-native";
import {
  stopTimer,
  removeClocks,
} from "@src/components/Timer/timerUtils/stopTimerUtils";
import { changeIsPlay } from "@src/components/Utils/Redux/features/stateTimer-slice";
import { BackgroundTimer } from 'react-native-nitro-bg-timer'

const dispatch = store.dispatch;

export interface startNotificationAndTimerInterface
  extends Omit<displayTimerNotificationType, "isPaused"> {}

export async function startNotificationAndTimer({
  timerTimestamp,
  translateTextFunction,
}: startNotificationAndTimerInterface) {
  await requestPermissionAndShowNotification({
    timerTimestamp,
    translateTextFunction,
  });

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
      changeInternalTimerInterval(
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
        const { stateTimer, timerRunningValues } = store.getState();

        if (stateTimer.isPlay) {
          removeClocks({
            timers: timerRunningValues.timers,
          });

          if (state == "background") {
            // * 1000 to transform to ms
            const timestampToAlert = timeLeftToAlert() * 1000;
            
            dispatch(
              changeBackgroundTimerTimeout(
                BackgroundTimer.setTimeout(async () => {
                  stopTimer();
                }, timestampToAlert)
              )
            );
          } else if (state == "active") {
            playTimerInternal();
          }
        }
      })
    )
  );

  dispatch(changeIsPlay(true));
}
