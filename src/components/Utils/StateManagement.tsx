import { useEffect } from "react";
import { playTimer, stopTimer } from "./valuesIntervalTimer";
import { heightItem } from "../Timer/styles/timerStyle";
import { Animated } from "react-native";

import { RootState } from "./Redux/store";
import { AnyAction, Dispatch } from "redux";
import { changeTimerState } from "./Redux/features/stateTimer-slice";

interface StateManagement {
    dataInfo: RootState,
    dispatch: Dispatch<AnyAction>,
    animatedListValues: { scrollOne: Animated.Value, scrollTwo: Animated.Value, scrollThree: Animated.Value },
}

export default function StateManagement({ dataInfo, dispatch, animatedListValues }: StateManagement,) {
    useEffect(() => {
        if (dataInfo.stateTimer.isPickingValue) {
            const scrollOne = Number(JSON.stringify(animatedListValues.scrollOne));
            const scrollTwo = Number(JSON.stringify(animatedListValues.scrollTwo));
            const scrollThree = Number(JSON.stringify(animatedListValues.scrollThree));

            if (scrollOne != 0 || scrollTwo != 0 || scrollThree != 0) {
                dispatch(changeTimerState({ isPlay: true, isPaused: false, isPickingValue: true}));
            }else{
                dispatch(changeTimerState({ isPlay: false, isPaused: false, isPickingValue: false}));
            }
        }
    }, [dataInfo.stateTimer.isPickingValue])

    useEffect(() => {   
        
        if(dataInfo.stateTimer.isPlay){
            playTimer({ dataInfo: dataInfo, dispatch: dispatch }, heightItem);
        }
        if(!dataInfo.stateTimer.isPlay){
            stopTimer({ dataInfo: dataInfo, dispatch: dispatch });
        }
        
    }, [dataInfo.stateTimer])

    useEffect(() => {
        if (dataInfo.timerValues.runningValue <= 0) {
            dispatch(changeTimerState({ isPlay: false, isPaused: false, isPickingValue: false}));
        }
    }, [dataInfo.timerValues.runningValue]);

    return (
        <></>
    )
}