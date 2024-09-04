import { timerStyle } from "./styles/timerStyle";
import { Animated, Easing, View } from "react-native";
import { heightItem } from "./styles/timerStyle";
import { useTheme } from "../Utils/Context/ThemeContext";
import TextAnimated from "../Texts/TextAnimated";

interface AnimatedNumber {
    itemIndex: number,
    itemNumber: number,
    scrollY: Animated.Value,
}

export default function AnimatedNumber({ itemIndex, itemNumber, scrollY }: AnimatedNumber) {

    const { dataTheme } = useTheme();

    let numberOpacity: Animated.AnimatedInterpolation<string | number> | number = new Animated.Value(0.5);
    let numberTransform: Animated.AnimatedInterpolation<string | number> | number = new Animated.Value(0.8);

    const inputRange = [(itemIndex - 2) * heightItem, (itemIndex - 1) * heightItem, (itemIndex) * heightItem];

    numberOpacity = scrollY.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        easing: Easing.ease,
        extrapolate: "clamp",
    });

    numberTransform = scrollY.interpolate({
        inputRange,
        outputRange: [0.85, 1, 0.85],
        easing: Easing.ease,
        extrapolate: "clamp",
    });

    return (
        <View>
            <TextAnimated style={[timerStyle.listItem, { opacity: numberOpacity, transform: [{ scale: numberTransform }], color: dataTheme.animatedValues.principalColor }]}>
                {itemNumber < 10 ? "0" + itemNumber : itemNumber}
            </TextAnimated>
        </View>
    )
}