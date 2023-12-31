import { View, SafeAreaView, } from "react-native";
import Buttons from "./Buttons/Buttons";
import Timer from "./Timer/Timer";
import { buttonsStyle } from "./Buttons/styles/buttonsStyle";
import ButtonTabs from "./InfoTabs/ButtonTabs";
import YoutubeTabs from "./InfoTabs/YoutubeTabs";
import { useAppSelector } from "./Utils/Redux/reduxHookCustom";

export default function Components() {
    const data = useAppSelector((state) => state);

    return (
        <SafeAreaView>
            <Timer />

            <View style={buttonsStyle.container}>
                <View style={{minHeight: 70}}>
                    {data.stateMusic.pressBtn.youtube ? <YoutubeTabs /> : null}
                    {data.stateMusic.isSelection ? <ButtonTabs /> : null}
                </View>
              <Buttons /> 
            </View>
        </SafeAreaView>
    )
}