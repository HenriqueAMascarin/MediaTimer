import { useRef } from "react";
import { View, FlatList, Text, Animated, SafeAreaView } from "react-native";
import AnimatedNumber from "./AnimatedNumber";
import { numberList } from "./numberList";
import { timerStyle } from "./styles/timerStyle";

export default function Timer() {

    // 1 middle index
    const listOne = useRef({ listData: numberList(24), animated: { scrollY: new Animated.Value(0) } }).current;
    const listTwo = useRef({ listData: numberList(60), animated: { scrollY: new Animated.Value(0) } }).current;
    const listTree = useRef({ listData: numberList(60), animated: { scrollY: new Animated.Value(0) } }).current;

    // 3 items showing
    let heightItems = 0;

    function snapArray(elementHeight: number) {
        let array: number[] = [];
        for (let i = 0; i < listOne.listData.length; i++) {
            array.push(i * elementHeight);
        }
        return array;
    }

    return (
        <SafeAreaView>
            <View style={timerStyle.listsContainer}>
                <Animated.FlatList
                    style={timerStyle.list}
                    onLayout={(listScroll) => heightItems = listScroll.nativeEvent.layout.height / 3} //3 items showing
                    data={listOne.listData}
                    renderItem={
                        ({ item }) =>
                            <AnimatedNumber item={item} scrollY={listOne.animated.scrollY} heightItem={heightItems} />
                    }
                    keyExtractor={(item) => item.key}
                    onScroll={Animated.event([{
                        nativeEvent:
                        {
                            contentOffset:
                                { y: listOne.animated.scrollY },
                        },
                    },
                    ], { useNativeDriver: false })}
                    snapToOffsets={snapArray(heightItems)}
                    decelerationRate={"fast"}
                    initialNumToRender={3}
                    scrollEventThrottle={16}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />

                <View style={timerStyle.listLine}></View>

                <Animated.FlatList
                    style={timerStyle.list}
                    onLayout={(listScroll) => heightItems = listScroll.nativeEvent.layout.height / 3} //3 items showing
                    data={listTwo.listData}
                    renderItem={
                        ({ item }) =>
                            <AnimatedNumber item={item} scrollY={listTwo.animated.scrollY} heightItem={heightItems} />
                    }
                    keyExtractor={(item) => item.key}
                    onScroll={Animated.event([{
                        nativeEvent:
                        {
                            contentOffset:
                                { y: listTwo.animated.scrollY },
                        },
                    },
                    ], { useNativeDriver: false })}
                    snapToOffsets={snapArray(heightItems)}
                    decelerationRate={"fast"}
                    initialNumToRender={3}
                    scrollEventThrottle={16}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />

                <View style={timerStyle.listLine}></View>

                <Animated.FlatList
                    style={timerStyle.list}
                    onLayout={(listScroll) => heightItems = listScroll.nativeEvent.layout.height / 3} //3 items showing
                    data={listTree.listData}
                    renderItem={
                        ({ item }) =>
                            <AnimatedNumber item={item} scrollY={listTree.animated.scrollY} heightItem={heightItems} />
                    }
                    keyExtractor={(item) => item.key}
                    onScroll={Animated.event([{
                        nativeEvent:
                        {
                            contentOffset:
                                { y: listTree.animated.scrollY },
                        },
                    },
                    ], { useNativeDriver: false })}
                    snapToOffsets={snapArray(heightItems)}
                    decelerationRate={"fast"}
                    initialNumToRender={3}
                    scrollEventThrottle={16}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}