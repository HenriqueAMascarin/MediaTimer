import { timerStyle } from "./styles/timerStyle";
import { Animated } from "react-native";
import { useEffect } from "react";

type animatedNumber ={
    item: {
        number: number;
        key: string;
    },
    scrollY: Animated.Value,
    heightItem: number,
}

export default function AnimatedNumber({item, scrollY, heightItem}:animatedNumber) {

    let numberOpacity: Animated.AnimatedInterpolation<string | number> | number = 0.5;
    let numberTransform: Animated.AnimatedInterpolation<string | number> | number = 0.8;
    if(item.number > 0){
        const inputRange = [ (item.number - 2) * heightItem,(item.number - 1) * heightItem,(item.number) * heightItem]
        numberOpacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
        })
        numberTransform = scrollY.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
        })
    }

    return (
        <Animated.Text style={[timerStyle.listItem, { opacity: numberOpacity, transform:[{scale:numberTransform}]}]} >
            {item.number < 10 ? "0" + item.number : item.number}
        </Animated.Text>
    )
}