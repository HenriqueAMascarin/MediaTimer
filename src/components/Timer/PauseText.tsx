import { timerStyle } from "./styles/timerStyle";
import { textOpacity } from "./TimerAnimations/TimerPause";
import { useTheme } from "../Utils/Context/ThemeContext";
import TextAnimated from "../Texts/TextAnimated";

export default function PauseText() {

    const { dataTheme } = useTheme();

    return (
        <TextAnimated style={[timerStyle.pauseText, { opacity: textOpacity, color: dataTheme.animatedValues.principalColor}]} aria-label="Temporizador pausado">Pausado</TextAnimated>
    )
}