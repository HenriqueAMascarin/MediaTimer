import { Animated } from "react-native";
import { heightContainer } from "../styles/timerStyle";

// interface sequenceTimerTypes{
//     lineAnimated: {
//         heightLine: Animated.Value;
//         opacityLine: Animated.Value;
//     }
//     linePointsOpacity: Animated.Value,
//     numberCountOpacity: Animated.Value,
//     listOpacity: Animated.Value,
//     gapList: Animated.Value,
// }

export let lineAnimated = ({heightLine: new Animated.Value(heightContainer + 10), opacityLine: new Animated.Value(1)});
export let linePointsOpacity = new Animated.Value(0);
export let numberCountOpacity = new Animated.Value(0);
export let listOpacity = new Animated.Value(1);
export let gapList = new Animated.Value(10);

export function sequenceTimer (stateOption: boolean){

    Animated.parallel([
        Animated.timing(lineAnimated.heightLine, {
            toValue: 80,
            duration: 400,
            useNativeDriver: false,
        }),
        Animated.timing(lineAnimated.opacityLine, {
            toValue: 0,
            duration: 100,
            delay: 400,
            useNativeDriver: false,
        }),
        Animated.timing(linePointsOpacity, {
            toValue: 1,
            duration: 300,
            delay: 450,
            useNativeDriver: false
        }),
        Animated.timing(numberCountOpacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false
        }),
        Animated.timing(listOpacity, {
            toValue: 0,
            duration: 400,
            delay: 300,
            useNativeDriver: false
        }),
        Animated.timing(gapList, {
            toValue: 0,
            duration: 400,
            delay: 500,
            useNativeDriver: false
        }),
    ]).start();
}