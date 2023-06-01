import { timerStyle } from "./styles/timerStyle";
import { Animated } from "react-native";
import { colorsStyle } from "../Utils/colorsStyle";
import { colorNumber } from "./TimerAnimations/TimerPause";

interface TimerNumber {
    numberCountOpacity: Animated.Value,
    number: string,
}

export default function TimerNumber({numberCountOpacity, number}: TimerNumber) {

    let colorAnimated = colorNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [colorsStyle.principal.black, colorsStyle.principal.blue],
        extrapolate: "clamp",
    })

    return (
        <Animated.Text style={[timerStyle.listItem, { position: "absolute", opacity: numberCountOpacity, color: colorAnimated}]} allowFontScaling={false}>
            {number}
        </Animated.Text>
    )
}