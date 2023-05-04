import { useRef } from "react";
import { View, Animated, SafeAreaView } from "react-native";
import { numberList } from "./numberList";
import { timerStyle, heightContainer } from "./styles/timerStyle";
import { useData } from "../Context/Context";
import ListTimer from "./ListTimer";
import TimerNumber from "./TimerNumber";

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

    let lineAnimated = ({heightLine: new Animated.Value(heightContainer + 10), opacityLine: new Animated.Value(1)});
    let gapList = new Animated.Value(10);
    let numberCountOpacity = new Animated.Value(0);
    let linePointsOpacity = new Animated.Value(0);
    let listOpacity = new Animated.Value(1);

    function sequenceLine() {
        Animated.parallel([
            Animated.timing(lineAnimated.heightLine, {
                toValue: 80,
                duration: 400,
                useNativeDriver: false,
            }),
            Animated.timing(lineAnimated.opacityLine, {
                toValue: 0,
                duration: 100,
                delay: 400,
                useNativeDriver: false,
            }),
            Animated.timing(linePointsOpacity, {
                toValue: 1,
                duration: 300,
                delay: 450,
                useNativeDriver: false
            }),
            Animated.timing(numberCountOpacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(listOpacity, {
                toValue: 0,
                duration: 400,
                delay: 300,
                useNativeDriver: false
            }),
            Animated.timing(gapList, {
                toValue: 0,
                duration: 400,
                delay: 500,
                useNativeDriver: false
            }),
        ]).start();
    }

    data.stateTimer.isPlay.addListener(({ value }) => {
        if (value == 1) {
            sequenceLine();
        }
    })

    return (
        <SafeAreaView>
            <Animated.View style={[timerStyle.listsContainer, { gap: gapList }]}>
                <View style={timerStyle.listContainer}>
                    <ListTimer dataArray={listOne} heightItems={heightItems} opacityAnimated={listOpacity} />

                    <TimerNumber numberCountOpacity={numberCountOpacity}/>
                </View>

                <View style={timerStyle.listLineContainer}>
                    <Animated.View style={[timerStyle.listLine, { height: lineAnimated.heightLine, opacity: lineAnimated.opacityLine }]}></Animated.View>

                    <Animated.Text style={[timerStyle.listLinePoints, {opacity: linePointsOpacity}]}>:</Animated.Text>
                </View>

                <View style={timerStyle.listContainer}>
                    <ListTimer dataArray={listTwo} heightItems={heightItems} opacityAnimated={listOpacity} />

                    <TimerNumber numberCountOpacity={numberCountOpacity}/>
                </View>

                <View style={timerStyle.listLineContainer}>
                    <Animated.View style={[timerStyle.listLine, { height: lineAnimated.heightLine, opacity: lineAnimated.opacityLine }]}></Animated.View>

                    <Animated.Text style={[timerStyle.listLinePoints, {opacity: linePointsOpacity}]}>:</Animated.Text>
                </View>

                <View style={timerStyle.listContainer}>
                    <ListTimer dataArray={listThree} heightItems={heightItems} opacityAnimated={listOpacity} />

                    <TimerNumber numberCountOpacity={numberCountOpacity}/>
                </View>
            </Animated.View>
        </SafeAreaView>
    )
}