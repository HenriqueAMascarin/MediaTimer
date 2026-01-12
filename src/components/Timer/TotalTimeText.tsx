import { timerStyle } from "./styles/timerStyle";
import { totalTimeOpacity } from "@src/components/Timer/animations/timerSequence";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { useTheme } from "../Utils/Context/ThemeContext";
import TextAnimated from "../Texts/TextAnimated";
import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";
import { useMemo } from "react";

export default function TotalTimeText() {
  const { translateText } = useTextTranslation();

  const timerRunningValues = useAppSelector(
    ({ timerRunningValues }) => timerRunningValues
  );

  const { dataTheme } = useTheme();

  const timerTotalValues = useMemo(() => {
    const hours = Math.floor(timerRunningValues.totalValue / 3600)
      .toString()
      .padStart(2, "0");

    const minutes = Math.floor((timerRunningValues.totalValue % 3600) / 60)
      .toString()
      .padStart(2, "0");

    const seconds = Math.floor((timerRunningValues.totalValue % 3600) % 60)
      .toString()
      .padStart(2, "0");

    return { hours, minutes, seconds };
  }, [timerRunningValues.totalValue]);

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
      {translateText("totalText")} {timerTotalValues.hours}:
      {timerTotalValues.minutes}:{timerTotalValues.seconds}{" "}
    </TextAnimated>
  );
}
