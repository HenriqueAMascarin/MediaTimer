import { TouchableOpacity } from "react-native";
import StopSvg from "../../../assets/images/stop.svg";
import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";
import { stopTimer } from "@src/components/Timer/timerUtils/stopTimerUtils";
import { useAppSelector } from "@src/components/Utils/Redux/reduxHookCustom";

export default function StopButton() {
  const { translateText } = useTextTranslation();

  const stateAlert = useAppSelector(({ stateAlert }) => stateAlert);

  const audioPlayerState = useAppSelector(
    ({ stateMusic }) => stateMusic.music.audioPlayerState
  );

  const timerRunningValues = useAppSelector(
    ({ timerRunningValues }) => timerRunningValues
  );

  function onStop() {
    stopTimer({
      alertValues: stateAlert,
      audioPlayerState,
      timerLogicStates: {
        timerInterval: timerRunningValues.timerInterval,
        appStateListener: timerRunningValues.appStateListener,
      },
    });
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
