import { useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import { numberList } from "./numberList";
import { timerStyle, heightContainer } from "./styles/timerStyle";
import { useData } from "../Utils/ContextTimer";
import ListTimer from "./ListTimer";
import TimerNumber from "./TimerNumber";
import { sequenceTimer } from "./AnimatedSequences/AnimatedSequences";
import { lineAnimated, linePointsOpacity, numberCountOpacity, listOpacity, gapList } from "./AnimatedSequences/AnimatedSequences";

// 3 items showing
export const heightItems = heightContainer / 3;

export default function Timer() {

    const data = useData();

    const listOne = useRef({ array: numberList(23), animated: { scrollY: new Animated.Value(0) } }).current;
    const listTwo = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;
    const listThree = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;

    

    const hours = Math.floor(data.timeStamp.state / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((data.timeStamp.state % 3600) / 60).toString().padStart(2, "0");
    const seconds = Math.floor((data.timeStamp.state) % 3600 % 60).toString().padStart(2, "0");

    useEffect(() =>{
        listOne.animated.scrollY.addListener(({ value }) => data.dataItem.scrollOne = value);
        listTwo.animated.scrollY.addListener(({ value }) => data.dataItem.scrollTwo = value);
        listThree.animated.scrollY.addListener(({ value }) => data.dataItem.scrollThree = value);
    }, [data.stateTimer.state])

    useEffect(() =>{
        if(data.timeStamp.state <= 0 && data.interval.refValue.current){
            clearInterval(data.interval.refValue.current);
            data.stateTimer.changeState({isPlay: false, isPaused: false})
        }
    }, [data.timeStamp.state])

    return (
        <View>
            <Animated.View style={[timerStyle.listsContainer, { gap: gapList }]}>

                <View style={timerStyle.listContainer}>
                    <ListTimer dataArray={listOne} heightItems={heightItems} opacityAnimated={listOpacity} />

                    <TimerNumber numberCountOpacity={numberCountOpacity} number={hours}/>
                </View>

                <View style={timerStyle.listLineContainer}>
                    <Animated.View style={[timerStyle.listLine, { height: lineAnimated.heightLine, opacity: lineAnimated.opacityLine }]}></Animated.View>

                    <Animated.Text style={[timerStyle.listLinePoints, {opacity: linePointsOpacity}]}>:</Animated.Text>
                </View>

                <View style={timerStyle.listContainer}>
                    <ListTimer dataArray={listTwo} heightItems={heightItems} opacityAnimated={listOpacity} />

                    <TimerNumber numberCountOpacity={numberCountOpacity} number={minutes}/>
                </View>

                <View style={timerStyle.listLineContainer}>
                    <Animated.View style={[timerStyle.listLine, { height: lineAnimated.heightLine, opacity: lineAnimated.opacityLine }]}></Animated.View>

                    <Animated.Text style={[timerStyle.listLinePoints, {opacity: linePointsOpacity}]}>:</Animated.Text>
                </View>

                <View style={timerStyle.listContainer}>
                    <ListTimer dataArray={listThree} heightItems={heightItems} opacityAnimated={listOpacity} />
                    
                    <TimerNumber numberCountOpacity={numberCountOpacity} number={seconds}/>
                </View>
            </Animated.View>
        </View>
    )
}