import AnimatedNumber from "./AnimatedNumber";
import {
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
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

  const reflist = useRef<ScrollView>(null);

  const [newScrollTransition, changeNewScrollTransition] = useState<
    null | number
  >(null);

  const arrayNumbers = useMemo(() => {
    let array: number[] = [];

    for (let i = 0; i <= timerData.maxNumber; i++) {
      array.push(i);
    }

    return [...array, ...array, ...array];
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

          const lastItemsBeforeUpdate = 10;

          const lowPosToAdd = sizeItem * lastItemsBeforeUpdate;

          const highPosToAdd =
            sizeItem * (arrayNumbers.length - lastItemsBeforeUpdate);

          const isTopInfinite =
            event.nativeEvent.contentOffset.y <= lowPosToAdd;
          const isBottomInfinite =
            event.nativeEvent.contentOffset.y >= highPosToAdd;

          if (isTopInfinite || isBottomInfinite) {
            if (isTopInfinite) {
              const newBottomY =
                event.nativeEvent.contentOffset.y +
                sizeItem * maxLengthOneArray;

              changeNewScrollTransition(newBottomY);

              reflist.current?.scrollTo({
                y: newBottomY,
                animated: false,
              });
            }

            if (isBottomInfinite) {
              const newTopY =
                event.nativeEvent.contentOffset.y -
                sizeItem * maxLengthOneArray;

              changeNewScrollTransition(newTopY);

              reflist.current?.scrollTo({
                y: newTopY,
                animated: false,
              });
            }

            setTimeout(() => {
              changeNewScrollTransition(null);
            }, 600);
          }
        }
      },
      useNativeDriver: false,
    }
  );

  const listContentOffset = useMemo(() => {
    return { y: sizeItem * timerData.maxNumber, x: 0 };
  }, [timerData.maxNumber]);

  return (
    <Animated.View style={{ opacity: listOpacity }}>
      <Animated.ScrollView
        ref={reflist}
        onScroll={handleScroll}
        decelerationRate={"fast"}
        snapToOffsets={arrayOffsets}
        scrollEventThrottle={0}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        scrollEnabled={stateTimer.isPlay ? false : true}
        contentOffset={listContentOffset}
      >
        {arrayNumbers.map((number, index: number) => {
          return (
            <AnimatedNumber
              itemIndex={index}
              itemNumber={number}
              scrollY={listScrollY.current}
              key={index}
              transitionNewScroll={newScrollTransition}
            />
          );
        })}
      </Animated.ScrollView>
    </Animated.View>
  );
}

export default memo(ListTimer);
