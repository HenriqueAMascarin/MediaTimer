import { TouchableOpacity } from "react-native/";
import { buttonsStyle } from "./styles/buttonsStyle";
import { DataType } from "../Utils/ContextTimer";
import { playTimer } from "../Utils/valuesIntervalTimer";
import { colorsStyle } from "../Utils/colorsStyle";
import PlaySvg from "../../../assets/images/play.svg";
import { heightItem } from "../Timer/styles/timerStyle";

export default function PlayButton({dataInfo}: {dataInfo: DataType}) {

    function timerStart() {
        if (dataInfo.dataItem.scrollOne != 0 || dataInfo.dataItem.scrollTwo != 0 || dataInfo.dataItem.scrollThree != 0) {
            const numberHours = Math.round(dataInfo.dataItem.scrollOne / heightItem) * 3600;
            const numberMinutes = Math.round(dataInfo.dataItem.scrollTwo / heightItem) * 60;
            const numberSeconds = Math.round(dataInfo.dataItem.scrollThree / heightItem);

            let timeStampValue = (numberHours + numberMinutes + numberSeconds);
            playTimer(dataInfo, timeStampValue);
        }
    }

    return (
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton]} onPress={() => timerStart()}>
            <PlaySvg width={26} height={32} fill={colorsStyle.principal.blue}/>
        </TouchableOpacity>
    )
}