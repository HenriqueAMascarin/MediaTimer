import { useState, useCallback } from "react";
import { View, FlatList, Text, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { numberList } from "./numberList";
import { timerStyle } from "./styles/timerStyle";

export default function Timer() {

    const [centeredItem, changeCenteredItem] = useState(1);
    
    function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>, positionIndex: number){
        let selectedItem = Math.round((event.nativeEvent.contentOffset.y + positionIndex) / positionIndex);
        console.log(selectedItem)
        changeCenteredItem(selectedItem);
    }

    return (
        <View>
            <View style={timerStyle.listsContainer}>
                <FlatList
                    data={numberList(29)}
                    renderItem={
                    ({ item }) => 
                    <Text style={item.number == centeredItem ? timerStyle.listItemCenter : timerStyle.listItem }>
                        {item.number < 10 ? "0" + item.number : item.number}
                    </Text>
                    }
                    keyExtractor={(item) => item.key}
                    onScroll={(scroll) => handleScroll(scroll, 80)}
                    style={timerStyle.list}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0.5}
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
            <Text>{centeredItem}</Text>
        </View>
    )
}