import { TouchableOpacity } from "react-native";
import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";
import PlaySvg from "../../../assets/images/play.svg";
import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";
import resumeTimer from "@src/components/Timer/timerUtils/resumeTimer";

export default function ResumeButton() {
  const { translateText } = useTextTranslation();

  function onResume() {
    resumeTimer({
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
      onPress={onResume}
      aria-label={translateText("buttonArias.resume")}
    >
      <PlaySvg
        width={"35px"}
        height={"35px"}
        fill={colorsStyle.principal.white}
      />
    </TouchableOpacity>
  );
}
