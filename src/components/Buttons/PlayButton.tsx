import { TouchableOpacity } from "react-native/";
import PlaySvg from "../../../assets/images/play.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";
import { initializeTimer } from "@src/components/Timer/timerUtils/initializeTimer";
import { useAppSelector } from "@src/components/Utils/Redux/reduxHookCustom";

export default function PlayButton() {
  const { translateText } = useTextTranslation();

  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);

  const listTimerCurrentValues = useAppSelector(
    ({ listTimerCurrentValues }) => listTimerCurrentValues
  );

  function onPlay() {
    initializeTimer(
      {
        firstListValue: listTimerCurrentValues.listOneCurrentNumber,
        secondListValue: listTimerCurrentValues.listTwoCurrentNumber,
        thirdListValue: listTimerCurrentValues.listThreeCurrentNumber,
      },
      {
        audioPlayerState: stateMusic.music.audioPlayerState,
        musicLink: stateMusic.music.musicLink,
      }
    );
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
