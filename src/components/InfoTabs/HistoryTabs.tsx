import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { View, Text, TouchableOpacity, Animated, PermissionsAndroid } from 'react-native';
import { historyStyle } from "./styles/historyStyles";
import PlaySvg from "@assets/images/play.svg";
import { colorsStyle } from "../Utils/colorsStyle";
import { changeHistoryArray, changeIsHistory, historyItem } from "../Utils/Redux/features/stateHistory-slice";
import { SuccessAlert, LoadingAlert, ErrorAlert } from "@src/components/InfoTabs/Alerts/Components";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { downloadApiMusic } from "../Utils/youtube/youtubeFunctions";
import { changeMusic } from "../Utils/buttons";
import { animatedModalsOpacity } from "../Utils/animatedModalsOpacity";
import { decode } from 'html-entities';
import RNFetchBlob from "rn-fetch-blob";

export default function HistoryTabs() {
    const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);

    const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);

    const [status, changeStatus] = useState({ searching: false, success: false, error: false });

    const [errorText, changeErrorText] = useState<null | string>(null);

    const dispatch = useDispatch();

    function musicName(nameMusic: string) {
        const maxLength = 16;

        const nameWithoutFile = nameMusic.replace(/\.[^/.]+$/, "");

        const nameMusicDecode = decode(nameWithoutFile);

        const nameOnly = nameMusicDecode.slice(nameMusicDecode.indexOf('- ') != -1 ? nameMusicDecode.indexOf('- ') + 2 : 0).slice(0, maxLength) + " ";

        const nameFormated = nameOnly.lastIndexOf(' ') < maxLength - 2 ? nameOnly.slice(0, nameOnly.lastIndexOf(' ')) : nameOnly.slice(0, nameOnly.lastIndexOf('  ')) + '...';

        return nameFormated;
    }

    function authorName(item: historyItem) {
        const maxLength = 19;

        const nameMusicDecode = decode(item.nameMusic);

        const authorName = (nameMusicDecode.indexOf(' -') != -1 && nameMusicDecode.slice(0, nameMusicDecode.indexOf(' -')).length < maxLength ? nameMusicDecode.slice(0, nameMusicDecode.indexOf(' -')) : decode(item.authorMusic)).slice(0, maxLength);

        const authorNameFormated = authorName.length < maxLength ? authorName : authorName.slice(0, authorName.lastIndexOf('  ')) + '...';

        return authorNameFormated;
    }

    async function changeItemSelected(item: historyItem) {
        if (!item.isSelected) {

            changeErrorText(null);

            changeStatus({ searching: true, success: false, error: false })

            let newArr = [...stateHistory.historyItems];

            for (let key = 0; key < newArr.length; key++) {
                newArr[key].isSelected = false;
            }

            let success = false;

            if (item.idMusic) {
                downloadApiMusic(item.idMusic).then((musicLink: string | null) => {
                    if (musicLink != null) {
                        changeMusic(stateMusic.pressBtn, { youtube: true }, musicLink);

                        success = true;
                    }
                })
            } else if (item.uri) {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ).then(async (status) => {
                    if (status == "granted") {
                        if (item.uri) {
                            await RNFetchBlob.fs.stat(item.uri).then((data) => {
                                changeMusic(stateMusic.pressBtn, { audioFile: true }, data.path);

                                success = true;
                            })
                        }
                    } else {
                        changeErrorText('Falta de permissões');
                    }
                })

                if (success) {
                    const index = newArr.findIndex((el) => el.uri == item.uri || el.idMusic == item.idMusic);

                    newArr[index] = { ...newArr[index], isSelected: true };

                    dispatch(changeHistoryArray(newArr));

                    changeStatus({ searching: true, success: true, error: false });
                } else {
                    changeHistoryArray(newArr);

                    changeStatus({ searching: true, success: false, error: true });
                }
            }
        }
    }



    function onClose() {
        changeStatus({ searching: false, success: false, error: false });
        dispatch(changeIsHistory(false));
    }

    let opacityModal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animatedModalsOpacity({ isOpen: true, animatedOpacity: opacityModal });
    }, []);

    return (
        <View>
            {!status.searching ?
                <Animated.ScrollView horizontal style={[{ maxHeight: 90, opacity: opacityModal }]}>
                    <View style={[historyStyle.container]}>
                        {stateHistory.historyItems.map((item, keyItem) => {
                            return (
                                <View style={[historyStyle.item]} key={keyItem}>
                                    <View style={{ width: 150 }}>
                                        <Text allowFontScaling={false}>{musicName(item.nameMusic)}</Text>
                                        <Text allowFontScaling={false}>{authorName(item)}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => changeItemSelected(item)}>
                                        <PlaySvg width={"35px"} height={"35px"} fill={item.isSelected ? colorsStyle.principal.blue : colorsStyle.principal.black} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </Animated.ScrollView>

                :

                !status.success && !status.error ?
                    <LoadingAlert alertText="Baixando a música" />
                    :
                    status.success && !status.error ?
                        <SuccessAlert closeFunction={onClose} />
                        :
                        <ErrorAlert closeFunction={onClose} alertText={errorText} />
            }
        </View>
    )
}