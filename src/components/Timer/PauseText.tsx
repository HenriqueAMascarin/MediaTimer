import { Animated } from "react-native";
import { timerStyle } from "./styles/timerStyle";
import { textOpacity } from "./TimerAnimations/TimerPause";
import { useTheme } from "../Utils/Context/ThemeContext";

export default function PauseText(){

    const {data: dataTheme} = useTheme();

    return(
        <Animated.Text style={[timerStyle.pauseText, {opacity: textOpacity, color: dataTheme.animatedValues.principalColor}]} allowFontScaling={false}>Pausado</Animated.Text>
    )
}