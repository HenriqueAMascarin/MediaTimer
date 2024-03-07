import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { historyStyle } from "./styles/historyStyles";
import PlaySvg from "@assets/images/play.svg";
import { colorsStyle } from "../Utils/colorsStyle";
import { changeHistoryArray, changeIsHistory, historyItem } from "../Utils/Redux/features/stateHistory-slice";
import { SuccessAlert, LoadingAlert, ErrorAlert } from "@src/components/InfoTabs/Alerts/Components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { youtubeDownload } from "../Utils/youtube/youtubeFunctions";
import { changeMusic } from "../Utils/buttons";

export default function HistoryTabs() {
    const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);
    const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
    const [status, changeStatus] = useState({ searching: false, success: false, error: false });
    const dispatch = useDispatch();


    function musicName(nameMusic: string) {
        const nameOnly = nameMusic.slice(nameMusic.indexOf('-') + 2).slice(0, 20) + " ";
        
        const nameFormated = (nameOnly.lastIndexOf(' ') != -1 ? nameOnly.slice(0, nameOnly.lastIndexOf(' ')) : nameOnly + '...') ;

        return nameFormated;
    }

    function changeItemSelected(item: historyItem) {
        if (!item.isSelected) {

            changeStatus({ searching: true, success: false, error: false })

            let newArr = [...stateHistory.historyItems];

            for (let key = 0; key < newArr.length; key++) {
                newArr[key].isSelected = false;
            }

            youtubeDownload(item.idMusic).then((musicLink: string | null) => {
                if (musicLink != null) {
                    const index = newArr.findIndex((el) => el.idMusic == item.idMusic);
                    newArr[index] = {...newArr[index], isSelected: true};
                    changeMusic(stateMusic.pressBtn, { youtube: true }, musicLink, false);
                    changeStatus({ searching: true, success: true, error: false });
                    dispatch(changeHistoryArray(newArr));
                }
            }).catch(() => {
                changeHistoryArray(newArr);
                changeStatus({ searching: true, success: false, error: true });
            });


        }
    }

    function onClose() {
        changeStatus({ searching: false, success: false, error: false });
        dispatch(changeIsHistory(false));
    }

    return (
        <View>
            {!status.searching ?
                <ScrollView horizontal>

                    <View style={[historyStyle.container]}>
                        {stateHistory.historyItems.map((item, keyItem) => {
                            return (
                                <View style={[historyStyle.item]} key={keyItem}>
                                    <View>
                                        <Text>{musicName(item.nameMusic)}</Text>
                                        <Text>{item.nameMusic.slice(0, item.nameMusic.indexOf('-')) ?? item.authorMusic}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => changeItemSelected(item)}>
                                        <PlaySvg width={"35px"} height={"35px"} fill={item.isSelected ? colorsStyle.principal.blue : colorsStyle.principal.blackGray} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>

                :

                !status.success && !status.error ?
                    <LoadingAlert />
                    :
                    status.success && !status.error ?
                        <SuccessAlert closeFunction={onClose} />
                        :
                        <ErrorAlert closeFunction={onClose} />
            }
        </View>
    )
}