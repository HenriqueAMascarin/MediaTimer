import { Animated } from "react-native";

export let opacityInitialButtons = new Animated.Value(1);
export let opacityOtherButtons = new Animated.Value(0);

export default function appearsButtons(stateOption: boolean) {
  Animated.parallel([
    Animated.timing(opacityInitialButtons, {
      toValue: stateOption ? 0 : 1,
      duration: 300,
      delay: stateOption ? 20 : 220,
      useNativeDriver: false,
    }),
    Animated.timing(opacityOtherButtons, {
      toValue: stateOption ? 1 : 0,
      duration: 300,
      delay: stateOption ? 220 : 20,
      useNativeDriver: false,
    }),
  ]).start();
}
