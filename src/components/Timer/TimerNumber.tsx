import { timerStyle } from "./styles/timerStyle"
import { Animated } from "react-native"

type timerNumber = {
    numberCountOpacity: Animated.Value,
    number:  number
}

export default function TimerNumber({numberCountOpacity, number}: timerNumber) {

    return (
        <Animated.Text style={[timerStyle.listItem, { position: "absolute", opacity: numberCountOpacity }]}
        >{number}</Animated.Text>
    )
}