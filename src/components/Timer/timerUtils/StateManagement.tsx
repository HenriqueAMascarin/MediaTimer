import { useEffect, useRef, useState } from "react";

import { heightItem } from "../styles/timerStyle";
import { Animated, Vibration } from "react-native";

import { pauseTimer, playTimer, stopTimer } from "./valuesIntervalTimer";
import { changeScrollValues } from "../../Utils/Redux/features/dataNumbers-slice";
import { changeRunningValue } from "../../Utils/Redux/features/timerValues-slice";
import { changeIsPickingValue, changeIsPlay } from "../../Utils/Redux/features/stateTimer-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../Utils/Redux/reduxHookCustom";

import { Audio, AVPlaybackStatus } from 'expo-av';
import { changeSelection } from "@src/components/Utils/Redux/features/statesMusic-slice";

interface StateManagement {
  listOneValue: Animated.Value;
  listTwoValue: Animated.Value;
  listThreeValue: Animated.Value;
}

export default function StateManagement(values: StateManagement) {
  const [intervalState, changeIntervalState] = useState(setTimeout(() => { }, 0));
  const [havePlayed, changeHavePlayed] = useState(false);

  const soundRef = useRef(new Audio.Sound());
  soundRef.current.setIsLoopingAsync(true);

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
        (async function play() {
          dispatch(changeSelection(false));

          if (dataInfo.stateMusic.musicLink) {
            const { sound } = await Audio.Sound.createAsync(dataInfo.stateMusic.musicLink);
            soundRef.current = sound
            soundRef.current.playAsync();
          }

          playTimer(dataInfo, heightItem);
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

  // const checkStatusAudio = (playbackStatus: AVPlaybackStatus) => {
  //   if (soundRef.current) {
  //     if (!playbackStatus.isLoaded) {

  //     } else {
  //       if (dataInfo.stateTimer.isPlay && !dataInfo.stateTimer.isPaused && playbackStatus.didJustFinish) {
  //         // soundRef.current.replayAsync();
  //       }
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (soundRef.current) {
  //     soundRef.current.setOnPlaybackStatusUpdate(checkStatusAudio);
  //   }
  // }, [soundRef.current])

  return <></>;
}
