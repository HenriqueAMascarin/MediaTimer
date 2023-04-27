import { timerStyle } from "./styles/timerStyle";
import { Animated, Easing } from "react-native";
import { useEffect } from "react";

type animatedNumber = {
    itemIndex: number,
    itemNumber: number,
    scrollY: Animated.Value,
    heightItem: number,
}

export default function AnimatedNumber({ itemIndex, itemNumber, scrollY, heightItem }: animatedNumber) {

    let numberOpacity: Animated.AnimatedInterpolation<string | number> | number = 0.5;
    let numberTransform: Animated.AnimatedInterpolation<string | number> | number = 0.8;

    const inputRange = [(itemIndex - 2) * heightItem, (itemIndex - 1) * heightItem, (itemIndex) * heightItem]

    numberOpacity = scrollY.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        extrapolate: "clamp",
    })
    numberTransform = scrollY.interpolate({
        inputRange,
        outputRange: [0.85, 1, 0.85],
        extrapolate: "clamp",
    })

    return (
        <Animated.Text style={[timerStyle.listItem, { opacity: numberOpacity, transform: [{ scale: numberTransform }] }]} >
            {itemNumber < 10 ? "0" + itemNumber : itemNumber}
        </Animated.Text>
    )
}