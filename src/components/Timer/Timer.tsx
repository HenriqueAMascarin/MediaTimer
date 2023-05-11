import { useRef, useEffect } from "react";
import { View, Animated, SafeAreaView } from "react-native";
import { numberList } from "./numberList";
import { timerStyle, heightContainer } from "./styles/timerStyle";
import { useData } from "../Context/Context";
import ListTimer from "./ListTimer";
import TimerNumber from "./TimerNumber";
import { sequenceTimer } from "./AnimatedSequences/AnimatedSequences";

// 3 items showing
export const heightItems = heightContainer / 3;

export default function Timer() {

    let data = useData();

    const listOne = useRef({ array: numberList(23), animated: { scrollY: new Animated.Value(0) } }).current;
    const listTwo = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;
    const listThree = useRef({ array: numberList(59), animated: { scrollY: new Animated.Value(0) } }).current;

    let lineAnimated = ({heightLine: new Animated.Value(heightContainer + 10), opacityLine: new Animated.Value(1)});
    let linePointsOpacity = new Animated.Value(0);
    let numberCountOpacity = new Animated.Value(0);
    let listOpacity = new Animated.Value(1);
    let gapList = new Animated.Value(10);

    const hours = Math.floor(data.timeStamp.state / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((data.timeStamp.state % 3600) / 60).toString().padStart(2, "0");
    const seconds = Math.floor((data.timeStamp.state) % 3600 % 60).toString().padStart(2, "0");

    let timerInterval: NodeJS.Timer | null = null;

    useEffect(() =>{
        listOne.animated.scrollY.addListener(({ value }) => data.dataItem.scrollOne = value);
        listTwo.animated.scrollY.addListener(({ value }) => data.dataItem.scrollTwo = value);
        listThree.animated.scrollY.addListener(({ value }) => data.dataItem.scrollThree = value);

        if (data.stateTimer.state.isPlay) {
            sequenceTimer({lineAnimated, linePointsOpacity, numberCountOpacity, listOpacity, gapList});

            timerInterval = setInterval(() =>{
                data.timeStamp.changeState((state) => state -= 1)
            },1000)
        }
    }, [data.stateTimer.state])

    useEffect(() =>{
        
    },[data.timeStamp.state])

    return (
        <SafeAreaView>
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
        </SafeAreaView>
    )
}