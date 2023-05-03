import { useRef, useState } from "react";
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

    // listOne.animated.scrollY.addListener(({ value }) => data.dataItem.numberOne = value);
    // listTwo.animated.scrollY.addListener(({ value }) => data.dataItem.numberTwo = value);
    // listThree.animated.scrollY.addListener(({ value }) => data.dataItem.numberThree = value);

    let heightLine = new Animated.Value(heightContainer + 10);
    let gapList = new Animated.Value(10);
    let numberCountAnimated = ({opacity: new Animated.Value(0), position: new Animated.Value(68.3)});
    let listOpacity = new Animated.Value(1);

    function sequenceLine(){
        Animated.parallel([
            Animated.timing(heightLine,{
                toValue: 80,
                duration: 500,
                useNativeDriver: false,
            }),
            Animated.timing(numberCountAnimated.opacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(listOpacity, {
                toValue: 0,
                duration: 500,
                delay: 200,
                useNativeDriver: false
            }),
            Animated.timing(gapList, {
                toValue: 0,
                duration: 500,
                delay: 500,
                useNativeDriver: false
            }),
            Animated.timing(numberCountAnimated.position, {
                toValue: 80,
                duration: 500,
                delay: 500,
                useNativeDriver: false
            }),
        ]).start();
    }

    
    data.stateTimer.isPlay.addListener(({value}) => {
        if(value == 1){
            sequenceLine();
        }
    })

    return (
        <SafeAreaView>
            <Animated.View style={[timerStyle.listsContainer, {gap: gapList}]}>
                
                <ListTimer dataArray={listOne} heightItems={heightItems} opacityAnimated={listOpacity}/>

                <Animated.Text 
                style={[timerStyle.listItem, {position:"absolute", left: numberCountAnimated.position, opacity: numberCountAnimated.opacity}]}
                >00</Animated.Text>

                <Animated.View style={[timerStyle.listLine, {height: heightLine}]}></Animated.View>

                <ListTimer dataArray={listTwo} heightItems={heightItems} opacityAnimated={listOpacity}/>

                <Animated.Text 
                style={[timerStyle.listItem, {position:"absolute", opacity: numberCountAnimated.opacity}]}
                >00</Animated.Text>

                <Animated.View style={[timerStyle.listLine, {height: heightLine}]}></Animated.View>

                <ListTimer dataArray={listThree} heightItems={heightItems} opacityAnimated={listOpacity}/>

                <Animated.Text 
                style={[timerStyle.listItem, {position:"absolute", right: numberCountAnimated.position, opacity: numberCountAnimated.opacity}]}
                >00</Animated.Text>

            </Animated.View>
        </SafeAreaView>
    )
}