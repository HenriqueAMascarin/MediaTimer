import { Animated } from "react-native";
import { timerStyle } from "./styles/timerStyle";
import { textOpacity } from "./TimerAnimations/TimerPause";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";

export default function PauseText(){

    const stateTheme = useAppSelector(({stateTheme}) => stateTheme);

    return(
        <Animated.Text style={[timerStyle.pauseText, {opacity: textOpacity, color: stateTheme.principal}]} allowFontScaling={false}>Pausado</Animated.Text>
    )
}