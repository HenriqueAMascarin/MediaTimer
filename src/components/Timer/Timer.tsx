import { useRef } from "react";
import { View, FlatList, Animated, SafeAreaView } from "react-native";
import AnimatedNumber from "./AnimatedNumber";
import { numberList } from "./numberList";
import { timerStyle, heightContainer } from "./styles/timerStyle";
import { useData } from "../Context/Context";

// 3 items showing
export const heightItems = heightContainer / 3;

export default function Timer() {

    let data = useData();
    const listOne = useRef({ array: numberList(23), animated: { scrollY: new Animated.Value(0) } }).current;
    const listTwo = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;
    const listThree = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;

    function snapArray(list: number[], elementHeight: number) {
        let array: number[] = [];
        for (let i = 0; i < list.length; i++) {
            array.push(i * elementHeight);
        }
        return array;
    }

    listOne.animated.scrollY.addListener(({ value }) => data.dataItem.numberOne = value);
    listTwo.animated.scrollY.addListener(({ value }) => data.dataItem.numberTwo = value);
    listThree.animated.scrollY.addListener(({ value }) => data.dataItem.numberThree = value);

    return (
        <SafeAreaView>
            <View style={timerStyle.listsContainer}>
                <Animated.View style={timerStyle.animatedListsContainer}>
                    <FlatList
                        style={timerStyle.list}
                        data={listOne.array}
                        renderItem={
                            ({ item, index }) =>
                                <AnimatedNumber itemIndex={index} itemNumber={item} scrollY={listOne.animated.scrollY} heightItem={heightItems} />
                        }
                        keyExtractor={() => Math.random().toString()}
                        onScroll={Animated.event([{
                            nativeEvent:
                            {
                                contentOffset:
                                    { y: listOne.animated.scrollY },
                            },
                        },
                        ], { useNativeDriver: false })}
                        snapToOffsets={snapArray(listOne.array, heightItems)}
                        decelerationRate={"fast"}
                        scrollEventThrottle={15}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />

                    <View style={timerStyle.listLine}></View>

                    <FlatList
                        style={timerStyle.list}
                        data={listTwo.array}
                        renderItem={
                            ({ item, index }) =>
                                <AnimatedNumber itemIndex={index} itemNumber={item} scrollY={listTwo.animated.scrollY} heightItem={heightItems} />
                        }
                        keyExtractor={() => Math.random().toString()}
                        onScroll={Animated.event([{
                            nativeEvent:
                            {
                                contentOffset:
                                    { y: listTwo.animated.scrollY },
                            },
                        },
                        ], { useNativeDriver: false })}
                        snapToOffsets={snapArray(listTwo.array, heightItems)}
                        decelerationRate={"fast"}
                        scrollEventThrottle={15}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />

                    <View style={timerStyle.listLine}></View>

                    <FlatList
                        style={timerStyle.list}
                        data={listThree.array}
                        renderItem={
                            ({ item, index }) =>
                                <AnimatedNumber itemIndex={index} itemNumber={item} scrollY={listThree.animated.scrollY} heightItem={heightItems} />
                        }
                        keyExtractor={() => Math.random().toString()}
                        onScroll={Animated.event([{
                            nativeEvent:
                            {
                                contentOffset:
                                    { y: listThree.animated.scrollY },
                            },
                        },
                        ], { useNativeDriver: false })}
                        snapToOffsets={snapArray(listThree.array, heightItems)}
                        decelerationRate={"fast"}
                        scrollEventThrottle={15}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />

                </Animated.View>
            </View>
        </SafeAreaView>
    )
}