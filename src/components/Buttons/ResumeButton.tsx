import { TouchableOpacity } from "react-native";
import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";
import PlaySvg from "../../../assets/images/play.svg";
import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";
import resumeTimer from "@src/components/Timer/timerUtils/resumeTimer";
import { useAppSelector } from "@src/components/Utils/Redux/reduxHookCustom";

export default function ResumeButton() {
  const { translateText } = useTextTranslation();

  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);

  const stateAlert = useAppSelector(({ stateAlert }) => stateAlert);

  const timerRunningValues = useAppSelector(
    ({ timerRunningValues }) => timerRunningValues
  );

  function onResume() {
    resumeTimer({
      runningValueTimestamp: timerRunningValues.runningValueTimestamp,
      timerStates: {
        alertValues: stateAlert,
        audioPlayerState: stateMusic.music.audioPlayerState,
        timerLogicStates: {
          appStateListener: timerRunningValues.appStateListener,
          timerInterval: timerRunningValues.timerInterval,
        },
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
