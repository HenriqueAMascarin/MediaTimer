import { TouchableOpacity } from 'react-native';
import StopSvg from '../../assets/images/stop.svg';
import { colorsStyle } from '../colorsStyle';
import { useData } from '../Utils/ContextTimer';
import { stopTimer } from '../Utils/valuesIntervalTimer';
import { buttonsStyle } from './styles/buttonsStyle';


export default function StopButton() {

    const data = useData()

    function stopButton(){
        stopTimer(data);
        data.timeStamp.state = 0;
        data.stateTimer.changeState({ isPlay: false, isPaused: false })
    }

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, buttonsStyle.playStateButtons]} onPress={() => stopButton()}>
            <StopSvg width={26} height={32} fill={colorsStyle.principal.white} />
        </TouchableOpacity>
    )
}