import { useMemo, useRef } from "react";
import { View, Animated } from "react-native";

import { timerStyle } from "./styles/timerStyle";

import {
  lineAnimated,
  linePointsOpacity,
  numberCountOpacity,
  gapList,
} from "@src/components/Timer/animations/timerSequence";

import ListTimer from "./ListTimer";
import TimerNumber from "./TimerNumber";
import PauseText from "./PauseText";
import TotalTimeText from "./TotalTimeText";

import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { useTheme } from "../Utils/Context/ThemeContext";
import TimerAlert from "./TimerAlert";
import TextAnimated from "../Texts/TextAnimated";
import {
  changeListOneCurrentNumber,
  changeListThreeCurrentNumber,
  changeListTwoCurrentNumber,
} from "@src/components/Utils/Redux/features/listTimerCurrentValues-slice";

export default function Timer() {
  const timerRunningValues = useAppSelector(
    ({ timerRunningValues }) => timerRunningValues
  );

  const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);

  const listTimerCurrentValues = useAppSelector(
    ({ listTimerCurrentValues }) => listTimerCurrentValues
  );

  const { dataTheme } = useTheme();

  const listOne = useMemo(() => {
    return {
      maxNumber: 29,
      currentNumber: listTimerCurrentValues.listOneCurrentNumber,
      dispatchFunction: changeListOneCurrentNumber,
    };
  }, [listTimerCurrentValues.listOneCurrentNumber]);

  const listTwo = useMemo(() => {
    return {
      maxNumber: 59,
      currentNumber: listTimerCurrentValues.listTwoCurrentNumber,
      dispatchFunction: changeListTwoCurrentNumber,
    };
  }, [listTimerCurrentValues.listTwoCurrentNumber]);

  const listThree = useMemo(() => {
    return {
      maxNumber: 59,
      currentNumber: listTimerCurrentValues.listThreeCurrentNumber,
      dispatchFunction: changeListThreeCurrentNumber,
    };
  }, [listTimerCurrentValues.listThreeCurrentNumber]);

  const timerFormatedValues = useMemo(() => {
    const newHours = Math.floor(timerRunningValues.runningValueTimestamp / 3600)
      .toString()
      .padStart(2, "0");

    const newMinutes = Math.floor(
      (timerRunningValues.runningValueTimestamp % 3600) / 60
    )
      .toString()
      .padStart(2, "0");

    const newSeconds = Math.floor(
      (timerRunningValues.runningValueTimestamp % 3600) % 60
    )
      .toString()
      .padStart(2, "0");

    return {
      newHours,
      newMinutes,
      newSeconds,
    };
  }, [timerRunningValues.runningValueTimestamp]);

  return (
    <View>
      <Animated.View style={[timerStyle.listsContainer, { gap: gapList }]}>
        <PauseText />

        <View style={timerStyle.listContainer}>
          <ListTimer timerData={listOne} />

          <TimerNumber
            numberCountOpacity={numberCountOpacity}
            number={timerFormatedValues.newHours}
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
          <ListTimer timerData={listTwo} />

          <TimerNumber
            numberCountOpacity={numberCountOpacity}
            number={timerFormatedValues.newMinutes}
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
          <ListTimer timerData={listThree} />

          <TimerNumber
            numberCountOpacity={numberCountOpacity}
            number={timerFormatedValues.newSeconds}
          />
        </View>

        <TotalTimeText />

        <TimerAlert />
      </Animated.View>
    </View>
  );
}
