import { timerStyle } from "./styles/timerStyle";
import { Animated } from "react-native";
import { colorsStyle } from "../Utils/colorsStyle";
import { colorNumber } from "./TimerAnimations/TimerPause";
import { useTheme } from "../Utils/Context/ThemeContext";

interface TimerNumber {
    numberCountOpacity: Animated.Value,
    number: string,
}

export default function TimerNumber({ numberCountOpacity, number }: TimerNumber) {

    const { data: dataTheme } = useTheme();

    let colorAnimated = colorNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [colorsStyle.principal.white, colorsStyle.principal.blue],
        extrapolate: "clamp",
    })

    return (
        <Animated.Text style={[timerStyle.listItem, { position: "absolute", opacity: numberCountOpacity, color: colorAnimated }]} allowFontScaling={false}>
            {number}
        </Animated.Text>
    )
}