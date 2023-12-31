import { View, Text, TouchableOpacity, TextInput } from "react-native";
import CloseSvg from "../../../assets/images/close.svg";
import LoadingSvg from "../../../assets/images/loading.svg";
import CorrectSvg from "../../../assets/images/correct.svg";
import SearchSvg from "../../../assets/images/search.svg";
import { useState } from "react";
import { youtubeStyle } from "./styles/youtubeStyle";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import { changeMusicLink, changeYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { youtubeDownload } from "./utils/youtubeDownload";

export default function YoutubeTabs() {

    const [status, changeStatus] = useState({ searching: false, success: false })
    const [input, changeInput] = useState('');
    const dispatch = useDispatch();

    function search() {
        changeStatus({ searching: true, success: false });



        youtubeDownload(input).then((res) => {
            console.log(res);
            if (res) {
                console.log(res);
                dispatch(changeMusicLink(res));
                dispatch(changeYoutube(false))
            }
        });

    }

    return (
        <View style={{ position: "relative" }}>
            {!status.searching ?

                <View style={youtubeStyle.item}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 60 }}>
                        <Text style={{ color: colorsStyle.principal.blue, fontSize: 20 }}>
                            Nome da música
                        </Text>
                        <TouchableOpacity style={{ position: "absolute", right: 0, height: 16, width: 16 }} onPressIn={() => dispatch(changeYoutube(false))}>
                            <CloseSvg width={'16px'} height={'16px'} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                        <TextInput style={{ backgroundColor: colorsStyle.principal.white, paddingHorizontal: 6, borderRadius: 14, fontSize: 16, paddingLeft: 10, paddingRight: 30 }} onChangeText={changeInput} value={input} />

                        <TouchableOpacity onPressIn={() => search()}
                            style={{ position: "absolute", right: 10, width: 15, height: 15 }}>
                            <SearchSvg width={'15px'} height={'15px'} />
                        </TouchableOpacity>
                    </View>

                </View>

                :

                <View style={youtubeStyle.item}>

                    <TouchableOpacity><CloseSvg /></TouchableOpacity>

                    {!status.success ?
                        <View>
                            <LoadingSvg />

                            <Text>
                                Buscando música
                            </Text>
                        </View>
                        :
                        <View>

                            <CorrectSvg />

                            <Text>
                                Música encontrada
                            </Text>

                        </View>
                    }
                </View>
            }
        </View>
    )
}