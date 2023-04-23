import { useRef } from "react";
import { View, FlatList, Text, NativeSyntheticEvent, NativeScrollEvent, Animated, SafeAreaView } from "react-native";
import AnimatedNumber from "./AnimatedNumber";
import { numberList } from "./numberList";
import { timerStyle } from "./styles/timerStyle";

export default function Timer() {

    // 1 middle index
    const animatedIndex = useRef({ animated: {scrollY: new Animated.Value(1)}, index: 1 }).current;

    function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>, positionIndex: number) {
        let selectedItem = Math.round((event.nativeEvent.contentOffset.y + positionIndex) / positionIndex);


    }

    return (
        <SafeAreaView>
            <View style={timerStyle.listsContainer}>
                <Animated.FlatList
                    data={numberList(9)}
                    renderItem={
                        ({ item }) =>
                            <AnimatedNumber item={item} scrollY={animatedIndex.animated.scrollY}></AnimatedNumber>
                    }
                    keyExtractor={(item) => item.key}
                    // onScroll={(scroll) => {handleScroll(scroll, 80);}}
                    onScroll={Animated.event([{
                        nativeEvent:
                            {
                                contentOffset:
                                    { y: animatedIndex.animated.scrollY },
                            },
                        },
                    ],{useNativeDriver:false})}
                    style={timerStyle.list}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0.5}
                    initialNumToRender={6}
                    bounces={false}
                />

                <View style={timerStyle.listLine}></View>

                <FlatList
                    data={numberList(59)}
                    renderItem={({ item, index }) => <Text style={timerStyle.listItem}>{item.number < 10 ? "0" + item.number : item.number}</Text>}
                    style={timerStyle.list}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.key}
                    initialNumToRender={3}
                    decelerationRate={0.5}
                />

                <View style={timerStyle.listLine}></View>

                <FlatList
                    data={numberList(59)}
                    renderItem={({ item }) => <Text style={timerStyle.listItem}>{item.number < 10 ? "0" + item.number : item.number}</Text>}
                    style={timerStyle.list}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.key}
                    initialNumToRender={3}
                    decelerationRate={0.5}
                />
            </View>
        </SafeAreaView>
    )
}