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
            if (event.nativeEvent.contentOffset && isFirst.current == false) {
                const lastItemsBeforeUpdate = 15;

                // timerData.maxNumber + 1, More 1 because of 0
                const realIndexMaxNumber = timerData.maxNumber + 1;

                const lowPosToAdd = heightItem * (lastItemsBeforeUpdate);
                const highPosToAdd = heightItem * ((arrayNumbers.length - lastItemsBeforeUpdate));

                // console.log(highPosToAdd, event.nativeEvent.contentOffset.y, arrayNumbers.length)
                // find how many times have the list of numbers duplicated

                // tem que fazer 1 vez somente, ta fazendo mais de 1

                if (event.nativeEvent.contentOffset.y <= lowPosToAdd) {

                    console.log('toTop antes', event.nativeEvent.contentOffset.y)

                    // console.log('toTop antes', event.nativeEvent.contentOffset.y)
                    // // 
                    changeArrayNumbers((oldArray) => {
                        isInverted.current = true;

                        isFirst.current = true;

                        return [...oldArray.slice(0, realIndexMaxNumber), ...numberList(timerData.maxNumber)].reverse()
                    });
           
                    // console.log('toTop depois', event.nativeEvent.contentOffset.y)


                } else if (event.nativeEvent.contentOffset.y >= highPosToAdd) {

                    console.log('toBottom antes', event.nativeEvent.contentOffset.y)
                    // ...oldArray.slice(realIndexMaxNumber, arrayNumbers.length)
                    changeArrayNumbers((oldArray) => {
                        const formatOldArray = isInverted.current ? oldArray.reverse() : oldArray;

                        isInverted.current = false;

                        isFirst.current = true;

                        return [...formatOldArray, ...numberList(timerData.maxNumber)];
                    });

                    console.log('toBottom depois', event.nativeEvent.contentOffset.y)


                }

            }
        },
        useNativeDriver: false
    });

    useEffect(() => {
        if (timerData.maxNumber < 40) {
            console.log(arrayNumbers)
        }
    }, [arrayNumbers])

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
            
            }}
            initialNumToRender={15}
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={stateTimer.isPlay ? false : true}
            inverted={isInverted.current}
        />

    )
}