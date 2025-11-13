import { View, SafeAreaView, Animated } from "react-native";
import Buttons from "./Buttons/Buttons";
import ComponentTimer from "./Timer/ComponentTimer";
import { buttonsStyle } from "./Buttons/styles/buttonsStyle";
import ButtonTabs from "./InfoTabs/ButtonTabs";
import { useAppSelector } from "./Utils/Redux/reduxHookCustom";
import { alertLocalKey } from "./Utils/globalVars";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import notifee, { Event, EventType } from "@notifee/react-native";
import HistoryTabs from "./InfoTabs/HistoryTabs";
import { changeLocalHistoryArray } from "./Utils/historyArrayFunctions";
import HamburguerMenu from "./Theme/HamburguerMenu";
import { useTheme } from "./Utils/Context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  changeAlertSoundPlayer,
  changeIsAlert,
} from "@src/components/Utils/Redux/features/stateAlert-slice";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { setAudioModeAsync, useAudioPlayer } from "expo-audio";
import { changeAudioPlayerState } from "@src/components/Utils/Redux/features/statesMusic-slice";
import * as SplashScreen from "expo-splash-screen";
import { stopTimer } from "@src/components/Timer/timerUtils/stopTimerUtils";

const eventNotifee = async ({ type }: Event) => {
  if (type === EventType.DISMISSED) {
    stopTimer();
  }
};

export default function Components() {
  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);

  const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);

  const { dataTheme } = useTheme();

  const dispatch = useDispatch();

  const initialAudioPlayerState = useAudioPlayer();

  const initialAlertAudioPlayer = useAudioPlayer(
    require("@assets/sounds/timer.mp3")
  );

  async function BootData() {
    notifee.onBackgroundEvent(eventNotifee);

    notifee.onForegroundEvent(eventNotifee);

    dispatch(changeAudioPlayerState(initialAudioPlayerState));

    dispatch(changeAlertSoundPlayer(initialAlertAudioPlayer));

    await setAudioModeAsync({
      shouldPlayInBackground: true,
      interruptionMode: "doNotMix",
      playsInSilentMode: true,
      interruptionModeAndroid: "doNotMix",
      allowsRecording: false,
      shouldRouteThroughEarpiece: false,
    });

    await changeLocalHistoryArray();

    await (async function initialAlertConfig() {
      const jsonValue = await AsyncStorage.getItem(alertLocalKey);

      if (!jsonValue) {
        AsyncStorage.setItem(alertLocalKey, "true");
      } else {
        if (jsonValue == "false") {
          dispatch(changeIsAlert(false));
        }
      }
    })();

    SplashScreen.hideAsync();
  }

  useEffect(() => {
    BootData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <StatusBar />

      <Animated.View
        style={{
          backgroundColor: dataTheme.animatedValues.backgroundColor,
          flex: 1,
          position: "relative",
          marginTop: Constants.statusBarHeight,
        }}
      >
        <HamburguerMenu initialOption={dataTheme.selectedOption} />

        <ComponentTimer />

        <View style={buttonsStyle.container}>
          <Animated.View
            style={{
              minHeight: 90,
              backgroundColor: dataTheme.animatedValues.backgroundColor,
            }}
          >
            {stateMusic.isSelection && <ButtonTabs />}
            {stateHistory.isHistory && <HistoryTabs />}
          </Animated.View>

          <Buttons />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
