import { TouchableOpacity } from "react-native";
import StopSvg from "../../../assets/images/stop.svg";
import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";
import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";
import { stopTimer } from "@src/components/Timer/timerUtils/stopTimerUtils";

export default function StopButton() {
  const { translateText } = useTextTranslation();

  function onStop() {
    stopTimer();
  }

  return (
    <TouchableOpacity
      style={[
        buttonsStyle.buttons,
        buttonsStyle.principalButton,
        buttonsStyle.playStateButtons,
      ]}
      onPress={onStop}
      aria-label={translateText("buttonArias.stop")}
    >
      <StopSvg
        width={"35px"}
        height={"35px"}
        fill={colorsStyle.principal.white}
      />
    </TouchableOpacity>
  );
}
