import { Animated, View } from "react-native";
import { useEffect } from "react";

import PauseButton from "./PauseButton";
import MusicButton from "./MusicButton";
import HistoryButton from "./HistoryButton";
import PlayButton from "./PlayButton";
import StopButton from "./StopButton";

import { PRODUCTION } from "../Utils/globalVars";

import { buttonsStyle } from "./styles/buttonsStyle";
import appersButtons, { opacityInitialButtons, opacityOtherButtons } from "./ButtonsAnimations/ButtonsAnimations";

import { useAppSelector } from "../Utils/Redux/reduxHookCustom";

export default function Buttons() {

    const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);

    useEffect(() => {

        appersButtons(stateTimer.isPlay);

    }, [stateTimer.isPlay])

    return (
        <View style={buttonsStyle.buttonsContainer}>
            {!stateTimer.isPlay
                ?
                <Animated.View style={[buttonsStyle.containerInitialButtons, { opacity: opacityInitialButtons }]}>
                    <MusicButton />
                    <PlayButton />
                    {/* {!PRODUCTION && <HistoryButton />} */}
                </Animated.View>
                :
                <Animated.View style={[buttonsStyle.containerPlayStateButtons, { opacity: opacityOtherButtons }]}>
                    <StopButton />
                    <PauseButton />
                </Animated.View>
            }
        </View>
    )
}