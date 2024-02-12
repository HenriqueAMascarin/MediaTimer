import { useRef } from "react";
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

export default function Timer() {
  const timerValues = useAppSelector(({timerValues}) => timerValues);

  const listOne = useRef({ array: numberList(23), animated: { scrollY: new Animated.Value(0) } }).current;
  const listTwo = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;
  const listThree = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;

  const hours = Math.floor(timerValues.runningValue / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timerValues.runningValue % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timerValues.runningValue % 3600) % 60)
    .toString()
    .padStart(2, "0");

  return (
    <View>
      <StateManagement listOneValue={listOne.animated.scrollY} listTwoValue={listTwo.animated.scrollY} listThreeValue={listThree.animated.scrollY} />
      <Animated.View style={[timerStyle.listsContainer, { gap: gapList }]}>
        <PauseText />
        <View style={timerStyle.listContainer}>
          <ListTimer dataArray={listOne} opacityAnimated={listOpacity}/>

          <TimerNumber numberCountOpacity={numberCountOpacity} number={hours} />
        </View>

        <View style={timerStyle.listLineContainer}>
          <Animated.View style={[timerStyle.listLine, { height: lineAnimated.heightLine, opacity: lineAnimated.opacityLine }]}></Animated.View>

          <Animated.Text style={[timerStyle.listLinePoints, { opacity: linePointsOpacity }]}>:</Animated.Text>
        </View>

        <View style={timerStyle.listContainer}>
          <ListTimer dataArray={listTwo} opacityAnimated={listOpacity}/>

          <TimerNumber numberCountOpacity={numberCountOpacity} number={minutes} />
        </View>

        <View style={timerStyle.listLineContainer}>
          <Animated.View style={[timerStyle.listLine, { height: lineAnimated.heightLine, opacity: lineAnimated.opacityLine }]}></Animated.View>

          <Animated.Text style={[timerStyle.listLinePoints, { opacity: linePointsOpacity }]}>:</Animated.Text>
        </View>

        <View style={timerStyle.listContainer}>
          <ListTimer dataArray={listThree} opacityAnimated={listOpacity}/>

          <TimerNumber numberCountOpacity={numberCountOpacity} number={seconds} />
        </View>

        <TotalTimeText/>
      </Animated.View>
    </View>
  );
}
