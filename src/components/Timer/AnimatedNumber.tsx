import { timerStyle } from "./styles/timerStyle";
import { Animated, View } from "react-native";
import { heightItem } from "./styles/timerStyle";
import { useTheme } from "../Utils/Context/ThemeContext";
import TextAnimated from "../Texts/TextAnimated";
import { useEffect, useRef, useState } from "react";

interface AnimatedNumber {
  itemIndex: number;
  itemNumber: number;
  scrollY: Animated.Value;
  transitionNewScroll: number | null;
}

export default function AnimatedNumber({
  itemIndex,
  itemNumber,
  scrollY,
  transitionNewScroll,
}: AnimatedNumber) {
  const { dataTheme } = useTheme();

  let numberOpacity: Animated.AnimatedInterpolation<string | number> | number =
    useRef(new Animated.Value(0.5)).current;
  let numberTransform:
    | Animated.AnimatedInterpolation<string | number>
    | number = useRef(new Animated.Value(0.8)).current;

  const inputRange = [
    (itemIndex - 2) * heightItem,
    (itemIndex - 1) * heightItem,
    itemIndex * heightItem,
  ];

  numberOpacity = scrollY.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
    extrapolate: "clamp",
  });

  numberTransform = scrollY.interpolate({
    inputRange,
    outputRange: [0.85, 1, 0.85],
    extrapolate: "clamp",
  });

  const [isSameIndexTransition, changeIsSameIndexTransition] = useState(false);

  useEffect(() => {
    let status = transitionNewScroll
      ? transitionNewScroll == inputRange[1]
      : false;

    if (status != isSameIndexTransition) {
      changeIsSameIndexTransition(status);
    }
  }, [transitionNewScroll]);

  return (
    <View>
      <TextAnimated
        style={[
          timerStyle.listItem,
          {
            opacity: isSameIndexTransition ? 1 : numberOpacity,
            transform: [{ scale: isSameIndexTransition ? 1 : numberTransform }],
            color: dataTheme.animatedValues.principalColor,
          },
        ]}
      >
        {itemNumber < 10 ? "0" + itemNumber : itemNumber}
      </TextAnimated>
    </View>
  );
}
