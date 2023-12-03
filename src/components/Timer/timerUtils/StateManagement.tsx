import { useEffect, useState } from "react";

import { heightItem } from "../styles/timerStyle";
import { Animated, Vibration } from "react-native";

import { pauseTimer, playTimer, stopTimer } from "./valuesIntervalTimer";
import { changeScrollValues } from "../../Utils/Redux/features/dataNumbers-slice";
import { changeRunningValue } from "../../Utils/Redux/features/timerValues-slice";
import { changeIsPickingValue, changeIsPlay } from "../../Utils/Redux/features/stateTimer-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../Utils/Redux/reduxHookCustom";

import { Audio, AVPlaybackSource } from 'expo-av';

interface StateManagement {
  listOneValue: Animated.Value;
  listTwoValue: Animated.Value;
  listThreeValue: Animated.Value;
}

export default function StateManagement(values: StateManagement) {
  const [intervalState, changeIntervalState] = useState(setTimeout(() => { }, 0));
  const [havePlayed, changeHavePlayed] = useState(false);

  const [sound, setSound] = useState<Audio.Sound>();

  const dataInfo = useAppSelector((state) => state);
  const dispatch = useDispatch();

  function stopTimerInterval() {
    clearInterval(intervalState);
  }

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
        let valueRunning = dataInfo.timerValues.runningValue;

        changeIntervalState(setInterval(() => {
          valueRunning--;
          return dispatch(changeRunningValue(valueRunning));
        }, 1000))

      } else {
        stopTimerInterval();
      }
    }
  }, [dataInfo.stateTimer.isInterval]);

  useEffect(() => {
    if (havePlayed) {
      if (dataInfo.stateTimer.isPlay) {
        (async function playSound() {
          if (dataInfo.stateMusic.musicLink) {
            const { sound } = await Audio.Sound.createAsync(dataInfo.stateMusic.musicLink);
            setSound(sound);

            await sound.playAsync();
          }
        })();

        playTimer(dataInfo, heightItem);
      } else {
        stopTimerInterval();
        (async () => await sound?.stopAsync())();
        stopTimer();
        Vibration.vibrate(400);
      }
    }
  }, [dataInfo.stateTimer.isPlay]);

  useEffect(() => {
    if (dataInfo.stateTimer.isPlay) {
      pauseTimer(dataInfo);
      if (dataInfo.stateTimer.isPaused) {
        (async () => await sound?.pauseAsync())();

      } else {
        (async () => {
          if (dataInfo.stateMusic.musicLink) {
            await sound?.loadAsync(dataInfo.stateMusic.musicLink);
          }
        })();
   
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
