import { Animated, View } from "react-native";
import { useEffect } from "react";

import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import StopButton from "./StopButton";

import { buttonsStyle } from "./styles/buttonsStyle";
import appersButtons, { opacityInitialButtons, opacityOtherButtons } from "./ButtonsAnimations/ButtonsAnimations";

import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { useDispatch } from "react-redux";

export default function Buttons() {

    const data = useAppSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() =>{

        appersButtons(data.stateTimer.isPlay);
        
    },[data.stateTimer.isPlay])

    return (
        <View style={buttonsStyle.buttonsContainer}>

            {data.stateTimer.isPlay
                ? <View />
                : <Animated.View style={[buttonsStyle.containerInitialButtons, {opacity: opacityInitialButtons}]}>
                    <PlayButton dataInfo={data} dispatch={dispatch}/>
                </Animated.View>
            }

            {data.stateTimer.isPlay
                ? <Animated.View style={[buttonsStyle.containerPlayStateButtons, {opacity: opacityOtherButtons}]}>
                    <StopButton dataInfo={data} dispatch={dispatch}/>
                    <PauseButton dataInfo={data} dispatch={dispatch}/>
                </Animated.View>
                : <View />
            }
        </View>
    )
}