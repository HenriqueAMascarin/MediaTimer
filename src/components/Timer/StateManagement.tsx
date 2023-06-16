import { useEffect, useState } from "react";

import { heightItem } from "./styles/timerStyle";
import { Animated } from "react-native";

import { RootState } from "../Utils/Redux/store";
import { AnyAction, Dispatch } from "redux";

import { pauseTimer, playTimer, stopTimer } from "./timerUtils/valuesIntervalTimer";
import { changeScrollValues } from "../Utils/Redux/features/dataNumbers-slice";
import { changeRunningValue } from "../Utils/Redux/features/timerValues-slice";
import { changeIsPickingValue, changeIsPlay } from "../Utils/Redux/features/stateTimer-slice";

interface StateManagement {
    dataInfo: RootState,
    dispatch: Dispatch<AnyAction>,
    animatedListValues: { scrollOne: Animated.Value, scrollTwo: Animated.Value, scrollThree: Animated.Value },
}

export default function StateManagement({ dataInfo, dispatch, animatedListValues }: StateManagement,) {

    const [intervalState, changeIntervalState] = useState<null | NodeJS.Timer>(null);

    useEffect(() => {

        if (dataInfo.stateTimer.isPickingValue) {
            const hours = Number(JSON.stringify(animatedListValues.scrollOne));
            const minutes = Number(JSON.stringify(animatedListValues.scrollTwo));
            const seconds = Number(JSON.stringify(animatedListValues.scrollThree));

            if (hours != 0 || minutes != 0 || seconds != 0) {
                dispatch(changeScrollValues({ scrollOne: hours, scrollTwo: minutes, scrollThree: seconds }));
                dispatch(changeIsPlay(true));
            } else {
                dispatch(changeIsPickingValue(false));
            }
        }

    }, [dataInfo.stateTimer.isPickingValue]);

    useEffect(() => {

        if (dataInfo.stateTimer.isInterval) {
            let valueRunning = dataInfo.timerValues.runningValue;
            setTimeout(() => {
                changeIntervalState(setInterval(() => {
                    valueRunning--;
                    return dispatch(changeRunningValue(valueRunning));
                }, 1000));
            }, 800);
        } else if (intervalState) {
            clearInterval(intervalState);
            changeIntervalState(null);
        }

    }, [dataInfo.stateTimer.isInterval]);

    useEffect(() => {

        if (dataInfo.stateTimer.isPlay) {
            playTimer({ dataInfo: dataInfo, dispatch: dispatch }, heightItem);
        } else {
            stopTimer({ dataInfo: dataInfo, dispatch: dispatch });
        }

    }, [dataInfo.stateTimer.isPlay]);

    useEffect(() => {

        if (dataInfo.stateTimer.isPlay) {
            pauseTimer({ dataInfo: dataInfo, dispatch: dispatch });
        }

    }, [dataInfo.stateTimer.isPaused]);

    useEffect(() => {

        if (dataInfo.timerValues.runningValue <= 0) {
            dispatch(changeIsPlay(false));
        }

    }, [dataInfo.timerValues.runningValue]);

    return (
        <></>
    )
}