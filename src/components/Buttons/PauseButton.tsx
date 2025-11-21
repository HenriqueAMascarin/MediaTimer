import { TouchableOpacity } from "react-native";
import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";
import PauseSvg from "../../../assets/images/pause.svg";
import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";
import { pauseTimer } from "@src/components/Timer/timerUtils/pauseTimer";

export default function PauseButton() {
  const { translateText } = useTextTranslation();

  function onPause() {
    pauseTimer({
      translateTextFunction: translateText,
    });
  }

  return (
    <TouchableOpacity
      style={[
        buttonsStyle.buttons,
        buttonsStyle.principalButton,
        buttonsStyle.playStateButtons,
      ]}
      onPress={onPause}
      aria-label={translateText("buttonArias.pause")}
    >
      <PauseSvg
        width={"35px"}
        height={"35px"}
        fill={colorsStyle.principal.white}
      />
    </TouchableOpacity>
  );
}
