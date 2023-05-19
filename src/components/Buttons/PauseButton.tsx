
import { TouchableOpacity } from "react-native";
import { buttonsStyle } from "./styles/buttonsStyle";
import { pauseTimer } from "../Utils/valuesIntervalTimer";
import { colorsStyle } from "../Utils/colorsStyle";

import PauseSvg from '../../assets/images/pause.svg';
import PlaySvg from '../../assets/images/play.svg';
import { DataType } from "../Utils/ContextTimer";

export default function PauseButton({dataInfo}: {dataInfo: DataType}) {

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, buttonsStyle.playStateButtons]} onPress={() => pauseTimer(dataInfo)}>
            {dataInfo.stateTimer.state.isPaused ?
                <PlaySvg width={26} height={32} fill={colorsStyle.principal.white} />
                :
                <PauseSvg width={26} height={32} fill={colorsStyle.principal.white} />
            }
        </TouchableOpacity>
    )
}