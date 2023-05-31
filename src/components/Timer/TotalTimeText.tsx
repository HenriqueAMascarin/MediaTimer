import { Animated } from "react-native";
import { DataType } from "../Utils/ContextTimer";
import { timerStyle } from "./styles/timerStyle";
import { totalTimeOpacity } from "./TimerAnimations/TimerSequence";

interface TotalTimeText{
    dataInfo: DataType;
}

export default  function TotalTimeText({dataInfo}: TotalTimeText){

    const hours = Math.floor(dataInfo.totalValue.state / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((dataInfo.totalValue.state % 3600) / 60).toString().padStart(2, "0");
    const seconds = Math.floor((dataInfo.totalValue.state % 3600) % 60).toString().padStart(2, "0");

    return(
        <Animated.Text style={[timerStyle.totalTimeText, {opacity: totalTimeOpacity}]} allowFontScaling={false}>Total {hours}:{minutes}:{seconds} </Animated.Text>
    )
}