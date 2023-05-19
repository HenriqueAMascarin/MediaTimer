import AnimatedNumber from "./AnimatedNumber";
import { Animated } from "react-native";
import { DataType } from "../Utils/ContextTimer";

interface ListTimer{
    dataArray: {
        array: number[];
        animated: {
            scrollY: Animated.Value;
    }},
    heightItems: number,
    opacityAnimated: Animated.Value,
    dataInfo: DataType,
}

export default function ListTimer({dataArray, heightItems, opacityAnimated, dataInfo}: ListTimer) {

    function snapArray(list: number[], elementHeight: number) {
        let array: number[] = [];
        for (let i = 0; i < list.length; i++) {
            array.push(i * elementHeight);
        }
        return array;
    }

    return (
        <Animated.ScrollView
            style={{opacity: opacityAnimated}}
            onScroll={Animated.event([{
                nativeEvent:
                {
                    contentOffset:
                        { y: dataArray.animated.scrollY },
                },
            },
            ], { useNativeDriver: false })}
            decelerationRate={"fast"}
            snapToOffsets={snapArray(dataArray.array, heightItems)}
            scrollEventThrottle={0}
            showsVerticalScrollIndicator={false}
            scrollEnabled={dataInfo.stateTimer.state.isPlay ? false : true}
        >
            {dataArray.array.map((item, index) => {
            return(
                <AnimatedNumber itemIndex={index} itemNumber={item} scrollY={dataArray.animated.scrollY} heightItem={heightItems} key={index}/>
            )
        })}
        </Animated.ScrollView>
    )
}