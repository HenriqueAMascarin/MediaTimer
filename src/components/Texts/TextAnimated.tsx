import { Animated } from "react-native";
import { globalTextStyle } from "./styles/GlobalTextStyle";
import React from "react";

export default function TextAnimated(
  props: React.ComponentProps<typeof Animated.Text>
) {
  return (
    <Animated.Text
      style={[globalTextStyle.text, props?.style]}
      allowFontScaling={false}
    >
      {props?.children}
    </Animated.Text>
  );
}
