import AnimatedNumber from "./AnimatedNumber";
import { Animated, NativeSyntheticEvent, NativeScrollEvent, View, ScrollView } from "react-native";
import { heightItem } from "./styles/timerStyle";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { useRef, useState } from "react";
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

    const reflist = useRef<ScrollView>(null);

    const [newScrollTransition, changeNewScrollTransition] = useState<null | number>(null);

    const arrayNumbers = (() => {
        let array: number[] = [];

        for (let i = 0; i <= timerData.maxNumber; i++) {
            array.push(i);
        }

        return [...array, ...array, ...array];
    })();

    const arrayOffsets = (() => {
        let array: number[] = [];

        for (let i = 0; i < arrayNumbers.length - 1; i++) {
            array.push(i * heightItem);
        }

        return array;
    })();

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

                const middleNumber = arrayNumbers[arrayOffsets.findIndex((offset => offset == Math.round(event.nativeEvent.contentOffset.y))) + 1];;

                if (middleNumber != timerData.currentNumber.current && middleNumber != null) {
                    timerData.currentNumber.current = middleNumber;
                }

                const lastItemsBeforeUpdate = 10;

                const lowPosToAdd = heightItem * (lastItemsBeforeUpdate);

                const highPosToAdd = heightItem * ((arrayNumbers.length - lastItemsBeforeUpdate));


                const isTopInfinite = event.nativeEvent.contentOffset.y <= lowPosToAdd;
                const isBottomInfinite = event.nativeEvent.contentOffset.y >= highPosToAdd;


                if (isTopInfinite || isBottomInfinite) {
                    if (isTopInfinite) {
                        const newBottomY = event.nativeEvent.contentOffset.y + heightItem * maxLengthOneArray;

                        changeNewScrollTransition(newBottomY);

                        reflist.current?.scrollTo({
                            y: newBottomY,
                            animated: false,
                        })

                    }

                    if (isBottomInfinite) {
                        const newTopY = event.nativeEvent.contentOffset.y - heightItem * maxLengthOneArray;

                        changeNewScrollTransition(newTopY);

                        reflist.current?.scrollTo({
                            y: newTopY,
                            animated: false,
                        })

                    }

                    setTimeout(() => {
                        changeNewScrollTransition(null);
                    }, 600);
                }

            }
        },
        useNativeDriver: false
    });

    return (
        <View>
            <Animated.ScrollView
                ref={reflist}
                style={{ opacity: opacityAnimated }}
                onScroll={handleScroll}
                decelerationRate={"fast"}
                snapToOffsets={arrayOffsets}
                scrollEventThrottle={0}
                bounces={false}
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
                scrollEnabled={stateTimer.isPlay ? false : true}
                contentOffset={{ y: heightItem * timerData.maxNumber, x: 0 }}
            >
                {arrayNumbers.map((number, index: number) => {
                    return (<AnimatedNumber itemIndex={index} itemNumber={number} scrollY={timerData.animated.scrollY} key={index} transitionNewScroll={newScrollTransition} />)
                })}
            </Animated.ScrollView>
        </View>
    )
}