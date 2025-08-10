import { useEffect, useRef, useState } from "react";

import { AppState, NativeEventSubscription } from "react-native";

import {
  changeIsPaused,
  changeIsPickingValue,
  changeIsPlay,
} from "../../Utils/Redux/features/stateTimer-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../Utils/Redux/reduxHookCustom";
import { changeIsSelection } from "@src/components/Utils/Redux/features/statesMusic-slice";
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from "@notifee/react-native";
import BackgroundTimer from "react-native-background-timer";

import { setAudioModeAsync, AudioPlayer, useAudioPlayer } from "expo-audio";
import {
  changeRunningValueTimestamp,
  changeTotalValue,
} from "@src/components/Utils/Redux/features/timerValues-slice";
import { sequenceTimer } from "../TimerAnimations/TimerSequence";
import { timerPause } from "../TimerAnimations/TimerPause";
import { changeIsHistory } from "@src/components/Utils/Redux/features/stateHistory-slice";

import { useTranslation } from "react-i18next";

type dataType = {
  listOneValue: React.RefObject<number>;
  listTwoValue: React.RefObject<number>;
  listThreeValue: React.RefObject<number>;
};

export default function StateManagement({
  listOneValue,
  listTwoValue,
  listThreeValue,
}: dataType) {
  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);

  const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);

  const timerValues = useAppSelector(({ timerValues }) => timerValues);

  const stateAlert = useAppSelector(({ stateAlert }) => stateAlert);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [havePlayed, changeHavePlayed] = useState(false);

  const soundRef = useAudioPlayer();

  const timerFinalSound = useAudioPlayer(require("@assets/sounds/timer.mp3"));

  let refAppListener = useRef<NativeEventSubscription>(undefined);

  let inAppTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (async function initial() {
      await setAudioModeAsync({
        shouldPlayInBackground: true,
        interruptionMode: "doNotMix",
        playsInSilentMode: true,
        interruptionModeAndroid: "doNotMix",
        allowsRecording: false,
        shouldRouteThroughEarpiece: false,
      });
    })();
  }, []);

  useEffect(() => {
    if (stateAlert.isAlert) {
      timerFinalSound.addListener(
        "playbackStatusUpdate",
        async (playbackStatus) => {
          if (playbackStatus.isLoaded && playbackStatus.didJustFinish) {
            timerFinalSound.removeAllListeners("playbackStatusUpdate");

            timerFinalSound.pause();

            timerFinalSound.seekTo(0);
          }
        }
      );
    }
  }, [stateAlert.isAlert]);

  function playTimer() {
    const numberHours = listOneValue.current * 3600;
    const numberMinutes = listTwoValue.current * 60;
    const numberSeconds = listThreeValue.current;
    const timestampValue = numberHours + numberMinutes + numberSeconds;

    dispatch(changeTotalValue(timestampValue));
    dispatch(changeRunningValueTimestamp(timestampValue));
    sequenceTimer(true);

    return timestampValue;
  }

  function stopTimer() {
    stopTimerInterval();
    stopStateAppListener();

    dispatch(changeIsPickingValue(false));
    dispatch(changeIsPaused(false));
    dispatch(changeTotalValue(0));

    sequenceTimer(false);
    timerPause(false);
  }

  function stopTimerInterval() {
    BackgroundTimer.stopBackgroundTimer();

    if (inAppTimer.current) {
      clearInterval(inAppTimer.current);
    }
    inAppTimer.current = null;
  }

  function stopStateAppListener() {
    refAppListener.current?.remove();

    refAppListener.current = undefined;
  }

  function pauseTimerAnimation() {
    const isPaused = stateTimer.isPaused;
    timerPause(isPaused);
  }

  async function createNotification(
    channelId: string,
    timestamp: number,
    customTitle: string = t("notification.timerInProgress"),
    isPaused: boolean = false
  ) {
    await notifee.displayNotification({
      title: customTitle,
      body: t("notification.dragToCancel"),
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
        timestamp: isPaused ? undefined : Date.now() + timestamp * 1000,
      },
    });
  }

  async function createChannelId() {
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

  async function onDisplayNotification(newTotalValue: number) {
    await notifee.requestPermission();

    const channelId = await createChannelId();

    await createNotification(channelId, newTotalValue);

    const timeNow = () => {
      return Math.round(Date.now() / 1000);
    };

    const timeNowToAlert = (newTimeNow = timeNow()) => {
      return newTimeNow + newTotalValue;
    };

    const initialTimeToAlert = timeNowToAlert();

    const timeLeftToAlert = (newTimeNow = timeNow()) => {
      return initialTimeToAlert - newTimeNow;
    };

    const timeout = 1000;

    function playTimerInternal() {
      inAppTimer.current = setInterval(() => {
        dispatch(changeRunningValueTimestamp(timeLeftToAlert()));
      }, timeout);
    }

    playTimerInternal();

    refAppListener.current = AppState.addEventListener("change", (state) => {
      if (stateTimer.isPlay && stateTimer.isPaused == false) {
        stopTimerInterval();

        if (state == "background") {
          // * 1000 to transform to ms
          const timestampToAlert = timeLeftToAlert(timeNow()) * 1000;

          BackgroundTimer.runBackgroundTimer(async () => {
            dispatch(changeIsPlay(false));
          }, timestampToAlert);
        } else if (state == "active") {
          playTimerInternal();
        }
      }
    });
  }

  useEffect(() => {
    if (stateTimer.isPickingValue && !stateTimer.isPlay) {
      if (
        listOneValue.current != 0 ||
        listTwoValue.current != 0 ||
        listThreeValue.current != 0
      ) {
        changeHavePlayed(true);
        dispatch(changeIsPlay(true));
      } else {
        dispatch(changeIsPickingValue(false));
      }
    }
  }, [stateTimer.isPickingValue]);

  useEffect(() => {
    if (havePlayed) {
      if (stateTimer.isPlay) {
        (async function play() {
          dispatch(changeIsSelection(false));

          dispatch(changeIsHistory(false));

          if (stateMusic.musicLink != null) {
            const sound =
              typeof stateMusic.musicLink == "string"
                ? { uri: stateMusic.musicLink }
                : stateMusic.musicLink;

            soundRef.replace(sound);

            soundRef.addListener(
              "playbackStatusUpdate",
              ({ didJustFinish }) => {
                if (didJustFinish == true) {
                  soundRef.seekTo(0);
                }
              }
            );

            soundRef.play();
          }

          const totalValue = playTimer();

          await onDisplayNotification(totalValue);
        })();
      } else {
        soundRef.removeAllListeners("playbackStatusUpdate");

        soundRef.pause();

        soundRef.seekTo(0);

        notifee.cancelAllNotifications();

        stopTimer();

        if (stateAlert.isAlert) {
          timerFinalSound.seekTo(0);

          timerFinalSound.play();
        }
      }
    }
  }, [stateTimer.isPlay]);

  useEffect(() => {
    (async () => {
      if (stateTimer.isPlay && havePlayed) {
        pauseTimerAnimation();

        if (stateTimer.isPaused) {
          soundRef.pause();

          stopTimerInterval();

          stopStateAppListener();

          const channelId = await createChannelId();

          createNotification(
            channelId,
            0,
            t("notification.timerIsPaused"),
            true
          );
        } else {
          onDisplayNotification(timerValues.runningValueTimestamp);
          soundRef.play();
        }
      }
    })();
  }, [stateTimer.isPaused]);

  useEffect(() => {
    if (havePlayed) {
      if (timerValues.runningValueTimestamp <= 0 || !stateTimer.isPlay) {
        dispatch(changeIsPlay(false));
      }
    }
  }, [timerValues.runningValueTimestamp]);

  return <></>;
}
