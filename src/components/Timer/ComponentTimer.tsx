import { useMemo, useRef } from "react";
import { View, Animated } from "react-native";

import { timerStyle } from "./styles/timerStyle";

import {
  lineAnimated,
  linePointsOpacity,
  numberCountOpacity,
  listOpacity,
  gapList,
} from "./TimerAnimations/TimerSequence";

import ListTimer from "./ListTimer";
import TimerNumber from "./TimerNumber";
import PauseText from "./PauseText";
import TotalTimeText from "./TotalTimeText";

import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import StateManagement from "./timerUtils/StateManagement";
import { useTheme } from "../Utils/Context/ThemeContext";
import TimerAlert from "./TimerAlert";
import TextAnimated from "../Texts/TextAnimated";

export default function Timer() {
  const timerValues = useAppSelector(({ timerValues }) => timerValues);
  const { dataTheme } = useTheme();

  const listOne = useRef({
    maxNumber: 29,
    currentNumber: useRef(0),
    animated: { scrollY: new Animated.Value(0) },
  });
  const listTwo = useRef({
    maxNumber: 59,
    currentNumber: useRef(0),
    animated: { scrollY: new Animated.Value(0) },
  });
  const listThree = useRef({
    maxNumber: 59,
    currentNumber: useRef(0),
    animated: { scrollY: new Animated.Value(0) },
  });

  const newHours = useMemo(() => {
    return Math.floor(timerValues.runningValueTimestamp / 3600)
      .toString()
      .padStart(2, "0");
  }, [timerValues.runningValueTimestamp]);

  const newMinutes = useMemo(() => {
    return Math.floor((timerValues.runningValueTimestamp % 3600) / 60)
      .toString()
      .padStart(2, "0");
  }, [timerValues.runningValueTimestamp]);

  const newSeconds = useMemo(() => {
    return Math.floor((timerValues.runningValueTimestamp % 3600) % 60)
      .toString()
      .padStart(2, "0");
  }, [timerValues.runningValueTimestamp]);

  return (
    <View>
      <StateManagement
        listOneValue={listOne.current.currentNumber}
        listTwoValue={listTwo.current.currentNumber}
        listThreeValue={listThree.current.currentNumber}
      />

      <Animated.View style={[timerStyle.listsContainer, { gap: gapList }]}>
        <PauseText />

        <View style={timerStyle.listContainer}>
          <ListTimer
            timerData={listOne.current}
            opacityAnimated={listOpacity}
          />

          <TimerNumber
            numberCountOpacity={numberCountOpacity}
            number={newHours}
          />
        </View>

        <View style={timerStyle.listLineContainer}>
          <Animated.View
            style={[
              timerStyle.listLine,
              {
                height: lineAnimated.heightLine,
                opacity: lineAnimated.opacityLine,
              },
            ]}
          />

          <TextAnimated
            style={[
              timerStyle.listLinePoints,
              {
                opacity: linePointsOpacity,
                color: dataTheme.animatedValues.principalColor,
              },
            ]}
            allowFontScaling={false}
          >
            :
          </TextAnimated>
        </View>

        <View style={timerStyle.listContainer}>
          <ListTimer
            timerData={listTwo.current}
            opacityAnimated={listOpacity}
          />

          <TimerNumber
            numberCountOpacity={numberCountOpacity}
            number={newMinutes}
          />
        </View>

        <View style={timerStyle.listLineContainer}>
          <Animated.View
            style={[
              timerStyle.listLine,
              {
                height: lineAnimated.heightLine,
                opacity: lineAnimated.opacityLine,
              },
            ]}
          />

          <TextAnimated
            style={[
              timerStyle.listLinePoints,
              {
                opacity: linePointsOpacity,
                color: dataTheme.animatedValues.principalColor,
              },
            ]}
          >
            :
          </TextAnimated>
        </View>

        <View style={timerStyle.listContainer}>
          <ListTimer
            timerData={listThree.current}
            opacityAnimated={listOpacity}
          />

          <TimerNumber
            numberCountOpacity={numberCountOpacity}
            number={newSeconds}
          />
        </View>

        <TotalTimeText />

        <TimerAlert />
      </Animated.View>
    </View>
  );
}
