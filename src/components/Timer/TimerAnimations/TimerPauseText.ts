import { Animated } from "react-native";

export let textOpacity = new Animated.Value(0);

export function timerPauseText(stateOption: boolean){
    Animated.timing(textOpacity, {
        toValue: stateOption ? 1 : 0,
        duration: 300, 
        delay: 1,
        useNativeDriver: false,
    }).start();

}
