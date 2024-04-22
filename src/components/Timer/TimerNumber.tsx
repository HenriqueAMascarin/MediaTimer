import { timerStyle } from "./styles/timerStyle";
import { Animated } from "react-native";
import { colorsStyle } from "../Utils/colorsStyle";
import { useTheme } from "../Utils/Context/ThemeContext";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";

interface TimerNumber {
    numberCountOpacity: Animated.Value,
    number: string,
}

export default function TimerNumber({ numberCountOpacity, number }: TimerNumber) {

    const { dataTheme } = useTheme();
    const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);

    return (
        <Animated.Text style={[timerStyle.listItem, { position: "absolute", opacity: numberCountOpacity, color: stateTimer.isPaused ? colorsStyle.principal.blue : dataTheme.animatedValues.principalColor }]} allowFontScaling={false}>
            {number}
        </Animated.Text>
    )
}