import AnimatedNumber from "./AnimatedNumber";
import { Animated, NativeSyntheticEvent, NativeScrollEvent, FlatList, ViewToken } from "react-native";
import { heightItem } from "./styles/timerStyle";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { numberList } from "./timerUtils/numberList";
import { useCallback, useRef, useState } from "react";
interface ListTimer {
    timerData: {
        maxNumber: number;
        currentNumber: React.MutableRefObject<number>;
        animated: {
            scrollY: Animated.Value;
        }
    },
    opacityAnimated: Animated.Value,
}

export default function ListTimer({ timerData, opacityAnimated }: ListTimer) {

    const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);

    let maxLengthOneArray = timerData.maxNumber + 1;

    const [arrayNumbers] = useState(() => {
        let array = [];

        for (let index = 1; index <= 3; index++) {
            const newArr = numberList(timerData.maxNumber);

            array.push(...newArr);
        }

        return array;
    });

    const refFlatlist = useRef<FlatList<typeof arrayNumbers[0]>>(null);

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
                const lastItemsBeforeUpdate = 8;

                const lowPosToAdd = heightItem * (lastItemsBeforeUpdate);

                const highPosToAdd = heightItem * ((arrayNumbers.length - lastItemsBeforeUpdate));

                if (event.nativeEvent.contentOffset.y <= lowPosToAdd) {
                    refFlatlist.current?.scrollToOffset({
                        offset: event.nativeEvent.contentOffset.y + heightItem * maxLengthOneArray,
                        animated: false,
                    })
                }

                if ((event.nativeEvent.contentOffset.y >= highPosToAdd)) {
                    refFlatlist.current?.scrollToOffset({
                        offset: event.nativeEvent.contentOffset.y - heightItem * maxLengthOneArray,
                        animated: false,
                    })
                }

            }
        },
        useNativeDriver: false
    });

    const renderNumber = useCallback(({ item, index }: { item: typeof arrayNumbers[0], index: number }) =>
    (
        <AnimatedNumber itemIndex={index} itemNumber={item} scrollY={timerData.animated.scrollY} key={index} />
    ), []);

    const getItemLayoutNumbers = useCallback((data: number[] | null | undefined, index: number) => (
        { length: heightItem, offset: heightItem * index, index }
    ), []);

    const keyExtractorNumbers = useCallback((item: number, index: number) => (
        index.toString()
    ), []);

    const numbersViewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
        waitForInteraction: false,
        minimumViewTime: 0,
    });

    const viewableNumbersCallback = useCallback(({viewableItems}: {viewableItems: Array<ViewToken>}) => {
        timerData.currentNumber.current = viewableItems?.[1]?.item ?? 0;
    }, [])

    return (
        <Animated.FlatList
            ref={refFlatlist}
            style={{ opacity: opacityAnimated }}
            onViewableItemsChanged={viewableNumbersCallback}
            viewabilityConfig={numbersViewabilityConfig.current}
            onScroll={handleScroll}
            data={arrayNumbers}
            renderItem={renderNumber}
            decelerationRate={"fast"}
            getItemLayout={getItemLayoutNumbers}
            initialScrollIndex={timerData.maxNumber}
            keyExtractor={keyExtractorNumbers}
            snapToOffsets={snapArray(arrayNumbers)}
            scrollEventThrottle={0}
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={stateTimer.isPlay ? false : true}
        />
    )
}