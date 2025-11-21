import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from "@notifee/react-native";
import { changeIsPlay } from "@src/components/Utils/Redux/features/stateTimer-slice";
import { store } from "@src/components/Utils/Redux/store";
import { TFunction } from "i18next";

export type displayTimerNotificationType = {
  timerTimestamp: number;
  translateTextFunction: TFunction<"translation", undefined>;
  isPaused?: boolean;
};

const dispatch = store.dispatch;

async function returnChannelId() {
  const channelId = await notifee.createChannel({
    id: "Timer Channel",
    name: "Timer Channel",
    importance: AndroidImportance.LOW,
    vibration: false,
    bypassDnd: false,
    visibility: AndroidVisibility.PUBLIC,
  });

  return channelId;
}

async function displayTimerNotification({
  timerTimestamp,
  translateTextFunction,
  isPaused = false,
}: displayTimerNotificationType) {
  const channelId = await returnChannelId();

  let newCustomTitle = isPaused
    ? translateTextFunction("notification.timerIsPaused")
    : translateTextFunction("notification.timerInProgress");

  await notifee
    .displayNotification({
      title: newCustomTitle,
      body: translateTextFunction("notification.dragToCancel"),
      id: "MediaTimer",
      android: {
        channelId,
        autoCancel: false,
        importance: AndroidImportance.LOW,
        pressAction: {
          id: "default",
        },
        smallIcon: "ic_media_timer",
        color: "#149CFF",
        visibility: AndroidVisibility.PUBLIC,
        showChronometer: !isPaused && true,
        chronometerDirection: "down",
        // timestamp * 1000 convertion to utc
        timestamp: isPaused ? undefined : Date.now() + timerTimestamp * 1000,
      },
    })
    .catch(() => dispatch(changeIsPlay(false)));
}

export async function requestPermissionAndShowNotification({
  timerTimestamp,
  translateTextFunction,
  isPaused,
}: displayTimerNotificationType) {
  await notifee.requestPermission();

  await displayTimerNotification({
    translateTextFunction,
    timerTimestamp,
    isPaused,
  });
}
