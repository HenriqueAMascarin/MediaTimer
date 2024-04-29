import { TouchableOpacity } from "react-native";
import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import PauseSvg from "../../../assets/images/pause.svg";
import PlaySvg from "../../../assets/images/play.svg";

import { useDispatch } from "react-redux";
import { changeIsPaused } from "../Utils/Redux/features/stateTimer-slice";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";

export default function PauseButton() {
  const stateTimer = useAppSelector(({stateTimer}) => stateTimer);
  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, buttonsStyle.playStateButtons]} onPress={() => dispatch(changeIsPaused(!stateTimer.isPaused))}>
      {stateTimer.isPaused ? <PlaySvg width={"35px"} height={"35px"} fill={colorsStyle.principal.white} /> : <PauseSvg width={"35px"} height={"35px"} fill={colorsStyle.principal.white} />}
    </TouchableOpacity>
  );
}
