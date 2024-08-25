import AnimatedNumber from "./AnimatedNumber";
import { Animated, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { heightItem } from "./styles/timerStyle";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { numberList } from "./timerUtils/numberList";
import { useState } from "react";
interface ListTimer {
    timerData: {
        maxNumber: number;
        animated: {
            scrollY: Animated.Value;
        }
    },
    opacityAnimated: Animated.Value,
}

export default function ListTimer({ timerData, opacityAnimated }: ListTimer) {

    const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);

    const [arrayNumbers, changeArrayNumbers] = useState([...numberList(timerData.maxNumber), ...numberList(timerData.maxNumber)]);

    function snapArray(list: number[], elementHeight: number) {
        let array: number[] = [];

        for (let i = 0; i < list.length - 1; i++) {
            array.push(i * elementHeight);
        }

        return array;
    }

    const handleScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: timerData.animated.scrollY },
                },
            },
        ], {
        listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (event.nativeEvent.contentOffset) {
                const lastItemsBeforeUpdate = 15;

                const lowPosToAdd = heightItem * (lastItemsBeforeUpdate);
                const highPosToAdd = heightItem * (timerData.maxNumber - lastItemsBeforeUpdate);

                // find how many times have the list of numbers duplicated
                if(arrayNumbers.filter((value) => value == timerData.maxNumber).length == 2){
                    if(event.nativeEvent.contentOffset.y <= lowPosToAdd){
                        console.log('toTop')
                        const arrWithoutLast = [...arrayNumbers].slice(0, timerData.maxNumber - 1);

                        changeArrayNumbers([...numberList(timerData.maxNumber) , ...arrWithoutLast]);
                    }else if (event.nativeEvent.contentOffset.y >= highPosToAdd){
                        console.log('toBottom')
                        const arrWithoutInitial = [...arrayNumbers].slice(timerData.maxNumber - 1, arrayNumbers.length - 1);

                        changeArrayNumbers([...arrWithoutInitial, ...numberList(timerData.maxNumber)]);

                    }
                }
            }
        },
        useNativeDriver: false
    });

    const renderNumber = ({ item, index }: { item: typeof arrayNumbers[0], index: number }) =>
    (
        <AnimatedNumber itemIndex={index} itemNumber={item} scrollY={timerData.animated.scrollY} key={index} />
    );

    const getItemLayoutNumbers = (data: number[] | null | undefined, index: number) => (
        { length: heightItem, offset: heightItem * index, index }
    );

    return (
        <Animated.FlatList
            style={{ opacity: opacityAnimated }}
            onScroll={handleScroll}
            data={arrayNumbers}
            renderItem={renderNumber}
            decelerationRate={"fast"}
            getItemLayout={getItemLayoutNumbers}
            initialScrollIndex={timerData.maxNumber}
            snapToOffsets={snapArray(arrayNumbers, heightItem)}
            scrollEventThrottle={0}
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={stateTimer.isPlay ? false : true}
        />

    )
}