import { timerStyle } from "./styles/timerStyle";
import { totalTimeOpacity } from "./TimerAnimations/TimerSequence";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { useTheme } from "../Utils/Context/ThemeContext";
import TextAnimated from "../Texts/TextAnimated";
import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";

export default function TotalTimeText() {
  const { translateText } = useTextTranslation();

  const timerValues = useAppSelector(({ timerValues }) => timerValues);
  
  const { dataTheme } = useTheme();

  const hours = Math.floor(timerValues.totalValue / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timerValues.totalValue % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timerValues.totalValue % 3600) % 60)
    .toString()
    .padStart(2, "0");

  return (
    <TextAnimated
      style={[
        timerStyle.totalTimeText,
        {
          opacity: totalTimeOpacity,
          color: dataTheme.animatedValues.secondaryColor,
        },
      ]}
    >
      {translateText("totalText")} {hours}:{minutes}:{seconds}{" "}
    </TextAnimated>
  );
}
