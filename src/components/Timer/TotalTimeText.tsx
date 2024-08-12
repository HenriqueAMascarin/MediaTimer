import { Animated } from "react-native";
import { timerStyle } from "./styles/timerStyle";
import { totalTimeOpacity } from "./TimerAnimations/TimerSequence";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { useTheme } from "../Utils/Context/ThemeContext";

export default function TotalTimeText() {

    const timerValues = useAppSelector(({ timerValues }) => timerValues);
    const { dataTheme } = useTheme();


    const hours = Math.floor(timerValues.totalValue / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((timerValues.totalValue % 3600) / 60).toString().padStart(2, "0");
    const seconds = Math.floor((timerValues.totalValue % 3600) % 60).toString().padStart(2, "0");

    return (
        <Animated.Text style={[timerStyle.totalTimeText, { opacity: totalTimeOpacity, color: dataTheme.animatedValues.secondaryColor, fontFamily: 'Roboto' }]} allowFontScaling={false}>Total {hours}:{minutes}:{seconds} </Animated.Text>
    )
}