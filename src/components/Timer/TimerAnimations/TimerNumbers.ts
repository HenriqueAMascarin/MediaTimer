import { Animated } from "react-native";

export let colorNumber = new Animated.Value(0);

export function numberColorTimer(stateOption: boolean){

    Animated.timing(colorNumber, {
        toValue: stateOption ? 1 : 0,
        duration: 400, 
        useNativeDriver: false,
    }).start()

}