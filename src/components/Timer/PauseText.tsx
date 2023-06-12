import { Animated } from "react-native";
import { timerStyle } from "./styles/timerStyle";
import { textOpacity } from "./TimerAnimations/TimerPause";

export default function PauseText(){

    return(
        <Animated.Text style={[timerStyle.pauseText, {opacity: textOpacity}]} allowFontScaling={false}>Pausado</Animated.Text>
    )
}