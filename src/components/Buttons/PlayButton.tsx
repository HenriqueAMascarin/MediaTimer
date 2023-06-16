import { TouchableOpacity } from "react-native/";
import PlaySvg from "../../../assets/images/play.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { reduxPassChildren } from "../Utils/Redux/store";
import { changeIsPickingValue } from "../Utils/Redux/features/stateTimer-slice";


export default function PlayButton({ dispatch }: reduxPassChildren) {

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton]} onPress={() => dispatch(changeIsPickingValue(true))}>
            <PlaySvg width={26} height={32} fill={colorsStyle.principal.blue}/>
        </TouchableOpacity>
    )
}