import { View, SafeAreaView, } from "react-native";
import Buttons from "./Buttons/Buttons";
import Timer from "./Timer/Timer";
import { buttonsStyle } from "./Buttons/styles/buttonsStyle";
import ButtonTabs from "./InfoTabs/ButtonTabs";
import YoutubeTabs from "./InfoTabs/YoutubeTabs";
import { useAppSelector } from "./Utils/Redux/reduxHookCustom";
import { deleteAsync, getInfoAsync, makeDirectoryAsync } from "expo-file-system";
import { directoryYoutube } from "./Utils/globalVars";
import { useEffect } from "react";

export default function Components() {
    const data = useAppSelector((state) => state);

    useEffect(() => {

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
            <Timer />

            <View style={buttonsStyle.container}>
                <View style={{ minHeight: 90 }}>
                    {data.stateMusic.isYoutubeSelection ? <YoutubeTabs /> : null}
                    {data.stateMusic.isSelection ? <ButtonTabs /> : null}
                </View>
                <Buttons />
            </View>
        </SafeAreaView>
    )
}