import { TouchableOpacity } from 'react-native';
import StopSvg from '../../../assets/images/stop.svg';

import { colorsStyle } from '../Utils/colorsStyle';
import { buttonsStyle } from './styles/buttonsStyle';

import { buttonInterface } from "./Buttons";

import { changeTimerState } from '../Utils/Redux/features/stateTimer-slice';


export default function StopButton({ dispatch }: buttonInterface) {

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, buttonsStyle.playStateButtons]} onPress={() => dispatch(changeTimerState({isPlay: false, isPaused: false, isPickingValue: false}))}>
            <StopSvg width={26} height={32} fill={colorsStyle.principal.white} />
        </TouchableOpacity>
    )
}