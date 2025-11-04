import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from "@notifee/react-native";
import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";
import { changeIsPlay } from "@src/components/Utils/Redux/features/stateTimer-slice";
import { store } from "@src/components/Utils/Redux/store";

type displayTimerNotificationType = {
  channelId: string;
  totalTimerTimestamp: number;
  customTitle?: string;
  isPaused?: boolean;
};

const { translateText } = useTextTranslation();

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
  channelId,
  totalTimerTimestamp,
  customTitle = translateText("notification.timerInProgress"),
  isPaused = false,
}: displayTimerNotificationType) {
  await notifee
    .displayNotification({
      title: customTitle,
      body: translateText("notification.dragToCancel"),
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
        timestamp: isPaused
          ? undefined
          : Date.now() + totalTimerTimestamp * 1000,
      },
    })
    .catch((error) => {
      if (error != null) {
        dispatch(changeIsPlay(false));
      }
    });
}

export async function requestPermissionAndShowNotification(
  totalTimerTimestamp: number
) {
  await notifee.requestPermission();

  const channelId = await returnChannelId();

  await displayTimerNotification({ channelId, totalTimerTimestamp });
}
