import { Animated, View } from "react-native";
import { useEffect, useRef } from "react";

import PauseButton from "./PauseButton";
import MusicButton from "./MusicButton";
import HistoryButton from "./HistoryButton";
import PlayButton from "./PlayButton";
import StopButton from "./StopButton";

import { buttonsStyle } from "./styles/buttonsStyle";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import ResumeButton from "@src/components/Buttons/ResumeButton";

export default function Buttons() {
  const stateTimer = useAppSelector(({ stateTimer }) => stateTimer);

  let opacityInitialButtons = useRef(new Animated.Value(1));

  let opacityOtherButtons = useRef(new Animated.Value(0));

  function appearsButtonsOnPlayState() {
    // Without setTimeout, the buttons will not appear
    setTimeout(() => {
      const isPlay = stateTimer.isPlay;

      Animated.parallel([
        Animated.timing(opacityInitialButtons.current, {
          toValue: isPlay ? 0 : 1,
          duration: 300,
          delay: isPlay ? 1 : 220,
          useNativeDriver: false,
        }),
        Animated.timing(opacityOtherButtons.current, {
          toValue: isPlay ? 1 : 0,
          duration: 300,
          delay: isPlay ? 220 : 1,
          useNativeDriver: false,
        }),
      ]).start();
    }, 10);
  }

  useEffect(() => {
    appearsButtonsOnPlayState();
  }, [stateTimer.isPlay]);

  return (
    <View style={buttonsStyle.buttonsContainer}>
      {!stateTimer.isPlay ? (
        <Animated.View
          style={[
            buttonsStyle.containerInitialButtons,
            { opacity: opacityInitialButtons.current },
          ]}
        >
          <MusicButton />

          <PlayButton />

          <HistoryButton />
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            buttonsStyle.containerPlayStateButtons,
            { opacity: opacityOtherButtons.current },
          ]}
        >
          <StopButton />

          {stateTimer.isPaused ? <ResumeButton /> : <PauseButton />}
        </Animated.View>
      )}
    </View>
  );
}
