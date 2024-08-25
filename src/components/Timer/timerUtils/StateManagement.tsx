import { useEffect, useRef, useState } from "react";

import { heightItem } from "../styles/timerStyle";
import { Animated, AppState, NativeEventSubscription } from "react-native";

import { changeIsPaused, changeIsPickingValue, changeIsPlay } from "../../Utils/Redux/features/stateTimer-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../Utils/Redux/reduxHookCustom";
import { changeIsSelection, changeIsSelectionYoutube } from "@src/components/Utils/Redux/features/statesMusic-slice";
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import BackgroundTimer from 'react-native-background-timer';

import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { changeRunningValueTimestamp, changeTotalValue } from "@src/components/Utils/Redux/features/timerValues-slice";
import { sequenceTimer } from "../TimerAnimations/TimerSequence";
import { timerPause } from "../TimerAnimations/TimerPause";
import { changeIsHistory } from "@src/components/Utils/Redux/features/stateHistory-slice";

interface StateManagement {
  listOneValue: Animated.Value;
  listTwoValue: Animated.Value;
  listThreeValue: Animated.Value;
}

export default function StateManagement(values: StateManagement) {

  const [havePlayed, changeHavePlayed] = useState(false);

  const soundRef = useRef<Audio.Sound>();

  const timerFinalSound = useRef<Audio.Sound>();

  let refAppListener = useRef<NativeEventSubscription>();

  let inAppTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerFinalSound.current == undefined) {
      (async function initial() {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false,
        })

        const { sound: timerClock } = await Audio.Sound.createAsync(require('@assets/sounds/timer.mp3'));
        timerFinalSound.current = timerClock;

        timerFinalSound.current?.setOnPlaybackStatusUpdate(async (playbackStatus) => {
          if (playbackStatus.isLoaded && playbackStatus.didJustFinish) {
            timerFinalSound.current?.stopAsync();
          }
        });

      })();
    }
  }, [timerFinalSound])

  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);

  const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);

  const timerValues = useAppSelector(({ timerValues }) => timerValues);

  const stateAlert = useAppSelector(({ stateAlert }) => stateAlert);

  const dispatch = useDispatch();

  const dataNumbers = (() => {
    return ({
      scrollOne: Number(JSON.stringify(values.listOneValue)),
      scrollTwo: Number(JSON.stringify(values.listTwoValue)),
      scrollThree: Number(JSON.stringify(values.listThreeValue))
    })
  })

  function playTimer(heightItem: number) {
    const numbers = dataNumbers();

    const numberHours = Math.round(numbers.scrollOne / heightItem) * 3600;
    const numberMinutes = Math.round(numbers.scrollTwo / heightItem) * 60;
    const numberSeconds = Math.round(numbers.scrollThree / heightItem);
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

  async function createNotification(channelId: string, timestamp: number, customTitle: string = 'Timer em andamento', isPaused: boolean = false) {

    await notifee.displayNotification({
      title: customTitle,
      body: 'Arraste para cancelar',
      id: 'MediaTimer',
      android: {
        channelId,
        autoCancel: false,
        importance: AndroidImportance.LOW,
        pressAction: {
          id: 'default',
        },
        smallIcon: 'ic_media_timer',
        color: '#149CFF',
        visibility: AndroidVisibility.PUBLIC,
        showChronometer: !isPaused && true,
        chronometerDirection: 'down',
        // timestamp * 1000 convertion to utc
        timestamp: isPaused ? undefined : (Date.now() + (timestamp * 1000)),
      },
    });
  }

  async function createChannelId() {
    const channelId = await notifee.createChannel({
      id: 'Timer Channel',
      name: 'Timer Channel',
      importance: AndroidImportance.LOW,
      vibration: false,
      bypassDnd: false,
      visibility: AndroidVisibility.PUBLIC
    });

    return channelId;
  }

  async function onDisplayNotification(newTotalValue: number) {

    await notifee.requestPermission();

    const channelId = await createChannelId();

    await createNotification(channelId, newTotalValue);

    const timeNow = () => {
      return Math.round(Date.now() / 1000);
    }

    const timeNowToAlert = (newTimeNow = timeNow()) => {
      return (newTimeNow + newTotalValue);
    };

    const initialTimeToAlert = timeNowToAlert();

    const timeLeftToAlert = (newTimeNow = timeNow()) => {
      return initialTimeToAlert - newTimeNow;
    }

    const timeout = 1000;

    function playTimerInternal() {
      inAppTimer.current = setInterval(() => {
        dispatch(changeRunningValueTimestamp(timeLeftToAlert()));
      }, timeout);
    }

    playTimerInternal();

    refAppListener.current = AppState.addEventListener('change', (state) => {

      if (stateTimer.isPlay && stateTimer.isPaused == false) {
        stopTimerInterval();

        if (state == 'background') {
          // * 1000 to transform to ms
          const timestampToAlert = timeLeftToAlert(timeNow()) * 1000;

          BackgroundTimer.runBackgroundTimer(async () => {
            dispatch(changeIsPlay(false));
          }, timestampToAlert);

        } else if (state == 'active') {
          playTimerInternal();
        }

      }
    });
  }

  useEffect(() => {
    if (stateTimer.isPickingValue && !stateTimer.isPlay) {
      const numbers = dataNumbers();

      if (numbers.scrollOne != 0 || numbers.scrollTwo != 0 || numbers.scrollThree != 0) {
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

          dispatch(changeIsSelectionYoutube(false));

          if (stateMusic.musicLink != null) {
            const { sound } = await Audio.Sound.createAsync(typeof stateMusic.musicLink == 'string' ? { uri: stateMusic.musicLink } : stateMusic.musicLink);
            soundRef.current = sound;
          } else {
            soundRef.current = undefined;
          }

          if (soundRef.current) {
            await soundRef.current.setIsLoopingAsync(true);

            await soundRef.current.playAsync();
          }

          const totalValue = playTimer(heightItem);

          await onDisplayNotification(totalValue);
        })();

      } else {

        if (soundRef.current != undefined) {
          soundRef.current.stopAsync();

          soundRef.current.unloadAsync();

          soundRef.current = new Audio.Sound();
        }

        notifee.cancelAllNotifications();

        stopTimer();

        if (timerFinalSound.current && stateAlert.isAlert) {
          timerFinalSound.current.playAsync();
        }
      }
    }
  }, [stateTimer.isPlay]);

  useEffect(() => {
    (async () => {
      if (stateTimer.isPlay && havePlayed) {
        pauseTimerAnimation();

        if (stateTimer.isPaused) {
          await soundRef.current?.pauseAsync();

          stopTimerInterval();

          stopStateAppListener();

          const channelId = await createChannelId();

          createNotification(channelId, 0, 'Timer Pausado', true)
        } else {
          onDisplayNotification(timerValues.runningValueTimestamp);
          await soundRef.current?.playAsync();
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
