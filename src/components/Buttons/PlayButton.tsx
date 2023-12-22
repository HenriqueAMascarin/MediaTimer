import { TouchableOpacity } from "react-native/";
import PlaySvg from "../../../assets/images/play.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { useDispatch } from "react-redux";
import { changeIsPickingValue } from "../Utils/Redux/features/stateTimer-slice";

export default function PlayButton() {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton]} onPressIn={() => dispatch(changeIsPickingValue(true))}>
      <PlaySvg width={"35px"} height={"35px"} fill={colorsStyle.principal.blue} />
    </TouchableOpacity>
  );
}
