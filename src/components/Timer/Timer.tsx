import { useRef } from "react";
import { View, Animated, SafeAreaView, Text } from "react-native";
import { numberList } from "./numberList";
import { timerStyle, heightContainer } from "./styles/timerStyle";
import { useData } from "../Context/Context";
import ListTimer from "./ListTimer";

// 3 items showing
export const heightItems = heightContainer / 3;

export default function Timer() {

    let data = useData();

    const listOne = useRef({ array: numberList(23), animated: { scrollY: new Animated.Value(0) } }).current;
    const listTwo = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;
    const listThree = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;

    let heightLine = new Animated.Value(heightContainer + 10);
    let marginLine = new Animated.Value(20);

    listOne.animated.scrollY.addListener(({ value }) => data.dataItem.numberOne = value);
    listTwo.animated.scrollY.addListener(({ value }) => data.dataItem.numberTwo = value);
    listThree.animated.scrollY.addListener(({ value }) => data.dataItem.numberThree = value);

    function sequenceLine(){
        Animated.sequence([
            Animated.timing(heightLine,{
                toValue: 80,
                duration: 700,
                useNativeDriver: false,
            }),
            Animated.timing(marginLine,{
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            })
        ]).start();
    }
    
    data.stateTimer.isPlay.addListener(({value}) => {
        if(value == 1){
            sequenceLine();
        }
    })

    return (
        <SafeAreaView>
            <View style={timerStyle.listsContainer}>
                
                <ListTimer dataArray={listOne} heightItems={heightItems} />

                <Text style={[timerStyle.listItem,{position: "absolute"}]}>00</Text>

                <Animated.View style={[timerStyle.listLine, { marginHorizontal: marginLine, height: heightLine}]}></Animated.View>

                <ListTimer dataArray={listTwo} heightItems={heightItems} />

                <Text style={[timerStyle.listItem,{position: "absolute"}]}>00</Text>

                <Animated.View style={[timerStyle.listLine, { marginHorizontal: marginLine, height: heightLine}]}></Animated.View>

                <ListTimer dataArray={listThree} heightItems={heightItems} />

                <Text style={[timerStyle.listItem,{position: "absolute"}]}>00</Text>

            </View>
        </SafeAreaView>
    )
}