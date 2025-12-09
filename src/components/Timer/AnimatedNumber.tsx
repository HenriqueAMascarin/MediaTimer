import { timerStyle } from "./styles/timerStyle";
import { Animated, View } from "react-native";
import { sizeItem } from "./styles/timerStyle";
import { useTheme } from "../Utils/Context/ThemeContext";
import TextAnimated from "../Texts/TextAnimated";
import { memo, useEffect, useMemo, useRef, useState } from "react";

interface AnimatedNumber {
  itemIndex: number;
  itemNumber: number;
  scrollY: Animated.Value;
  transitionNewScroll: number | null;
}

function AnimatedNumber({
  itemIndex,
  itemNumber,
  scrollY,
  transitionNewScroll,
}: AnimatedNumber) {
  const { dataTheme } = useTheme();

  const inputRange = useMemo(
    () => [
      (itemIndex - 2) * sizeItem,
      (itemIndex - 1) * sizeItem,
      itemIndex * sizeItem,
    ],
    [itemIndex]
  );

  let numberOpacity = scrollY.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
    extrapolate: "clamp",
  });

  let numberTransform = scrollY.interpolate({
    inputRange,
    outputRange: [0.85, 1, 0.85],
    extrapolate: "clamp",
  });

  const isSameIndexTransition = useMemo(() => {
    let status = transitionNewScroll
      ? transitionNewScroll == inputRange[1]
      : false;

    return status;
  }, [transitionNewScroll]);

  const scaleValue = useMemo(
    () => (isSameIndexTransition ? 1 : numberTransform),
    [isSameIndexTransition]
  );

  const numberValue = useMemo(
    () => (itemNumber < 10 ? "0" + itemNumber : itemNumber),
    [itemNumber]
  );

  return (
    <View>
      <TextAnimated
        style={[
          timerStyle.listItem,
          {
            opacity: isSameIndexTransition ? 1 : numberOpacity,
            transform: [{ scale: scaleValue }],
            color: dataTheme.animatedValues.principalColor,
          },
        ]}
      >
        {numberValue}
      </TextAnimated>
    </View>
  );
}

export default memo(AnimatedNumber);
