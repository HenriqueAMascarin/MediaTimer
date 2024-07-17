import { View, Text, TouchableOpacity, TextInput, Animated } from "react-native";
import SearchSvg from "@assets/images/search.svg";
import { useEffect, useRef, useState } from "react";
import { youtubeStyle } from "./styles/youtubeStyle";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import { changeIsSelectionYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { downloadApiMusic, youtubeSearch } from "../Utils/youtube/youtubeFunctions";
import { changeHistoryArray, historyItem } from "../Utils/Redux/features/stateHistory-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { historyLocalKey } from "../Utils/globalVars";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { changeMusic } from "../Utils/buttons";
import { SuccessAlert, LoadingAlert, CloseButton, ErrorAlert } from "@src/components/InfoTabs/Alerts/Components";
import { animatedModalsOpacity } from "../Utils/animatedModalsOpacity";

export default function YoutubeTabs() {

    const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);
    const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
    const dispatch = useDispatch();

    const [status, changeStatus] = useState({ searching: false, success: false, error: false });

    const [input, changeInput] = useState('');

    const [textProgress, changeTextProgress] = useState("Buscando a música");

    let opacityModal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animatedModalsOpacity({ isOpen: true, animatedOpacity: opacityModal });
    }, []);

    function caseErrorStatus() {
        changeStatus({ searching: true, success: false, error: true });
    }

    async function search() {
        changeStatus({ searching: true, success: false, error: false });

        await youtubeSearch(input).then(async (musicItem: historyItem | null) => {
            if (musicItem?.idMusic != null) {
                let oldHistoryArray = [...stateHistory.historyItems];

                for (let key = 0; key < oldHistoryArray.length; key++) {
                    oldHistoryArray[key] = { ...oldHistoryArray[key], isSelected: false };

                    if (musicItem.idMusic == oldHistoryArray[key].idMusic) {
                        oldHistoryArray.splice(key, 1)
                    }
                }

                if (oldHistoryArray.length >= 10) {
                    oldHistoryArray.pop();
                };

                const newArrItems = [musicItem, ...oldHistoryArray];

                try {

                    const jsonValue = JSON.stringify(newArrItems);

                    await AsyncStorage.setItem(historyLocalKey, jsonValue);

                    dispatch(changeHistoryArray(newArrItems));

                    changeTextProgress('Baixando a música');

                    await downloadApiMusic(musicItem.idMusic).then((musicLink: string | null) => {
                        if (musicLink != null) {
                            changeMusic(stateMusic.pressBtn, { youtube: true }, musicLink, true);

                            changeStatus({ searching: true, success: true, error: false });
                        }
                    });
                } catch {
                    caseErrorStatus();
                } finally {
                    changeTextProgress('Buscando a música');
                }

            } else {
                caseErrorStatus();
            }
        }).catch(() => caseErrorStatus());

    }

    function onClose() {
        changeStatus({ searching: false, success: false, error: false });
        dispatch(changeIsSelectionYoutube(false));
    }

    return (
        <View style={{ position: "relative" }}>
            {!status.searching ?

                <Animated.View style={[youtubeStyle.item, youtubeStyle.searchItem, { opacity: opacityModal }]}>
                    <CloseButton clickFunction={onClose} />
                    <Text style={{ color: colorsStyle.principal.blue, fontSize: 20 }} allowFontScaling={false}>
                        Nome da música
                    </Text>

                    <View style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                        <TextInput style={{ backgroundColor: colorsStyle.principal.white, paddingVertical: 1, borderRadius: 14, fontSize: 16, paddingLeft: 10, paddingRight: 30 }} onChangeText={changeInput} value={input} />

                        <TouchableOpacity onPress={() => search()} style={{ position: "absolute", right: 10 }}>
                            <SearchSvg width={'18px'} height={'18px'} />
                        </TouchableOpacity>
                    </View>

                </Animated.View>

                :

                !status.success && !status.error ?
                    <LoadingAlert alertText={textProgress} />
                    :
                    status.success && !status.error ?
                        <SuccessAlert closeFunction={onClose} />
                        :
                        <ErrorAlert closeFunction={onClose} />
            }
        </View>
    )
}