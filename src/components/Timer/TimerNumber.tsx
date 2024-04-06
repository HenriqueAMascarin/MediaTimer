import { timerStyle } from "./styles/timerStyle";
import { Animated } from "react-native";
import { colorsStyle } from "../Utils/colorsStyle";
import { colorNumber } from "./TimerAnimations/TimerPause";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";

interface TimerNumber {
    numberCountOpacity: Animated.Value,
    number: string,
}

export default function TimerNumber({ numberCountOpacity, number }: TimerNumber) {

    const stateTheme = useAppSelector(({ stateTheme }) => stateTheme);

    let colorAnimated = colorNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [stateTheme.principal, colorsStyle.principal.blue],
        extrapolate: "clamp",
    })

    return (
        <Animated.Text style={[timerStyle.listItem, { position: "absolute", opacity: numberCountOpacity, color: colorAnimated }]} allowFontScaling={false}>
            {number}
        </Animated.Text>
    )
}