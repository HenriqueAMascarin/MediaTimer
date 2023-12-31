import { TouchableOpacity } from "react-native/";
import MusicSvg from "../../../assets/images/music.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { useDispatch } from "react-redux";
import { changeIsSelection, changeYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { RootState } from "../Utils/Redux/store";

export default function MusicButton({ dataInfo }: { dataInfo: RootState }) {
  const dispatch = useDispatch();

  function toggleTab() {
    dispatch(changeIsSelection(!dataInfo.stateMusic.isSelection));
    dispatch(changeYoutube(false));
  }

  return (
    <TouchableOpacity style={[buttonsStyle.buttons]} onPressIn={() => toggleTab()}>
      <MusicSvg width={"35px"} height={"35px"} fill={colorsStyle.principal.black} />
    </TouchableOpacity>
  );
}
