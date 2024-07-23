import { TouchableOpacity } from "react-native/";
import HistorySvg from "@assets/images/history.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { useDispatch } from "react-redux";
import { changeIsHistory } from "../Utils/Redux/features/stateHistory-slice";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { changeIsSelection, changeIsSelectionYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { useMemo } from "react";

export default function HistoryButton() {

  const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);

  const dispatch = useDispatch();

  function changeHistory() {
    if (stateHistory.historyItems.length > 0) {
      dispatch(changeIsSelectionYoutube(false));
      dispatch(changeIsSelection(false));
      dispatch(changeIsHistory(!stateHistory.isHistory));
    }
  }

  const hasItemSelected = useMemo(() => stateHistory.historyItems.find((el) => el.isSelected == true), [stateHistory.historyItems])

  return (
    <TouchableOpacity style={[buttonsStyle.buttons, { backgroundColor: hasItemSelected ? colorsStyle.principal.blue : colorsStyle.principal.gray }]} onPress={() => changeHistory()} aria-label="Botão para ver o histórico">
      <HistorySvg width={"35px"} height={"35px"} fill={hasItemSelected ? colorsStyle.principal.white : colorsStyle.principal.black} />
    </TouchableOpacity>
  );
}
