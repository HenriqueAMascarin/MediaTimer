import { timerStyle } from "./styles/timerStyle";
import { Animated } from "react-native";
import { DataType } from "../Utils/ContextTimer";
import { LayoutChangeEvent } from "react-native";
import { heightItem } from "./styles/timerStyle";

interface AnimatedNumber {
    itemIndex: number,
    itemNumber: number,
    scrollY: Animated.Value,
}

export default function AnimatedNumber({ itemIndex, itemNumber, scrollY }: AnimatedNumber) {

    let numberOpacity: Animated.AnimatedInterpolation<string | number> | number = new Animated.Value(0.5);
    let numberTransform: Animated.AnimatedInterpolation<string | number> | number = new Animated.Value(0.8);

    const inputRange = [(itemIndex - 2) * heightItem, (itemIndex - 1) * heightItem, (itemIndex) * heightItem];

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

    return (
        <Animated.Text style={[timerStyle.listItem, { opacity: numberOpacity, transform: [{ scale: numberTransform }] }]} allowFontScaling={false}>
            {itemNumber < 10 ? "0" + itemNumber : itemNumber}
        </Animated.Text>
    )
}