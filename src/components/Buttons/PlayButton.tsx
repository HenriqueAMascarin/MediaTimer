import { TouchableOpacity } from "react-native/";
import PlaySvg from "../../../assets/images/play.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { buttonInterface } from "./Buttons";
import { changeTimerState } from "../Utils/Redux/features/stateTimer-slice";

export default function PlayButton({ dispatch }: buttonInterface) {

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton]} onPress={() => dispatch(changeTimerState({isPlay: false, isPaused: false, isPickingValue: true}))}>
            <PlaySvg width={26} height={32} fill={colorsStyle.principal.blue}/>
        </TouchableOpacity>
    )
}