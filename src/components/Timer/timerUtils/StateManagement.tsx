import { useEffect, useRef, useState, useMemo } from "react";

import { heightItem } from "../styles/timerStyle";
import { Animated, Vibration } from "react-native";

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

  function playTimer(heightItem: number) {
    const numbers = dataNumbers();

    const numberHours = Math.round(numbers.scrollOne / heightItem) * 3600;
    const numberMinutes = Math.round(numbers.scrollTwo / heightItem) * 60;
    const numberSeconds = Math.round(numbers.scrollThree / heightItem);
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
        colorized: true,
        autoCancel: false,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        showTimestamp: true,
        timestamp: Date.now() + timerValues.totalValue * 1000,
        smallIcon: 'ic_media_timer',
        color: '#149CFF'
      },
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
    (async () => {
      if (stateMusic.musicLink != null) {
        const { sound } = await Audio.Sound.createAsync(typeof stateMusic.musicLink == 'string' ? { uri: stateMusic.musicLink } : stateMusic.musicLink);
        soundRef.current = sound;
      } else {
        soundRef.current = undefined;
      }
    })();

  }, [stateMusic.musicLink])

  useEffect(() => {
    if (havePlayed) {

      if (stateTimer.isPlay) {
        (async function play() {
          dispatch(changeIsSelection(false));
          dispatch(changeIsHistory(false));

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
