import { useRef, useState } from "react";
import { View, FlatList, Animated, SafeAreaView, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import AnimatedNumber from "./AnimatedNumber";
import { numberList } from "./numberList";
import { timerStyle, heightContainer } from "./styles/timerStyle";

export default function Timer() {

    const [listOneState, changeListOne] = useState(numberList(23))
    const listOneAnimated = useRef({ scrollY: new Animated.Value(0)}).current;

    // 3 items showing
    let heightItems = heightContainer / 3; 

    function snapArray(list: number[], elementHeight: number) {
        let array: number[] = [];
        for (let i = 0; i < list.length; i++) {
            array.push(i * elementHeight);
        }
        return array;
    }

    function addMoreItems(scroll:NativeSyntheticEvent<NativeScrollEvent>, changeState:React.Dispatch<React.SetStateAction<number[]>>){
        console.log( )
        const sizeContainer = scroll.nativeEvent.contentSize.height - scroll.nativeEvent.layoutMeasurement.height;// size of container that is only to end center
        const radiusFinal = sizeContainer - 80; //container size - height that start event.

        if(scroll.nativeEvent.contentOffset.y > radiusFinal) {
            changeState((state) => [...state, ...state])
        }
    }

    return (
        <SafeAreaView>
            <View style={timerStyle.listsContainer}>
                <FlatList
                    style={timerStyle.list}
                    data={listOneState}
                    renderItem={
                        ({ item, index}) =>
                            <AnimatedNumber itemIndex={index} itemNumber={item} scrollY={listOneAnimated.scrollY} heightItem={heightItems} />
                    }
                    keyExtractor={() => Math.random().toString()}
                    onMomentumScrollBegin={(scroll) => addMoreItems(scroll, changeListOne)}
                    onScroll={Animated.event([{
                        nativeEvent:
                        {
                            contentOffset:
                                { y: listOneAnimated.scrollY },
                        },
                    },
                    ], { useNativeDriver: false })}
                    snapToOffsets={snapArray(listOneState, heightItems)}
                    decelerationRate={"fast"}
                    scrollEventThrottle={5}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />

                <View style={timerStyle.listLine}></View>


                <View style={timerStyle.listLine}></View>

           

            </View>
        </SafeAreaView>
    )
}