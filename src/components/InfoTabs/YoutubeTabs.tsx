import { View, Text, TouchableOpacity, TextInput, Animated } from "react-native";
import CloseSvg from "@assets/images/close.svg";
import SearchSvg from "@assets/images/search.svg";
import { useState } from "react";
import { youtubeStyle } from "./styles/youtubeStyle";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import { changeIsSelectionYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { youtubeDownload, youtubeSearch } from "../Utils/youtube/youtubeFunctions";
import { changeHistoryArray, historyItem } from "../Utils/Redux/features/stateHistory-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { historyLocalKey } from "../Utils/globalVars";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { changeMusic } from "../Utils/buttons";
import {SuccessAlert, LoadingAlert} from "@src/components/InfoTabs/Alerts/Components";

export default function YoutubeTabs() {

    const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);
    const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
    const dispatch = useDispatch();

    const [status, changeStatus] = useState({ searching: false, success: false });
    const [input, changeInput] = useState('');

    async function search() {
        changeStatus({ searching: true, success: false });

        await youtubeSearch(input).then(async (musicItem: historyItem | null) => {
            if (musicItem?.idMusic != null) {
                let oldHistoryArray = stateHistory.historyItems;
                if (oldHistoryArray.length >= 10) oldHistoryArray.pop();
                const newArrItems = [musicItem, ...oldHistoryArray];

                try {
                    const jsonValue = JSON.stringify(newArrItems);
                    await AsyncStorage.setItem(historyLocalKey, jsonValue);
                    dispatch(changeHistoryArray(newArrItems))

                    await youtubeDownload(musicItem.idMusic).then((musicLink: string | null) => {
                        if (musicLink != null) {
                            changeMusic(stateMusic.pressBtn, { youtube: true }, musicLink);
                            changeStatus({ searching: true, success: true });
                        }
                    });
                } catch {
                    changeStatus({ searching: false, success: false });
                }

            }
        })


    }

    function onClose() {
        changeStatus({ searching: false, success: false });
        dispatch(changeIsSelectionYoutube(false));
    }

    return (
        <View style={{ position: "relative" }}>
            {!status.searching ?

                <View style={[youtubeStyle.item, youtubeStyle.searchItem]}>
                    <Text style={{ color: colorsStyle.principal.blue, fontSize: 20 }}>
                        Nome da música
                    </Text>

                    <View style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                        <TextInput style={{ backgroundColor: colorsStyle.principal.white, paddingVertical: 1, borderRadius: 14, fontSize: 16, paddingLeft: 10, paddingRight: 30 }} onChangeText={changeInput} value={input} />

                        <TouchableOpacity onPress={() => search()} style={{ position: "absolute", right: 10 }}>
                            <SearchSvg width={'18px'} height={'18px'} />
                        </TouchableOpacity>
                    </View>

                </View>

                :


                !status.success ?
                    <LoadingAlert/>
                    :
                    <SuccessAlert />
            }
            {!status.searching || status.success ?
                <TouchableOpacity style={{ position: "absolute", top: 6, right: 6, height: 16, width: 16, elevation: 10, zIndex: 2 }} onPress={() => onClose()}>
                    <CloseSvg width={'16px'} height={'16px'} />
                </TouchableOpacity>
                : null}

        </View>
    )
}