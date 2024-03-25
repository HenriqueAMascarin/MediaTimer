import { View, SafeAreaView, useColorScheme } from "react-native";
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
import { changeTheme } from "./Utils/Redux/features/stateTheme-slice";

export default function Components() {
    const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
    const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);
    const stateTheme = useAppSelector(({ stateTheme }) => stateTheme);

    const dispatch = useDispatch();
    const colorScheme = useColorScheme();

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

    useEffect(() => {
        dispatch(changeTheme(colorScheme ?? 'light'));
    }, [colorScheme])

    return (
        <SafeAreaView style={{ 'backgroundColor': stateTheme.background, flex: 1 }}>
            <ComponentTimer />

            <View style={buttonsStyle.container}>
                <View style={{ minHeight: 90, 'backgroundColor': stateTheme.background  }}>
                    {stateMusic.isYoutubeSelection ? <YoutubeTabs /> : <></>}
                    {stateMusic.isSelection ? <ButtonTabs /> : <></>}
                    {stateHistory.isHistory ? <HistoryTabs /> : <></>}
                </View>
                <Buttons />
            </View>
        </SafeAreaView>
    )
}