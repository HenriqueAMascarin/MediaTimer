import { Animated, View } from "react-native";
import { useData } from "../Utils/ContextTimer";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import StopButton from "./StopButton";
import { buttonsStyle } from "./styles/buttonsStyle";
import { opacityInitialButtons, opacityOtherButtons } from "./ButtonsAnimations/ButtonsAnimations";
import { useState, useEffect } from "react";

export default function Buttons() {

    const data = useData();

    return (
        <View style={buttonsStyle.container}>
            <Animated.View style={[buttonsStyle.containerInitialButtons, 
            {opacity: opacityInitialButtons, 
            display: data.stateTimer.state.isPlay ? "none" : "flex"}]}>
                <PlayButton dataInfo={data}/>
            </Animated.View>
            <Animated.View style={[buttonsStyle.containerPlayStateButtons, 
            {opacity: opacityOtherButtons, 
            display: data.stateTimer.state.isPlay ? "flex" : "none"}]}>
                <StopButton dataInfo={data}/>
                <PauseButton dataInfo={data}/>
            </Animated.View>
        </View>
    )
}