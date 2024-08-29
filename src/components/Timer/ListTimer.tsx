import AnimatedNumber from "./AnimatedNumber";
import { Animated, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { heightItem } from "./styles/timerStyle";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { numberList } from "./timerUtils/numberList";
import { useRef, useState } from "react";
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

    let isInverted = useRef(false);
    let isFirst = useRef(false);


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

                // timerData.maxNumber + 1, More 1 because of 0
                const realIndexMaxNumber = timerData.maxNumber + 1;

                const lowPosToAdd = heightItem * (lastItemsBeforeUpdate);
                const highPosToAdd = heightItem * ((arrayNumbers.length - lastItemsBeforeUpdate));

                if ((!isInverted.current && event.nativeEvent.contentOffset.y <= lowPosToAdd) || (isInverted.current && event.nativeEvent.contentOffset.y >= highPosToAdd)) {

                    console.log('toTop antes', event.nativeEvent.contentOffset.y, highPosToAdd, isInverted.current)

                    changeArrayNumbers((oldArray) => {
                        const oldInverted = isInverted.current;

                        if(!isInverted.current){
                            isInverted.current = true;
                        }

                        return oldInverted ? [...oldArray, ...numberList(timerData.maxNumber).reverse()] : [...oldArray].reverse();
                    });
                    
                    console.log('-----------------------------------------------------------------------------')

                } else if (event.nativeEvent.contentOffset.y >= highPosToAdd) {

                    console.log('toBottom antes', event.nativeEvent.contentOffset.y)
                    // ...oldArray.slice(realIndexMaxNumber, arrayNumbers.length)
                    changeArrayNumbers((oldArray) => {
                        const oldInverted = isInverted.current;

                        if(isInverted.current){
                            isInverted.current = false;
                        }

                        return oldInverted ? [...oldArray.reverse(), ...numberList(timerData.maxNumber)] : [...oldArray, ...numberList(timerData.maxNumber)];
                    });

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
            snapToOffsets={snapArray(arrayNumbers)}
            scrollEventThrottle={0}
            removeClippedSubviews
            maxToRenderPerBatch={15}
            maintainVisibleContentPosition={{
                minIndexForVisible: 0,
                autoscrollToTopThreshold: 0
            }}
            initialNumToRender={15}
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={stateTimer.isPlay ? false : true}
            inverted={isInverted.current}
        />

    )
}