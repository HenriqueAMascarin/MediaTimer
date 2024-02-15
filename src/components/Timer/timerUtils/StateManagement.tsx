import { useEffect, useRef, useState } from "react";

import { heightItem } from "../styles/timerStyle";
import { Animated, Vibration } from "react-native";

import { changeScrollValues } from "../../Utils/Redux/features/dataNumbers-slice";
import { changeIsPaused, changeIsPickingValue, changeIsPlay } from "../../Utils/Redux/features/stateTimer-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../Utils/Redux/reduxHookCustom";
import { changeIsSelection } from "@src/components/Utils/Redux/features/statesMusic-slice";
import notifee, { AndroidColor, AndroidImportance } from '@notifee/react-native';
import BackgroundTimer from 'react-native-background-timer';

import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { changeRunningValue, changeTotalValue } from "@src/components/Utils/Redux/features/timerValues-slice";
import { sequenceTimer } from "../TimerAnimations/TimerSequence";
import { timerPause } from "../TimerAnimations/TimerPause";

interface StateManagement {
  listOneValue: Animated.Value;
  listTwoValue: Animated.Value;
  listThreeValue: Animated.Value;
}

export default function StateManagement(values: StateManagement) {

  const [havePlayed, changeHavePlayed] = useState(false);

  const soundRef = useRef<Audio.Sound>();

  const dataNumbers = useAppSelector(({ dataNumbers }) => dataNumbers);
  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
  const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);
  const timerValues = useAppSelector(({ timerValues }) => timerValues);
  const dispatch = useDispatch();

  function playTimer(heightItem: number) {
    const numberHours = Math.round(dataNumbers.scrollOne / heightItem) * 3600;
    const numberMinutes = Math.round(dataNumbers.scrollTwo / heightItem) * 60;
    const numberSeconds = Math.round(dataNumbers.scrollThree / heightItem);
    const timeStampValue = numberHours + numberMinutes + numberSeconds;

    dispatch(changeRunningValue(timeStampValue));
    dispatch(changeTotalValue(timeStampValue));
    sequenceTimer(true);

    return timeStampValue;
  }

  function stopTimer() {
    dispatch(changeIsPickingValue(false));
    dispatch(changeIsPaused(false));
    dispatch(changeRunningValue(0));
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
    BackgroundTimer.runBackgroundTimer(() => {
      newValue--;
      return dispatch(changeRunningValue(newValue));
    }, 1000);

    await notifee.displayNotification({
      title: 'Timer em andamento',
      body: 'Arraste para cancelar',
      android: {
        channelId,
        color: AndroidColor.BLUE,
        colorized: true,
        autoCancel: false,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        showTimestamp: true,
        timestamp: Date.now() + timerValues.totalValue * 1000,
      },
    });

  }

  useEffect(() => {
    if (stateTimer.isPickingValue && !stateTimer.isPlay) {
      const hours = Number(JSON.stringify(values.listOneValue));
      const minutes = Number(JSON.stringify(values.listTwoValue));
      const seconds = Number(JSON.stringify(values.listThreeValue));

      if (hours != 0 || minutes != 0 || seconds != 0) {
        changeHavePlayed(true);
        dispatch(changeScrollValues({ scrollOne: hours, scrollTwo: minutes, scrollThree: seconds }));
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

          soundRef.current = undefined;

          if (stateMusic.musicLink) {
            const { sound } = await Audio.Sound.createAsync(
              typeof stateMusic.musicLink == 'string' ?
                { uri: stateMusic.musicLink }
                : stateMusic.musicLink
            );

            soundRef.current = sound

            if (soundRef.current) {
              soundRef.current.setIsLoopingAsync(true);
              soundRef.current.playAsync();

              await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: true,
                interruptionModeIOS: InterruptionModeIOS.DuckOthers,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
                playThroughEarpieceAndroid: false,
              })

            }
          }

          const totalValue = playTimer(heightItem);
          onDisplayNotification(totalValue);
        })();

      } else {
        stopTimerInterval();

        if (soundRef.current) {
          soundRef.current.stopAsync();
          soundRef.current = new Audio.Sound();
        }

        stopTimer();
        Vibration.vibrate(400);
      }
    }
  }, [stateTimer.isPlay]);

  useEffect(() => {
    if (stateTimer.isPlay && havePlayed) {
      pauseTimerAnimation();

      if (stateTimer.isPaused) {
        soundRef.current?.pauseAsync();
        stopTimerInterval();
      } else {
        onDisplayNotification(timerValues.runningValue);
        soundRef.current?.playAsync();
      }

    }
  }, [stateTimer.isPaused]);

  useEffect(() => {
    if (havePlayed) {
      if (timerValues.runningValue <= 0 || !stateTimer.isPlay) {
        dispatch(changeIsPlay(false));
      }
    }
  }, [timerValues.runningValue]);



  return <></>;
}
