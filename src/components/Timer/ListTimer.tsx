import AnimatedNumber from "./AnimatedNumber";
import { Animated, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { heightItem } from "./styles/timerStyle";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { numberList } from "./timerUtils/numberList";
import { useEffect, useRef, useState } from "react";
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

    let [isInverted, changeIsInverted] = useState(false);

    const [arrayNumbers, changeArrayNumbers] = useState(() => {
        let array = [];

        for (let index = 1; index <= 2; index++) {
            array.push(...numberList(timerData.maxNumber));
        }

        return array;
    });

    function snapArray(list: number[]) {
        let array: number[] = [];

        for (let i = 0; i < list.length - 1; i++) {
            array.push(i * heightItem);
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

                const invertedlastItemsBeforeUpdate = 9;

                const lowPosToAdd = heightItem * (lastItemsBeforeUpdate);

                const invertedLowPosToAddBottom = heightItem * (invertedlastItemsBeforeUpdate);

                const highPosToAdd = heightItem * ((arrayNumbers.length - lastItemsBeforeUpdate));
                console.log(highPosToAdd, lowPosToAdd)

                if ((!isInverted && event.nativeEvent.contentOffset.y <= lowPosToAdd) || (isInverted && event.nativeEvent.contentOffset.y >= highPosToAdd)) {

                    console.log('toTop antes', event.nativeEvent.contentOffset.y, highPosToAdd, isInverted)

                    changeArrayNumbers((oldArray) => {
                        const oldInverted = isInverted;

                        if(!isInverted){
                            changeIsInverted(true);
                        }

                        return oldInverted ? [...oldArray, ...numberList(timerData.maxNumber).reverse()] : oldArray.reverse();
                    });
                    
                    console.log('-----------------------------------------------------------------------------')

                } 

                if ((!isInverted && event.nativeEvent.contentOffset.y >= highPosToAdd) || (isInverted && event.nativeEvent.contentOffset.y <= invertedLowPosToAddBottom)) {

                    console.log('toBottom antes', event.nativeEvent.contentOffset.y)

                    changeArrayNumbers((oldArray) => {
                        const oldInverted = isInverted;

                        if(isInverted){
                            isInverted = false;
                        }

                        return oldInverted ? oldArray.reverse() : [...oldArray, ...numberList(timerData.maxNumber)];
                    });

                    console.log('-----------------------------------------------------------------------------')
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

    useEffect(() => {
        if(timerData.maxNumber < 40){
            console.log(arrayNumbers)
        }
    }, [arrayNumbers])

    return (
        <Animated.FlatList
            style={{ opacity: opacityAnimated }}
            onScroll={handleScroll}
            data={arrayNumbers}
            renderItem={renderNumber}
            decelerationRate={"fast"}
            getItemLayout={getItemLayoutNumbers}
            initialScrollIndex={timerData.maxNumber}
            snapToOffsets={snapArray(arrayNumbers)}
            scrollEventThrottle={0}
            maintainVisibleContentPosition={{
                minIndexForVisible: 0,
                autoscrollToTopThreshold: 0
            }}
            initialNumToRender={60}
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={stateTimer.isPlay ? false : true}
            inverted={isInverted}
        />

    )
}