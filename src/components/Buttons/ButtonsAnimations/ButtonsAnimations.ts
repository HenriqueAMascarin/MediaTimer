import { Animated } from "react-native";
import { DataType } from "../../Utils/ContextTimer";

export let opacityInitialButtons = new Animated.Value(1);
export let opacityOtherButtons = new Animated.Value(0);

export default function appersButtons(stateOption: boolean) {
    Animated.parallel([
        Animated.timing(opacityInitialButtons, {
            toValue: stateOption ? 0 : 1,
            duration: 400,
            delay: stateOption ? 0 : 200,
            useNativeDriver: false,
        }),
        Animated.timing(opacityOtherButtons, {
            toValue: stateOption ? 1 : 0,
            duration: 400,
            delay: stateOption ? 200 : 0,
            useNativeDriver: false,
        })
    ]).start();
}