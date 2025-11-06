import { View, SafeAreaView, Animated } from "react-native";
import Buttons from "./Buttons/Buttons";
import ComponentTimer from "./Timer/ComponentTimer";
import { buttonsStyle } from "./Buttons/styles/buttonsStyle";
import ButtonTabs from "./InfoTabs/ButtonTabs";
import { useAppSelector } from "./Utils/Redux/reduxHookCustom";
import { alertLocalKey } from "./Utils/globalVars";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeIsPlay } from "@src/components/Utils/Redux/features/stateTimer-slice";
import notifee, { Event, EventType } from "@notifee/react-native";
import HistoryTabs from "./InfoTabs/HistoryTabs";
import { changeLocalHistoryArray } from "./Utils/historyArrayFunctions";
import HamburguerMenu from "./Theme/HamburguerMenu";
import { useTheme } from "./Utils/Context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeIsAlert } from "./Utils/Redux/features/stateAlert-slice";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { setAudioModeAsync } from 'expo-audio';

export default function Components() {
  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);

  const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);

  const { dataTheme } = useTheme();

  const dispatch = useDispatch();

  const eventNotifee = async ({ type, detail }: Event) => {
    const { notification } = detail;
    if (type === EventType.DISMISSED) {
      if (notification?.id) {
        await notifee.cancelNotification(notification.id);
        dispatch(changeIsPlay(false));
      }
    }
  };

  async function BootData() {
    notifee.onBackgroundEvent(eventNotifee);
    notifee.onForegroundEvent(eventNotifee);

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
  }

  useEffect(() => {
    if (dataTheme != null) {
      BootData();
    }
  }, [dataTheme]);

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
