import { timerStyle } from "./styles/timerStyle"
import { Animated } from "react-native"

type timerNumber ={
    numberCountOpacity: Animated.Value
}
export default function TimerNumber({numberCountOpacity}: timerNumber) {
    return (
        <Animated.Text
            style={[timerStyle.listItem, { position: "absolute", opacity: numberCountOpacity }]}
        >00</Animated.Text>
    )
}