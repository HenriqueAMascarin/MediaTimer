import { timerStyle } from "./styles/timerStyle";
import { Animated } from "react-native";
import { colorsStyle } from "../Utils/colorsStyle";
import { useTheme } from "../Utils/Context/ThemeContext";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import TextAnimated from "../Texts/TextAnimated";

interface TimerNumber {
  numberCountOpacity: Animated.Value;
  number: string;
}

export default function TimerNumber({
  numberCountOpacity,
  number,
}: TimerNumber) {
  const { dataTheme } = useTheme();
  const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);

  return (
    <TextAnimated
      style={[
        timerStyle.listItem,
        {
          position: "absolute",
          opacity: numberCountOpacity,
          color: stateTimer.isPaused
            ? colorsStyle.principal.blue
            : dataTheme.animatedValues.principalColor,
        },
      ]}
    >
      {number}
    </TextAnimated>
  );
}
