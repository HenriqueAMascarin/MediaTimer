import { Animated } from "react-native";
export function animatedModalsOpacity({
  isOpen,
  animatedOpacity,
}: {
  isOpen: boolean;
  animatedOpacity: Animated.Value;
}) {
  Animated.timing(animatedOpacity, {
    toValue: isOpen ? 1 : 0,
    duration: 200,
    delay: 1,
    useNativeDriver: false,
  }).start();
}
