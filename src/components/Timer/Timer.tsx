import { useRef } from "react";
import { View, Animated, SafeAreaView } from "react-native";
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

    listOne.animated.scrollY.addListener(({ value }) => data.dataItem.numberOne = value);
    listTwo.animated.scrollY.addListener(({ value }) => data.dataItem.numberTwo = value);
    listThree.animated.scrollY.addListener(({ value }) => data.dataItem.numberThree = value);

    let heightLine = new Animated.Value(heightContainer + 10);

    function sequenceLine(){
        const valueIf = new Animated.Value(heightContainer + 10);
        Animated.sequence([
            Animated.timing(heightLine,{
                toValue: heightLine == valueIf ? 0 : heightContainer + 10,
                duration: 700,
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

                <Animated.View style={[timerStyle.listLine, {height: heightLine}]}></Animated.View>

                <ListTimer dataArray={listTwo} heightItems={heightItems} />

                <Animated.View style={[timerStyle.listLine, {height: heightLine}]}></Animated.View>

                <ListTimer dataArray={listThree} heightItems={heightItems} />
            </View>
        </SafeAreaView>
    )
}