import { TouchableOpacity } from "react-native/";
import HistorySvg from "@assets/images/history.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { useDispatch } from "react-redux";
import { changeIsHistory } from "../Utils/Redux/features/stateHistory-slice";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { changeIsSelection, changeIsSelectionYoutube } from "../Utils/Redux/features/statesMusic-slice";

export default function HistoryButton() {

  const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);

  const dispatch = useDispatch();

  function changeHistory() {
    dispatch(changeIsSelectionYoutube(false));
    dispatch(changeIsSelection(false));
    dispatch(changeIsHistory(!stateHistory.isHistory));
  }

  return (
    <TouchableOpacity style={[buttonsStyle.buttons]} onPress={() => changeHistory()}>
      <HistorySvg width={"35px"} height={"35px"} fill={colorsStyle.principal.black} />
    </TouchableOpacity>
  );
}
