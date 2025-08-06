import { timerStyle } from "./styles/timerStyle";
import { textOpacity } from "./TimerAnimations/TimerPause";
import { useTheme } from "../Utils/Context/ThemeContext";
import TextAnimated from "../Texts/TextAnimated";
import { useTranslation } from "react-i18next";

export default function PauseText() {
  const { t } = useTranslation();
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
      aria-label={t("pauseText.aria")}
    >
      {t("pauseText.text")}
    </TextAnimated>
  );
}
