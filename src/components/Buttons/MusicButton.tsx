import { TouchableOpacity } from "react-native/";
import MusicSvg from "../../../assets/images/music.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { useDispatch } from "react-redux";
import { changeIsSelection, changeIsSelectionYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { RootState } from "../Utils/Redux/store";
import { useMemo } from "react";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";

export default function MusicButton() {
  const data = useAppSelector((state) => state);
  const dispatch = useDispatch();

  function toggleTab() {
    dispatch(changeIsSelection(!data.stateMusic.isSelection));
    dispatch(changeIsSelectionYoutube(false));
  }

  const activeStatus = useMemo(() => {
    let status = false;

    for (let key in data.stateMusic.pressBtn) {
      if(key != 'reset' && data.stateMusic.pressBtn[key] == true){
       status = true
      }
    }
    return status;
  }, [data.stateMusic.pressBtn])

  return (
    <TouchableOpacity style={[buttonsStyle.buttons]} onPress={() => toggleTab()}>
      <MusicSvg width={"35px"} height={"35px"} fill={activeStatus ? colorsStyle.principal.blue : colorsStyle.principal.black} />
    </TouchableOpacity>
  );
}
