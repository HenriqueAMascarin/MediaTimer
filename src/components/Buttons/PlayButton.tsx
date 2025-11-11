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

  const stateAlert = useAppSelector(({ stateAlert }) => stateAlert);

  const timerRunningValues = useAppSelector(
    ({ timerRunningValues }) => timerRunningValues
  );

  function onPlay() {
    initializeTimer({
      timerValues: {
        firstListValue: listTimerCurrentValues.listOneCurrentNumber,
        secondListValue: listTimerCurrentValues.listTwoCurrentNumber,
        thirdListValue: listTimerCurrentValues.listThreeCurrentNumber,
      },
      timerStates: {
        alertValues: stateAlert,
        audioPlayerState: stateMusic.music.audioPlayerState,
        timerLogicStates: {
          appStateListener: timerRunningValues.appStateListener,
          timerInterval: timerRunningValues.timerInterval,
        },
      },
      translateTextFunction: translateText,
      musicLink: stateMusic.music.musicLink,
    });
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
