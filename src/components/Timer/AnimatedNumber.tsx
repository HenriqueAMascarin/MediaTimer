import { timerStyle } from "./styles/timerStyle";
import { Animated, View } from "react-native";
import { sizeItem } from "./styles/timerStyle";
import { useTheme } from "../Utils/Context/ThemeContext";
import TextAnimated from "../Texts/TextAnimated";
import { memo, useMemo } from "react";

interface AnimatedNumber {
  itemIndex: number;
  itemNumber: number;
  scrollY: Animated.Value;
  numberIndexToTransition: number | null;
}

function AnimatedNumber({
  itemIndex,
  itemNumber,
  scrollY,
  numberIndexToTransition,
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

  const isSameIndexTransition = useMemo(
    () => numberIndexToTransition == itemIndex,
    [numberIndexToTransition]
  );

  const scaleValue = useMemo(
    () => (isSameIndexTransition ? 1 : numberTransform),
    [isSameIndexTransition]
  );

  const numberValue = useMemo(
    () => (itemNumber < 10 ? "0" + itemNumber : itemNumber),
    [itemNumber]
  );

  const opacityNumber = useMemo(
    () => (isSameIndexTransition ? 1 : numberOpacity),
    [isSameIndexTransition]
  );

  return (
    <View>
      <TextAnimated
        style={[
          timerStyle.listItem,
          {
            opacity: opacityNumber,
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
