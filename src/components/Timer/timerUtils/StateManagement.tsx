import { useEffect, useRef, useState } from "react";

import { heightItem } from "../styles/timerStyle";
import { Animated, Vibration } from "react-native";

import { pauseTimer, playTimer, stopTimer } from "./valuesIntervalTimer";
import { changeScrollValues } from "../../Utils/Redux/features/dataNumbers-slice";
import { changeRunningValue } from "../../Utils/Redux/features/timerValues-slice";
import { changeIsPickingValue, changeIsPlay } from "../../Utils/Redux/features/stateTimer-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../Utils/Redux/reduxHookCustom";

import BackgroundService from 'react-native-background-actions';

import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { changeIsSelection, changeIsSelectionYoutube } from "@src/components/Utils/Redux/features/statesMusic-slice";
import { colorsStyle } from "@src/components/Utils/colorsStyle";

interface StateManagement {
  listOneValue: Animated.Value;
  listTwoValue: Animated.Value;
  listThreeValue: Animated.Value;
}

export default function StateManagement(values: StateManagement) {

  const [intervalState, changeIntervalState] = useState(setTimeout(() => { }, 0));
  const [havePlayed, changeHavePlayed] = useState(false);

  const soundRef = useRef<Audio.Sound>();

  const dataInfo = useAppSelector((state) => state);
  const dispatch = useDispatch();

  function stopTimerInterval() {
    clearInterval(intervalState);
  }

  const sleep = (time: any) => new Promise((resolve: any) => setTimeout(() => resolve(), time));

  const timerStart = async (taskDataArguments: any) => {

    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
      let valueRunning = dataInfo.timerValues.runningValue;
      changeIntervalState(setInterval(() => {
        valueRunning--;
        return dispatch(changeRunningValue(valueRunning));
      }, 1000))
      await sleep(delay);

    });
  };

  const backgroundOptions = {
    taskName: 'Media timer',
    taskTitle: 'Timer em execução',
    taskDesc: 'Clique para retornar!',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: colorsStyle.principal.blue,
    linkingURI: 'media-timer://',
    parameters: {
      delay: 1000,
    },
  };

  useEffect(() => {
    if (dataInfo.stateTimer.isPickingValue && !dataInfo.stateTimer.isPlay) {
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
  }, [dataInfo.stateTimer.isPickingValue]);

  useEffect(() => {
    if (havePlayed) {
      if (dataInfo.stateTimer.isInterval) {
        (async () => {
          await BackgroundService.start(timerStart, backgroundOptions);
        })();

      } else {
        stopTimerInterval();
      }
    }
  }, [dataInfo.stateTimer.isInterval]);

  useEffect(() => {
    if (havePlayed) {

      if (dataInfo.stateTimer.isPlay) {
        (async function play() {
          dispatch(changeIsSelection(false));

          soundRef.current = undefined;

          if (dataInfo.stateMusic.musicLink) {
            const { sound } = await Audio.Sound.createAsync(
              typeof dataInfo.stateMusic.musicLink == 'string' ?
                { uri: dataInfo.stateMusic.musicLink }
                : dataInfo.stateMusic.musicLink
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
          playTimer(dataInfo, heightItem);
        })();
      } else {
        stopTimerInterval();
        if (soundRef.current) {
          soundRef.current.stopAsync();
          soundRef.current = new Audio.Sound();
        }
        (async () => await BackgroundService.stop())();
        stopTimer();
        Vibration.vibrate(400);
      }
    }
  }, [dataInfo.stateTimer.isPlay]);

  useEffect(() => {
    if (dataInfo.stateTimer.isPlay) {
      pauseTimer(dataInfo);
      if (dataInfo.stateTimer.isPaused && soundRef.current) {
        soundRef.current.pauseAsync();

      } else {

        if (dataInfo.stateMusic.musicLink && soundRef.current) {
          soundRef.current.playAsync();
        }

      }
    }
  }, [dataInfo.stateTimer.isPaused]);

  useEffect(() => {
    if (havePlayed) {
      if (dataInfo.timerValues.runningValue <= 0 || !dataInfo.stateTimer.isPlay) {
        dispatch(changeIsPlay(false));
      }
    }
  }, [dataInfo.timerValues.runningValue]);



  return <></>;
}
