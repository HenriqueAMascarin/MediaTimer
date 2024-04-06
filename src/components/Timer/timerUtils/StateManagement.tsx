import { useEffect, useRef, useState } from "react";

import { heightItem } from "../styles/timerStyle";
import { Animated, Vibration } from "react-native";

import { changeIsPaused, changeIsPickingValue, changeIsPlay } from "../../Utils/Redux/features/stateTimer-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../Utils/Redux/reduxHookCustom";
import { changeIsSelection } from "@src/components/Utils/Redux/features/statesMusic-slice";
import notifee, { AndroidImportance } from '@notifee/react-native';
import BackgroundTimer from 'react-native-background-timer';

import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { changeRunningValue, changeTotalValue } from "@src/components/Utils/Redux/features/timerValues-slice";
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

  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
  const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);
  const timerValues = useAppSelector(({ timerValues }) => timerValues);
  const dispatch = useDispatch();

  const dataNumbers = (() => {
    return ({
      scrollOne: Number(JSON.stringify(values.listOneValue)),
      scrollTwo: Number(JSON.stringify(values.listTwoValue)),
      scrollThree: Number(JSON.stringify(values.listThreeValue))
    })
  })

  function formatedTimer(timestamp: number) {
    const newHours = Math.floor(timestamp / 3600)
      .toString()
      .padStart(2, "0");

    const newMinutes = Math.floor((timestamp % 3600) / 60)
      .toString()
      .padStart(2, "0");

    const newSeconds = Math.floor((timestamp % 3600) % 60)
      .toString()
      .padStart(2, "0");

    return { newHours, newMinutes, newSeconds };
  }


  function playTimer(heightItem: number) {
    const numbers = dataNumbers();

    const numberHours = Math.round(numbers.scrollOne / heightItem) * 3600;
    const numberMinutes = Math.round(numbers.scrollTwo / heightItem) * 60;
    const numberSeconds = Math.round(numbers.scrollThree / heightItem);
    const timestampValue = numberHours + numberMinutes + numberSeconds;

    const formatedValues = formatedTimer(timestampValue);

    dispatch(changeTotalValue(timestampValue));
    dispatch(changeRunningValue({ hours: formatedValues.newHours, minutes: formatedValues.newMinutes, seconds: formatedValues.newSeconds, timestamp: timestampValue }));
    sequenceTimer(true);

    return timestampValue;
  }

  function stopTimer() {
    dispatch(changeIsPickingValue(false));
    dispatch(changeIsPaused(false));
    dispatch(changeTotalValue(0));

    sequenceTimer(false);
    timerPause(false);
  }

  function stopTimerInterval() {
    BackgroundTimer.stopBackgroundTimer();
    notifee.cancelAllNotifications();
  }

  function pauseTimerAnimation() {
    const isPaused = stateTimer.isPaused;
    timerPause(isPaused);
  }

  async function onDisplayNotification(newTotalValue: number) {
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
      id: 'Timer',
      name: 'Timer channel',
    });

    let newValue = newTotalValue;

    async function createNotification(formatedValues: ) {
      await notifee.displayNotification({
        title: 'Timer em andamento',
        body: 'Arraste para cancelar',
        id: 'Media-timer-notification',
        subtitle: `${formatedValues.newHours}:${formatedValues.newMinutes}:${formatedValues.newSeconds}`,
        android: {
          channelId,
          autoCancel: false,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
          smallIcon: 'ic_media_timer',
          color: '#149CFF'
        },
      });
    }

    BackgroundTimer.runBackgroundTimer(async () => {
      newValue--;

      const formatedValues = formatedTimer(newValue);

      dispatch(changeRunningValue({ hours: formatedValues.newHours, minutes: formatedValues.newMinutes, seconds: formatedValues.newSeconds, timestamp: newValue }));

      createNotification()

    }, 1000);

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

          await soundRef.current?.unloadAsync();

          if (stateMusic.musicLink != null) {
            const { sound } = await Audio.Sound.createAsync(typeof stateMusic.musicLink == 'string' ? { uri: stateMusic.musicLink } : stateMusic.musicLink);
            soundRef.current = sound;
          } else {
            soundRef.current = undefined;
          }

          if (soundRef.current) {
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: false,
              staysActiveInBackground: true,
              interruptionModeIOS: InterruptionModeIOS.DuckOthers,
              playsInSilentModeIOS: true,
              shouldDuckAndroid: true,
              interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
              playThroughEarpieceAndroid: false,
            })

            await soundRef.current.setIsLoopingAsync(true);

            await soundRef.current.playAsync();
          }

          const totalValue = playTimer(heightItem);
          await onDisplayNotification(totalValue);
        })();

      } else {

        stopTimerInterval();

        if (soundRef.current != undefined) {

          soundRef.current.stopAsync();
          soundRef.current = new Audio.Sound();

        }

        stopTimer();
        Vibration.vibrate(400);

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
        } else {
          onDisplayNotification(timerValues.runningValue.timestamp);
          await soundRef.current?.playAsync();
        }

      }
    })();
  }, [stateTimer.isPaused]);

  useEffect(() => {
    if (havePlayed) {
      if (timerValues.runningValue.timestamp <= 0 || !stateTimer.isPlay) {
        dispatch(changeIsPlay(false));
      }
    }
  }, [timerValues.runningValue]);



  return <></>;
}
