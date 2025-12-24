import AnimatedNumber from "./AnimatedNumber";
import {
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
} from "react-native";
import { sizeItem } from "./styles/timerStyle";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { memo, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { listOpacity } from "@src/components/Timer/animations/timerSequence";

interface ListTimer {
  timerData: {
    maxNumber: number;
    currentNumber: number;
    dispatchFunction: ActionCreatorWithPayload<number>;
  };
}

function ListTimer({ timerData }: ListTimer) {
  const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);

  const dispatch = useDispatch();

  const listScrollY = useRef(new Animated.Value(0));

  let maxLengthOneArray = useMemo(
    () => timerData.maxNumber + 1,
    [timerData.maxNumber]
  );

  const refList = useRef<ScrollView>(null);

  const [newNumberIndexToTransition, changeNewNumberIndexToTransition] = useState<
    null | number
  >(null);

  const arrayNumbers = useMemo(() => {
    let array: number[] = [];

    for (let i = 0; i <= timerData.maxNumber; i++) {
      array.push(i);
    }

    const itensBefore = [array[array.length - 2], array[array.length - 1]];

    const itensAfter = [array[0], array[1]];

    const newArray = [...itensBefore, ...array, ...itensAfter];

    return newArray;
  }, [timerData.maxNumber]);

  const arrayOffsets = useMemo(() => {
    let array: number[] = [];

    for (let i = 0; i < arrayNumbers.length - 1; i++) {
      array.push(i * sizeItem);
    }

    return array;
  }, [arrayNumbers]);

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: listScrollY.current },
        },
      },
    ],
    {
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (event.nativeEvent.contentOffset) {
          const middleNumber =
            arrayNumbers[
              arrayOffsets.findIndex(
                (offset) =>
                  offset == Math.round(event.nativeEvent.contentOffset.y)
              ) + 1
            ];

          if (middleNumber != null) {
            dispatch(timerData.dispatchFunction(middleNumber));
          }

          const lowPosToAdd = 0;

          const highPosToAdd = arrayOffsets?.[arrayOffsets.length - 2] - 5;

          const isTopInfinite =
            event.nativeEvent.contentOffset.y <= lowPosToAdd;

          const isBottomInfinite =
            event.nativeEvent.contentOffset.y >= highPosToAdd;

          if (isTopInfinite || isBottomInfinite) {
            if (isTopInfinite) {
              const newBottomY =
                event.nativeEvent.contentOffset.y +
                sizeItem * maxLengthOneArray;

              const numberIndexToGoBottom =
                arrayOffsets.findIndex(
                  (offset) => offset == Math.round(newBottomY)
                ) + 1;

              changeNewNumberIndexToTransition(numberIndexToGoBottom);

              refList.current?.scrollTo({
                y: newBottomY,
                animated: false,
              });
            }

            if (isBottomInfinite) {
              const newTopY =
                event.nativeEvent.contentOffset.y -
                sizeItem * maxLengthOneArray;

              const numberIndexToGoTop =
                arrayOffsets.findIndex(
                  (offset) => offset == Math.round(newTopY)
                ) + 1;

              changeNewNumberIndexToTransition(numberIndexToGoTop);

              refList.current?.scrollTo({
                y: newTopY,
                animated: false,
              });
            }

            setTimeout(() => {
              changeNewNumberIndexToTransition(null);
            }, 400);
          }
        }
      },
      useNativeDriver: false,
    }
  );

  return (
    <Animated.View style={{ opacity: listOpacity }}>
      <Animated.ScrollView
        ref={refList}
        onScroll={handleScroll}
        decelerationRate={"fast"}
        snapToOffsets={arrayOffsets}
        scrollEventThrottle={0}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        scrollEnabled={stateTimer.isPlay ? false : true}
        contentOffset={{ y: sizeItem, x: 0 }}
      >
        {arrayNumbers.map((number, index: number) => {
          return (
            <AnimatedNumber
              itemIndex={index}
              itemNumber={number}
              scrollY={listScrollY.current}
              key={index}
              numberIndexToTransition={newNumberIndexToTransition}
            />
          );
        })}
      </Animated.ScrollView>
    </Animated.View>
  );
}

export default memo(ListTimer);
