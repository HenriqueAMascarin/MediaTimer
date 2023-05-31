import { TouchableOpacity } from 'react-native';
import StopSvg from '../../../assets/images/stop.svg';
import { colorsStyle } from '../Utils/colorsStyle';
import { stopTimer } from '../Utils/valuesIntervalTimer';
import { buttonsStyle } from './styles/buttonsStyle';
import { DataType } from '../Utils/ContextTimer';

export default function StopButton({dataInfo}: {dataInfo: DataType}) {

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, buttonsStyle.playStateButtons]} onPress={() => stopTimer(dataInfo)}>
            <StopSvg width={26} height={32} fill={colorsStyle.principal.white} />
        </TouchableOpacity>
    )
}