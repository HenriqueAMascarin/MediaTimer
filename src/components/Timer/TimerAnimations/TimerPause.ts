import { Animated } from "react-native";

export let textOpacity = new Animated.Value(0);
export let colorNumber = new Animated.Value(0);

export function timerPause(stateOption: boolean){

    Animated.parallel([
        Animated.timing(colorNumber, {
            toValue: stateOption ? 1 : 0,
            duration: 300, 
            delay: 1,
            useNativeDriver: false,
        }),
        Animated.timing(textOpacity, {
            toValue: stateOption ? 1 : 0,
            duration: 300, 
            delay: 1,
            useNativeDriver: false,
        })
    ]).start();

}
