import { timerStyle } from "./styles/timerStyle";
import { Animated } from "react-native";
import { DataType } from "../Utils/ContextTimer";
import { LayoutChangeEvent } from "react-native";

interface AnimatedNumber {
    itemIndex: number,
    itemNumber: number,
    scrollY: Animated.Value,
    dataInfo: DataType,
}

let counterNumberHeight = 0;

export default function AnimatedNumber({ itemIndex, itemNumber, scrollY, dataInfo }: AnimatedNumber) {

    let numberOpacity: Animated.AnimatedInterpolation<string | number> | number = new Animated.Value(0.5);
    let numberTransform: Animated.AnimatedInterpolation<string | number> | number = new Animated.Value(0.8);

    const inputRange = [(itemIndex - 2) * dataInfo.heightItems.state.heightItem, (itemIndex - 1) * dataInfo.heightItems.state.heightItem, (itemIndex) * dataInfo.heightItems.state.heightItem]

    numberOpacity = scrollY.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        extrapolate: "clamp",
    });
    numberTransform = scrollY.interpolate({
        inputRange,
        outputRange: [0.85, 1, 0.85],
        extrapolate: "clamp",
    });

    function changeItemHeight(numberEvent: LayoutChangeEvent){
        dataInfo.heightItems.changeState({heightItem: numberEvent.nativeEvent.layout.height, itemsShowing: dataInfo.heightItems.state.itemsShowing});
    }

    return (
        <Animated.Text style={[timerStyle.listItem, { opacity: numberOpacity, transform: [{ scale: numberTransform }] }]} onLayout={(numberEvent) => {
            if(counterNumberHeight == 0){
                changeItemHeight(numberEvent);
                counterNumberHeight++;
            }
        }}>
            {itemNumber < 10 ? "0" + itemNumber : itemNumber}
        </Animated.Text>
    )
}