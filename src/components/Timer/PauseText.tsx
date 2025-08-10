import { timerStyle } from "./styles/timerStyle";
import { textOpacity } from "./TimerAnimations/TimerPause";
import { useTheme } from "../Utils/Context/ThemeContext";
import TextAnimated from "../Texts/TextAnimated";
import { translateText } from "i18n/translateText";

export default function PauseText() {
  const { dataTheme } = useTheme();

  return (
    <TextAnimated
      style={[
        timerStyle.pauseText,
        {
          opacity: textOpacity,
          color: dataTheme.animatedValues.principalColor,
        },
      ]}
      aria-label={translateText("pauseText.aria")}
    >
      {translateText("pauseText.text")}
    </TextAnimated>
  );
}
