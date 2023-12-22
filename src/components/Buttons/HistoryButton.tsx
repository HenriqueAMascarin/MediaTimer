import { TouchableOpacity } from "react-native/";
import HistorySvg from "../../../assets/images/history.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { changeIsPickingValue } from "../Utils/Redux/features/stateTimer-slice";
import { useDispatch } from "react-redux";

export default function HistoryButton() {

  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={[buttonsStyle.buttons]} onPressIn={() => dispatch(changeIsPickingValue(true))}>
      <HistorySvg width={"35px"} height={"35px"} fill={colorsStyle.principal.black} />
    </TouchableOpacity>
  );
}
