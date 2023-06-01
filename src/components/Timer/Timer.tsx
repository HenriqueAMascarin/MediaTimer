import { useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import { numberList } from "./numberList";
import { timerStyle } from "./styles/timerStyle";
import { useData } from "../Utils/ContextTimer";
import ListTimer from "./ListTimer";
import TimerNumber from "./TimerNumber";
import { lineAnimated, linePointsOpacity, numberCountOpacity, listOpacity, gapList } from "./TimerAnimations/TimerSequence";
import { stopTimer } from "../Utils/valuesIntervalTimer";
import PauseText from "./PauseText";
import TotalTimeText from "./TotalTimeText";

export default function Timer() {

    const data = useData();

    const listOne = useRef({ array: numberList(23), animated: { scrollY: new Animated.Value(0) } }).current;
    const listTwo = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;
    const listThree = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;
    
    const hours = Math.floor(data.runningValue.state / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((data.runningValue.state % 3600) / 60).toString().padStart(2, "0");
    const seconds = Math.floor((data.runningValue.state % 3600) % 60).toString().padStart(2, "0");

    useEffect(() => {
        listOne.animated.scrollY.addListener(({ value }) => data.dataItem.scrollOne = value);
        listTwo.animated.scrollY.addListener(({ value }) => data.dataItem.scrollTwo = value);
        listThree.animated.scrollY.addListener(({ value }) => data.dataItem.scrollThree = value);
    }, [data.stateTimer.state]);

    useEffect(() =>{
        if(data.runningValue.state <= 0 && data.interval.refValue.current){
            stopTimer(data);
        }
    }, [data.runningValue.state]);

    return (
        <View>
            <Animated.View style={[timerStyle.listsContainer, { gap: gapList }]}>
                <PauseText />

                <View style={timerStyle.listContainer}> 
                    <ListTimer dataArray={listOne} opacityAnimated={listOpacity} dataInfo={data} />

                    <TimerNumber numberCountOpacity={numberCountOpacity} number={hours}/>
                </View>

                <View style={timerStyle.listLineContainer}>
                    <Animated.View style={[timerStyle.listLine, { height: lineAnimated.heightLine, opacity: lineAnimated.opacityLine }]}></Animated.View>

                    <Animated.Text style={[timerStyle.listLinePoints, {opacity: linePointsOpacity}]}>:</Animated.Text>
                </View>

                <View style={timerStyle.listContainer}>
                    <ListTimer dataArray={listTwo} opacityAnimated={listOpacity} dataInfo={data} />

                    <TimerNumber numberCountOpacity={numberCountOpacity} number={minutes}/>
                </View>

                <View style={timerStyle.listLineContainer}>
                    <Animated.View style={[timerStyle.listLine, { height: lineAnimated.heightLine, opacity: lineAnimated.opacityLine }]}></Animated.View>

                    <Animated.Text style={[timerStyle.listLinePoints, {opacity: linePointsOpacity}]}>:</Animated.Text>
                </View>

                <View style={timerStyle.listContainer}>
                    <ListTimer dataArray={listThree} opacityAnimated={listOpacity} dataInfo={data} />
                    
                    <TimerNumber numberCountOpacity={numberCountOpacity} number={seconds}/>
                </View>

                <TotalTimeText dataInfo={data}/>
            </Animated.View>
        </View>
    )
}