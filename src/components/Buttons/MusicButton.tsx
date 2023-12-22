import { TouchableOpacity } from "react-native/";
import MusicSvg from "../../../assets/images/music.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { useDispatch } from "react-redux";
import { changeSelection } from "../Utils/Redux/features/statesMusic-slice";
import { RootState } from "../Utils/Redux/store";

export default function MusicButton({ dataInfo }: { dataInfo: RootState }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={[buttonsStyle.buttons]} onPressIn={() => dispatch(changeSelection(!dataInfo.stateMusic.isSelection))}>
      <MusicSvg width={"35px"} height={"35px"} fill={colorsStyle.principal.black} />
    </TouchableOpacity>
  );
}
