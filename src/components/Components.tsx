import { View, SafeAreaView } from "react-native";
import Buttons from "./Buttons/Buttons";
import ComponentTimer from "./Timer/ComponentTimer";
import { buttonsStyle } from "./Buttons/styles/buttonsStyle";
import ButtonTabs from "./InfoTabs/ButtonTabs";
import YoutubeTabs from "./InfoTabs/YoutubeTabs";
import { useAppSelector } from "./Utils/Redux/reduxHookCustom";
import { deleteAsync, getInfoAsync, makeDirectoryAsync } from "expo-file-system";
import { directoryYoutube, historyLocalKey } from "./Utils/globalVars";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { changeIsPlay } from '@src/components/Utils/Redux/features/stateTimer-slice';
import notifee, { Event, EventType } from '@notifee/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeHistoryArray, historyItem } from "./Utils/Redux/features/stateHistory-slice";

export default function Components() {
    const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
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

        (async () => {
            
            const jsonValue = await AsyncStorage.getItem(historyLocalKey);
            let historyValue: historyItem[] | null = null;
            if(jsonValue) historyValue = JSON.parse(jsonValue);

            if(historyValue != null){
                dispatch(changeHistoryArray(historyValue));
            }
            
        })();

        (async () => {

            const { exists } = await getInfoAsync(directoryYoutube);

            if (exists) {
                deleteAsync(directoryYoutube);
            }

            makeDirectoryAsync(directoryYoutube, { intermediates: true });

        })();

    }, [])

    return (
        <SafeAreaView>
            <ComponentTimer />

            <View style={buttonsStyle.container}>
                <View style={{ minHeight: 90 }}>
                    {stateMusic.isYoutubeSelection ? <YoutubeTabs /> : null}
                    {stateMusic.isSelection ? <ButtonTabs /> : null}
                </View>
                <Buttons />
            </View>
        </SafeAreaView>
    )
}