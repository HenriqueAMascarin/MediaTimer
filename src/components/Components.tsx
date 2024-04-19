import { View, SafeAreaView, useColorScheme, Animated, Easing } from "react-native";
import Buttons from "./Buttons/Buttons";
import ComponentTimer from "./Timer/ComponentTimer";
import { buttonsStyle } from "./Buttons/styles/buttonsStyle";
import ButtonTabs from "./InfoTabs/ButtonTabs";
import YoutubeTabs from "./InfoTabs/YoutubeTabs";
import { useAppSelector } from "./Utils/Redux/reduxHookCustom";
import { deleteAsync, getInfoAsync, makeDirectoryAsync } from "expo-file-system";
import { directoryYoutube } from "./Utils/globalVars";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { changeIsPlay } from '@src/components/Utils/Redux/features/stateTimer-slice';
import notifee, { Event, EventType } from '@notifee/react-native';
import HistoryTabs from "./InfoTabs/HistoryTabs";
import { changeLocalHistoryArray } from "./Utils/changeLocalHistoryArray";
import HamburguerMenu from "./Theme/HamburguerMenu";
import { useTheme } from "./Utils/Context/ThemeContext";

export default function Components() {
    const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
    const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);
    const {data: dataTheme} = useTheme();

    const dispatch = useDispatch();

    const eventNotifee = async ({ type, detail }: Event) => {
        const { notification } = detail;
        if (type === EventType.DISMISSED) {

            if (notification?.id) {
                await notifee.cancelNotification(notification.id);
                dispatch(changeIsPlay(false));
            }

        }
    }

    notifee.onBackgroundEvent(eventNotifee);
    notifee.onForegroundEvent(eventNotifee);

    useEffect(() => {

        notifee.cancelAllNotifications();

        changeLocalHistoryArray();

        (async () => {

            const { exists } = await getInfoAsync(directoryYoutube);

            if (exists) {
                deleteAsync(directoryYoutube);
            }

            makeDirectoryAsync(directoryYoutube, { intermediates: true });

        })();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animated.View style={{backgroundColor: dataTheme.animatedValues.backgroundColor, flex: 1, position: "relative" }}>
                <HamburguerMenu initialOption={dataTheme.selectedOption}></HamburguerMenu>

                <ComponentTimer />

                <View style={buttonsStyle.container}>
                    <Animated.View style={{ minHeight: 90, 'backgroundColor': dataTheme.animatedValues.backgroundColor }}>
                        {stateMusic.isYoutubeSelection ? <YoutubeTabs /> : <></>}
                        {stateMusic.isSelection ? <ButtonTabs /> : <></>}
                        {stateHistory.isHistory ? <HistoryTabs /> : <></>}
                    </Animated.View>
                    <Buttons />
                </View>
            </Animated.View>
        </SafeAreaView>
    )
}