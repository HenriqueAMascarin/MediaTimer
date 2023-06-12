import AnimatedNumber from "./AnimatedNumber";
import { Animated } from "react-native";
import { heightItem } from "./styles/timerStyle";
import { RootState } from "../Utils/Redux/store";

interface ListTimer{
    dataArray: {
        array: number[];
        animated: {
            scrollY: Animated.Value;
    }},
    opacityAnimated: Animated.Value,
    dataInfo: RootState,
}

export default function ListTimer({dataArray, opacityAnimated, dataInfo}: ListTimer) {

    function snapArray(list: number[], elementHeight: number) {
        let array: number[] = [];

        for (let i = 0; i < list.length - 1; i++) {
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
            snapToOffsets={snapArray(dataArray.array, heightItem)}
            scrollEventThrottle={0}
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={dataInfo.stateTimer.isPlay ? false : true}
        >
            {dataArray.array.map((item, index) => {
            return(
                <AnimatedNumber itemIndex={index} itemNumber={item} scrollY={dataArray.animated.scrollY} key={index}/>
            )
        })}
        </Animated.ScrollView>
    )
}