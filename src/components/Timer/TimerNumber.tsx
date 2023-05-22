import { timerStyle } from "./styles/timerStyle";
import { Animated } from "react-native";
import { DataType } from "../Utils/ContextTimer";
import { useEffect } from "react";
import { colorsStyle } from "../Utils/colorsStyle";
import { colorNumber, numberColorTimer  } from "./TimerAnimations/TimerNumbers";

interface TimerNumber {
    numberCountOpacity: Animated.Value,
    number: string,
    dataInfo: DataType
}

export default function TimerNumber({numberCountOpacity, number, dataInfo}: TimerNumber) {


    useEffect(() =>{
        
        numberColorTimer(dataInfo.stateTimer.state.isPaused)

    },[dataInfo.stateTimer.state.isPaused])

    let colorAnimated = colorNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [colorsStyle.principal.black, colorsStyle.principal.blue],
        extrapolate: "clamp",
    })

    return (
        <Animated.Text style={[timerStyle.listItem, { position: "absolute", opacity: numberCountOpacity, color: colorAnimated}]}
        >{number}</Animated.Text>
    )
}