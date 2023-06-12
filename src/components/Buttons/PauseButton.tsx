
import { TouchableOpacity } from "react-native";
import { buttonsStyle } from "./styles/buttonsStyle";
import { pauseTimer } from "../Utils/valuesIntervalTimer";
import { colorsStyle } from "../Utils/colorsStyle";

import PauseSvg from '../../../assets/images/pause.svg';
import PlaySvg from '../../../assets/images/play.svg';

import { buttonInterface } from "./Buttons";

export default function PauseButton({dataInfo, dispatch}: buttonInterface) {

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, buttonsStyle.playStateButtons]} onPress={() => pauseTimer({dataInfo: dataInfo, dispatch: dispatch})}>
            {dataInfo.stateTimer.isPaused ?
                <PlaySvg width={26} height={32} fill={colorsStyle.principal.white} />
                :
                <PauseSvg width={26} height={32} fill={colorsStyle.principal.white} />
            }
        </TouchableOpacity>
    )
}