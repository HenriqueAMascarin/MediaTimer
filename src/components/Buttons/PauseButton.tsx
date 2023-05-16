
import { TouchableOpacity } from "react-native";
import { useData } from "../Utils/ContextTimer";
import { buttonsStyle } from "./styles/buttonsStyle";
import { pauseTimer } from "../Utils/valuesIntervalTimer";
import { colorsStyle } from "../colorsStyle";

import PauseSvg from '../../assets/images/pause.svg';
import PlaySvg from '../../assets/images/play.svg';


export default function PauseButton() {

    const data = useData();

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, buttonsStyle.playStateButtons]} onPress={() => pauseTimer(data)}>
            {data.stateTimer.state.isPaused ?
                <PlaySvg width={26} height={32} fill={colorsStyle.principal.white} />
                :
                <PauseSvg width={26} height={32} fill={colorsStyle.principal.white} />
            }
        </TouchableOpacity>
    )
}