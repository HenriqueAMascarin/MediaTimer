import { TouchableOpacity } from 'react-native';
import StopSvg from '../../../assets/images/stop.svg';

import { buttonsStyle } from './styles/buttonsStyle';
import { colorsStyle } from '../Utils/colorsStyle';

import { reduxPassChildren } from '../Utils/Redux/store';
import { changeIsPlay } from '../Utils/Redux/features/stateTimer-slice';


export default function StopButton({ dispatch }: reduxPassChildren) {

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, buttonsStyle.playStateButtons]} onPress={() => dispatch(changeIsPlay(false))}>
            <StopSvg width={26} height={32} fill={colorsStyle.principal.white} />
        </TouchableOpacity>
    )
}