import { View, Text, TouchableOpacity, TextInput, Animated } from "react-native";
import CloseSvg from "../../../assets/images/close.svg";
import LoadingSvg from "../../../assets/images/loading.svg";
import CorrectSvg from "../../../assets/images/correct.svg";
import SearchSvg from "../../../assets/images/search.svg";
import { useState } from "react";
import { youtubeStyle } from "./styles/youtubeStyle";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import { changeIsSelectionYoutube, changeMusicLink, changeYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { youtubeDownload } from "../Utils/youtube/youtubeDownload";

export default function YoutubeTabs() {

    const [status, changeStatus] = useState({ searching: false, success: false })
    const [input, changeInput] = useState('');
    const dispatch = useDispatch();

    function search() {
        changeStatus({ searching: true, success: false });

        youtubeDownload(input).then((res) => {
            if (res) {
                dispatch(changeMusicLink(res));
                dispatch(changeYoutube(true));
                changeStatus({ searching: true, success: true });
            }
        });

    }

    function onClose() {
        changeStatus({ searching: false, success: false });
        dispatch(changeIsSelectionYoutube(false));
    }

    let spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false
            }
        )
    ).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

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
                    <View style={[youtubeStyle.item, youtubeStyle.statusItem]}>
                        <Animated.View style={{ transform: [{ rotate: spin }] }}>
                            <LoadingSvg />
                        </Animated.View>

                        <Text>
                            Buscando música
                        </Text>
                    </View>
                    :
                    <View style={[youtubeStyle.item, youtubeStyle.statusItem]}>

                        <CorrectSvg />

                        <Text>
                            Música encontrada
                        </Text>

                    </View>
            }
            {!status.searching || status.success ?
                <TouchableOpacity style={{ position: "absolute", top: 6, right: 6, height: 16, width: 16, elevation: 10, zIndex: 2 }} onPress={() => onClose()}>
                    <CloseSvg width={'16px'} height={'16px'} />
                </TouchableOpacity>
                : null}

        </View>
    )
}