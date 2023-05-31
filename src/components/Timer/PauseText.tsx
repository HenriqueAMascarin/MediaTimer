import { Animated } from "react-native";
import { DataType } from "../Utils/ContextTimer";
import { timerStyle } from "./styles/timerStyle";
import { textOpacity } from "./TimerAnimations/TimerPauseText";

interface PauseText{
    dataInfo: DataType,
}

export default function PauseText({dataInfo}: PauseText){

    return(
        <Animated.Text style={[timerStyle.pauseText, {opacity: textOpacity}]} allowFontScaling={false}>Pausado</Animated.Text>
    )
}