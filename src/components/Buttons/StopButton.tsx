import { TouchableOpacity } from "react-native";
import StopSvg from "../../../assets/images/stop.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { useDispatch } from "react-redux";
import { changeIsPlay } from "../Utils/Redux/features/stateTimer-slice";

export default function StopButton() {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, buttonsStyle.playStateButtons]} onPress={() => dispatch(changeIsPlay(false))} aria-label="Botão de parar o timer">
      <StopSvg width={"35px"} height={"35px"} fill={colorsStyle.principal.white} />
    </TouchableOpacity>
  );
}
