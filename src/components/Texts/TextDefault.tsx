import { Text } from "react-native";
import { TextProps } from "react-native";
import { globalTextStyle } from "./styles/GlobalTextStyle";

export default function TextDefault(props: TextProps) {
  return (
    <Text style={[globalTextStyle.text, props.style]} allowFontScaling={false}>
      {props.children}
    </Text>
  );
}
