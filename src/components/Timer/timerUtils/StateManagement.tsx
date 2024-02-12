import { useEffect, useRef, useState } from "react";

import { heightItem } from "../styles/timerStyle";
import { Animated, Vibration } from "react-native";

import { pauseTimer, playTimer, stopTimer } from "./valuesIntervalTimer";
import { changeScrollValues } from "../../Utils/Redux/features/dataNumbers-slice";
import { changeRunningValue } from "../../Utils/Redux/features/timerValues-slice";
import { changeIsPickingValue, changeIsPlay } from "../../Utils/Redux/features/stateTimer-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../Utils/Redux/reduxHookCustom";
import { changeIsSelection, changeIsSelectionYoutube } from "@src/components/Utils/Redux/features/statesMusic-slice";
import notifee, { AndroidColor, AndroidImportance } from '@notifee/react-native';
import BackgroundTimer from 'react-native-background-timer';

import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

interface StateManagement {
  listOneValue: Animated.Value;
  listTwoValue: Animated.Value;
  listThreeValue: Animated.Value;
}

export default function StateManagement(values: StateManagement) {

  const [havePlayed, changeHavePlayed] = useState(false);

  const soundRef = useRef<Audio.Sound>();

  const dataNumbers  = useAppSelector(({dataNumbers}) => dataNumbers);
  const stateMusic = useAppSelector(({stateMusic}) => stateMusic);
  const stateTimer = useAppSelector(({stateTimer}) => stateTimer);
  const timerValues = useAppSelector(({timerValues}) => timerValues);
  const dispatch = useDispatch();

  function stopTimerInterval() {
    notifee.cancelAllNotifications();
    BackgroundTimer.stopBackgroundTimer();
  }

  async function onDisplayNotification() {
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
      id: 'Timer',
      name: 'Timer channel',
    });

    let valueRunning = timerValues.runningValue;
    BackgroundTimer.runBackgroundTimer(() => {
      valueRunning--;
      return dispatch(changeRunningValue(valueRunning));
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
        showChronometer: true,
        chronometerDirection: 'down',
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
      if (stateTimer.isInterval) {
        onDisplayNotification();
      } else {
        stopTimerInterval();
      }
    }
  }, [stateTimer.isInterval]);

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
          dispatch(changeIsSelectionYoutube(false));
          playTimer(dataNumbers, heightItem);
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
    if (stateTimer.isPlay) {
      pauseTimer(stateTimer);
      if (stateTimer.isPaused && soundRef.current) {
        soundRef.current.pauseAsync();

      } else {

        if (stateMusic.musicLink && soundRef.current) {
          soundRef.current.playAsync();
        }

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
