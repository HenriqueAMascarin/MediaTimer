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

            setTimeout(async () => {

                try {
                    if (item.idMusic) {
                        downloadApiMusic(item.idMusic).then((musicLink: string | null) => {
                            if (musicLink != null) {
                                changeMusic(stateMusic.pressBtn, { youtube: true }, musicLink, false);

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
                                        changeMusic(stateMusic.pressBtn, { audioFile: true }, data.path, false);

                                        success = true;
                                    })
                                }
                            } else {
                                changeErrorText('Falta de permissões');
                            }
                        })
                    }
                } catch {
                    success = false;
                }

                if (success) {
                    const indexSelected = newArr.findIndex((el) => el?.idMusic ? el.idMusic == item.idMusic : el.uri == item.uri);

                    newArr[indexSelected] = { ...newArr[indexSelected], isSelected: true };

                    dispatch(changeHistoryArray(newArr));

                    changeStatus({ searching: true, success: true, error: false });
                } else {
                    changeMusic(stateMusic.pressBtn, { reset: true });

                    dispatch(changeHistoryArray(newArr));

                    changeStatus({ searching: true, success: false, error: true });
                }
            }, 400);
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
                                <View style={[historyStyle.item]} key={keyItem} aria-label={`Cartão ${keyItem + 1}, sobre o áudio salvo no histórico`}>
                                    <View style={{ width: 150 }}>
                                        <Text allowFontScaling={false} style={{fontFamily: 'Roboto'}}>{musicName(item.nameMusic)}</Text>
                                        <Text allowFontScaling={false} style={{fontFamily: 'Roboto'}}>{authorName(item)}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => changeItemSelected(item)} aria-label="Botão para selecionar o áudio">
                                        <PlaySvg width={"35px"} height={"35px"} fill={item.isSelected ? colorsStyle.principal.blue : colorsStyle.principal.black} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </Animated.ScrollView>

                :

                !status.success && !status.error ?
                    <LoadingAlert />
                    :
                    status.success && !status.error ?
                        <SuccessAlert closeFunction={onClose} />
                        :
                        <ErrorAlert closeFunction={onClose} alertText={errorText} />
            }
        </View>
    )
}