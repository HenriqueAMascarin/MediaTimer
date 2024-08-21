import { Animated } from "react-native";
import { globalTextStyle } from "./styles/GlobalTextStyle";

export default function TextAnimated(props: typeof Animated.Text.defaultProps) {
    return (
        <Animated.Text style={[globalTextStyle.text, props?.style]} allowFontScaling={false} >{props?.children}</Animated.Text>
    )
}