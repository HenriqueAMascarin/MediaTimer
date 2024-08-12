import { useMemo, useRef } from "react";
import { View, Animated } from "react-native";

import { timerStyle } from "./styles/timerStyle";

import { lineAnimated, linePointsOpacity, numberCountOpacity, listOpacity, gapList } from "./TimerAnimations/TimerSequence";

import { numberList } from "./timerUtils/numberList";
import ListTimer from "./ListTimer";
import TimerNumber from "./TimerNumber";
import PauseText from "./PauseText";
import TotalTimeText from "./TotalTimeText";

import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import StateManagement from "./timerUtils/StateManagement";
import { useTheme } from "../Utils/Context/ThemeContext";
import TimerAlert from "./TimerAlert";

export default function Timer() {
  const timerValues = useAppSelector(({ timerValues }) => timerValues);
  const { dataTheme } = useTheme();

  const listOne = useRef({ array: numberList(23), animated: { scrollY: new Animated.Value(0) } }).current;
  const listTwo = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;
  const listThree = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;

  const newHours = useMemo(() => {
    return (
      Math.floor(timerValues.runningValueTimestamp / 3600)
        .toString()
        .padStart(2, "0")
    )
  }, [timerValues.runningValueTimestamp]);

  const newMinutes = useMemo(() => {
    return (
      Math.floor((timerValues.runningValueTimestamp % 3600) / 60)
        .toString()
        .padStart(2, "0")
    )
  }, [timerValues.runningValueTimestamp]);

  const newSeconds = useMemo(() => {
    return (Math.floor((timerValues.runningValueTimestamp % 3600) % 60)
      .toString()
      .padStart(2, "0"))
  }, [timerValues.runningValueTimestamp]);

  return (
    <View>
      <StateManagement listOneValue={listOne.animated.scrollY} listTwoValue={listTwo.animated.scrollY} listThreeValue={listThree.animated.scrollY} />
      <Animated.View style={[timerStyle.listsContainer, { gap: gapList }]}>
        <PauseText />
        <View style={timerStyle.listContainer}>
          <ListTimer dataArray={listOne} opacityAnimated={listOpacity} />

          <TimerNumber numberCountOpacity={numberCountOpacity} number={newHours} />
        </View>

        <View style={timerStyle.listLineContainer}>
          <Animated.View style={[timerStyle.listLine, { height: lineAnimated.heightLine, opacity: lineAnimated.opacityLine }]}></Animated.View>

          <Animated.Text style={[timerStyle.listLinePoints, { opacity: linePointsOpacity, color: dataTheme.animatedValues.principalColor, fontFamily: 'Roboto' }]} allowFontScaling={false}>:</Animated.Text>
        </View>

        <View style={timerStyle.listContainer}>
          <ListTimer dataArray={listTwo} opacityAnimated={listOpacity} />

          <TimerNumber numberCountOpacity={numberCountOpacity} number={newMinutes} />
        </View>

        <View style={timerStyle.listLineContainer}>
          <Animated.View style={[timerStyle.listLine, { height: lineAnimated.heightLine, opacity: lineAnimated.opacityLine }]}></Animated.View>

          <Animated.Text style={[timerStyle.listLinePoints, { opacity: linePointsOpacity, color: dataTheme.animatedValues.principalColor, fontFamily: 'Roboto' }]} allowFontScaling={false}>:</Animated.Text>
        </View>

        <View style={timerStyle.listContainer}>
          <ListTimer dataArray={listThree} opacityAnimated={listOpacity} />

          <TimerNumber numberCountOpacity={numberCountOpacity} number={newSeconds} />
        </View>

        <TotalTimeText />

        <TimerAlert />
      </Animated.View>
    </View>
  );
}
