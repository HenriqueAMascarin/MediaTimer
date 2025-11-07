import { TouchableOpacity } from "react-native/";
import PlaySvg from "../../../assets/images/play.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";
import { initializeTimer } from "@src/components/Timer/timerUtils/initializeTimer";
import { useAppSelector } from "@src/components/Utils/Redux/reduxHookCustom";
import { formatRunningValuesTimestamp } from "@src/components/Timer/timerUtils/formatRunningValuesTimestamp";

export default function PlayButton() {
  const { translateText } = useTextTranslation();

  const timerValues = useAppSelector(({ timerValues }) => timerValues);

  function onPlay() {
    const { newHours, newMinutes, newSeconds } = formatRunningValuesTimestamp(
      timerValues.runningValueTimestamp
    );

    initializeTimer({firstListValue: newHours, secondListValue: newMinutes, thirdListValue: newSeconds});
  }

  return (
    <TouchableOpacity
      style={[buttonsStyle.buttons, buttonsStyle.principalButton]}
      onPress={onPlay}
      aria-label={translateText("buttonArias.play")}
    >
      <PlaySvg
        width={"35px"}
        height={"35px"}
        fill={colorsStyle.principal.white}
      />
    </TouchableOpacity>
  );
}
