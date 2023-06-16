
import { TouchableOpacity } from "react-native";
import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import PauseSvg from '../../../assets/images/pause.svg';
import PlaySvg from '../../../assets/images/play.svg';

import { reduxPassChildren } from "../Utils/Redux/store";
import { changeIsPaused } from "../Utils/Redux/features/stateTimer-slice";



export default function PauseButton({ dataInfo, dispatch }: reduxPassChildren) {

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, buttonsStyle.playStateButtons]} 
        onPress={() => dispatch(changeIsPaused(!dataInfo.stateTimer.isPaused))}>
            {dataInfo.stateTimer.isPaused ?
                <PlaySvg width={26} height={32} fill={colorsStyle.principal.white} />
                :
                <PauseSvg width={26} height={32} fill={colorsStyle.principal.white} />
            }
        </TouchableOpacity>
    )
}