import { TouchableOpacity } from "react-native/";
import MusicSvg from "../../../assets/images/music.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { useDispatch } from "react-redux";
import { changeIsSelection, changeIsSelectionYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { useMemo } from "react";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { changeIsHistory } from "../Utils/Redux/features/stateHistory-slice";

export default function MusicButton() {
  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
  const dispatch = useDispatch();

  function toggleTab() {
    dispatch(changeIsSelectionYoutube(false));
    dispatch(changeIsHistory(false))
    dispatch(changeIsSelection(!stateMusic.isSelection));
  }

  const activeStatus = useMemo(() => {
    let status = false;

    for (let key in stateMusic.pressBtn) {
      if (key != 'reset' && stateMusic.pressBtn[key] == true) {
        status = true
      }
    }
    return status;
  }, [stateMusic.pressBtn]);

  return (
    <TouchableOpacity style={[buttonsStyle.buttons, { backgroundColor: activeStatus ? colorsStyle.principal.blue : colorsStyle.principal.gray }]} onPress={() => toggleTab()} aria-label="Botão para ver os áudios">
      <MusicSvg width={"35px"} height={"35px"} fill={activeStatus ? colorsStyle.principal.white : colorsStyle.principal.black} />
    </TouchableOpacity>
  );
}
