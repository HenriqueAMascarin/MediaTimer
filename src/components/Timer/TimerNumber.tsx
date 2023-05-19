import { timerStyle } from "./styles/timerStyle"
import { Animated } from "react-native"

interface TimerNumber {
    numberCountOpacity: Animated.Value,
    number: string,
}

export default function TimerNumber({numberCountOpacity, number}: TimerNumber) {

    return (
        <Animated.Text style={[timerStyle.listItem, { position: "absolute", opacity: numberCountOpacity }]}
        >{number}</Animated.Text>
    )
}