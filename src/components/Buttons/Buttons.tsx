import { Animated, View } from "react-native";
import { useEffect } from "react";

import PauseButton from "./PauseButton";
import MusicButton from "./MusicButton";
import HistoryButton from "./HistoryButton";
import PlayButton from "./PlayButton";
import StopButton from "./StopButton";

import { buttonsStyle } from "./styles/buttonsStyle";
import appersButtons, { opacityInitialButtons, opacityOtherButtons } from "./ButtonsAnimations/ButtonsAnimations";

import { useAppSelector } from "../Utils/Redux/reduxHookCustom";

export default function Buttons() {

    const data = useAppSelector((state) => state);

    useEffect(() => {

        appersButtons(data.stateTimer.isPlay);

    }, [data.stateTimer.isPlay])

    return (
        <View style={buttonsStyle.buttonsContainer}>
            {!data.stateTimer.isPlay
                ?
                <Animated.View style={[buttonsStyle.containerInitialButtons, { opacity: opacityInitialButtons }]}>
                    <MusicButton dataInfo={data} />
                    <PlayButton />
                    <HistoryButton />
                </Animated.View>
                :
                <Animated.View style={[buttonsStyle.containerPlayStateButtons, { opacity: opacityOtherButtons }]}>
                    <StopButton />
                    <PauseButton dataInfo={data} />
                </Animated.View>
            }
        </View>
    )
}