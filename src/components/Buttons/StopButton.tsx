import { TouchableOpacity } from 'react-native';
import StopSvg from '../../../assets/images/stop.svg';
import { colorsStyle } from '../Utils/colorsStyle';
import { stopTimer } from '../Utils/valuesIntervalTimer';
import { buttonsStyle } from './styles/buttonsStyle';
import { DataType } from '../Utils/ContextTimer';
import { fontScaleMobile } from '../Timer/styles/timerStyle';

export default function StopButton({dataInfo}: {dataInfo: DataType}) {

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, buttonsStyle.playStateButtons]} onPress={() => stopTimer(dataInfo)}>
            <StopSvg width={26 * fontScaleMobile} height={32 * fontScaleMobile} fill={colorsStyle.principal.white} />
        </TouchableOpacity>
    )
}