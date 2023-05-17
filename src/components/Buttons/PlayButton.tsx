import { TouchableOpacity } from "react-native/";
import { buttonsStyle } from "./styles/buttonsStyle";
import { useData } from "../Utils/ContextTimer";
import { heightItems } from "../Timer/Timer";
import { playTimer } from "../Utils/valuesIntervalTimer";
import { colorsStyle } from "../colorsStyle";

import PlaySvg from "../../assets/images/play.svg";

export default function PlayButton() {

    const data = useData();

    function timerStart() {
        if (data.dataItem.scrollOne != 0 || data.dataItem.scrollTwo != 0 || data.dataItem.scrollThree != 0) {
            const numberHours = (data.dataItem.scrollOne / heightItems) * 3600;
            const numberMinutes = (data.dataItem.scrollTwo / heightItems) * 60;
            const numberSeconds = (data.dataItem.scrollThree / heightItems);

            let timeStampValue = (numberHours + numberMinutes + numberSeconds);

            playTimer(data, timeStampValue);
        }
    }

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton, {zIndex: 1}]} onPress={() => timerStart()}>
            <PlaySvg width={26} height={32} fill={colorsStyle.principal.blue}/>
        </TouchableOpacity>
    )
}