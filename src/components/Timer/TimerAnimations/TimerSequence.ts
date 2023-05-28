import { Animated } from "react-native";
import { heightContainer } from "../styles/timerStyle";

export let lineAnimated = ({ heightLine: new Animated.Value(heightContainer + 10), opacityLine: new Animated.Value(1) });
export let linePointsOpacity = new Animated.Value(0);
export let numberCountOpacity = new Animated.Value(0);
export let listOpacity = new Animated.Value(1);
export let gapList = new Animated.Value(10);
export let totalTimeOpacity = new Animated.Value(0);

export function sequenceTimer(stateOption: boolean) {
    const initialValues = {
        initialHeightLine: heightContainer + 10,
        initialOpacityLine: 1,
        initialLinePointsOpacity: 0,
        initialNumberCountOpacity: 0,
        initialListOpacity: 1,
        initialGapList: 10,
        initialtotalTimeOpacity: 0
    }
    
        Animated.parallel([
            Animated.timing(lineAnimated.heightLine, {
                toValue: stateOption ? 0 : initialValues.initialHeightLine,
                duration: 500,
                delay: 100,
                useNativeDriver: false,
            }),
            Animated.timing(lineAnimated.opacityLine, {
                toValue: stateOption ? 0 : initialValues.initialOpacityLine,
                duration: 400,
                delay: 500,
                useNativeDriver: false,
            }),
            Animated.timing(linePointsOpacity, {
                toValue: stateOption ? 1 : initialValues.initialLinePointsOpacity,
                duration: 300,
                delay: 550,
                useNativeDriver: false,
            }),
            Animated.timing(numberCountOpacity, {
                toValue: stateOption ? 1 : initialValues.initialNumberCountOpacity,
                duration: 300,
                delay: 50,
                useNativeDriver: false,
            }),
            Animated.timing(listOpacity, {
                toValue: stateOption ? 0 : initialValues.initialListOpacity,
                duration: 300,
                delay: 50,
                useNativeDriver: false,
            }),
            Animated.timing(gapList, {
                toValue: stateOption ? 3 : initialValues.initialGapList,
                duration: 400,
                delay: 200,
                useNativeDriver: false,
            }),
            Animated.timing(totalTimeOpacity, {
                toValue: stateOption ? 1 : initialValues.initialtotalTimeOpacity,
                duration: 300,
                delay: stateOption ? 600 : 100,
                useNativeDriver: false,
            })
        ]).start();
}