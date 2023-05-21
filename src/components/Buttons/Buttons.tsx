import { Animated, View } from "react-native";
import { useData } from "../Utils/ContextTimer";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import StopButton from "./StopButton";
import { buttonsStyle } from "./styles/buttonsStyle";
import appersButtons, { opacityInitialButtons, opacityOtherButtons } from "./ButtonsAnimations/ButtonsAnimations";
import { useEffect } from "react";

export default function Buttons() {

    const data = useData();

    useEffect(() =>{
        if(data.stateTimer.state.isPlay){
            appersButtons(true);
        }else if(!data.stateTimer.state.isPlay){
            appersButtons(false);
        }
    },[data.stateTimer.state.isPlay])

    return (
        <View style={buttonsStyle.container}>

            {data.stateTimer.state.isPlay
                ? <View />
                : <Animated.View style={[buttonsStyle.containerInitialButtons, {opacity: opacityInitialButtons}]}>
                    <PlayButton dataInfo={data} />
                </Animated.View>
            }

            {data.stateTimer.state.isPlay
                ? <Animated.View style={[buttonsStyle.containerPlayStateButtons, {opacity: opacityOtherButtons}]}>
                    <StopButton dataInfo={data} />
                    <PauseButton dataInfo={data} />
                </Animated.View>
                : <View />
            }
        </View>
    )
}