import { Animated } from "react-native";

export let textOpacity = new Animated.Value(0);

export function timerPauseOrResume({
  isGoingToPause,
}: {
  isGoingToPause: boolean;
}) {
  Animated.parallel([
    Animated.timing(textOpacity, {
      toValue: isGoingToPause ? 1 : 0,
      duration: 300,
      delay: 1,
      useNativeDriver: false,
    }),
  ]).start();
}
