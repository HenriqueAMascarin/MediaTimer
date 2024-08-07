import { Animated, TouchableOpacity } from "react-native";
import { CustomAnimatedSvg, alertSvgXml } from "../Utils/svgsXml";
import { useTheme } from "../Utils/Context/ThemeContext";
import { timerAlertOpacity } from "./TimerAnimations/TimerSequence";
import { timerStyle } from "./styles/timerStyle";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { colorsStyle } from "../Utils/colorsStyle";
import { alertLocalKey } from "../Utils/globalVars";
import { useDispatch } from "react-redux";
import { changeIsAlert } from "../Utils/Redux/features/stateAlert-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TimerAlert() {

    const { dataTheme } = useTheme();

    const stateAlert = useAppSelector(({ stateAlert }) => stateAlert);

    const dispatch = useDispatch();

    async function changeTimerAlert() {
        const statusAlert = JSON.stringify(!stateAlert.isAlert);

        AsyncStorage.setItem(alertLocalKey, statusAlert);

        dispatch(changeIsAlert(!stateAlert.isAlert));
    }

    return (
        <Animated.View style={[timerStyle.timerAlertSvg, { opacity: timerAlertOpacity }]}>
            <TouchableOpacity onPress={() => changeTimerAlert()} aria-label={`Clique para ${stateAlert.isAlert ? 'desativar' : 'ativar'} o alerta quando o temporizador finaliza`}>
                <CustomAnimatedSvg width={"24px"} height={"24px"} xml={alertSvgXml} color={stateAlert.isAlert ? colorsStyle.principal.blue : dataTheme.animatedValues.secondaryColor} />
            </TouchableOpacity>
        </Animated.View>
    );
}