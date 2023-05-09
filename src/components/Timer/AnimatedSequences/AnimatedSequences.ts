import { Animated } from "react-native";

type sequenceTimerTypes = {
    lineAnimated: {
        heightLine: Animated.Value;
        opacityLine: Animated.Value;
    }
    linePointsOpacity: Animated.Value,
    numberCountOpacity: Animated.Value,
    listOpacity: Animated.Value,
    gapList: Animated.Value,
}

export function sequenceTimer ({lineAnimated, linePointsOpacity, numberCountOpacity, listOpacity, gapList}: sequenceTimerTypes){
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