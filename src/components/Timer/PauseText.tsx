import { timerStyle } from "./styles/timerStyle";
import { textOpacity } from "./animations/timerPauseOrResume";
import { useTheme } from "../Utils/Context/ThemeContext";
import TextAnimated from "../Texts/TextAnimated";
import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";

export default function PauseText() {
  const { translateText } = useTextTranslation();

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
