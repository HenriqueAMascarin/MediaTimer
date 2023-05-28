import { View, SafeAreaView } from "react-native";
import Buttons from "./Buttons/Buttons";
import Timer from "./Timer/Timer";
import { buttonsStyle } from "./Buttons/styles/buttonsStyle";

export default function () {
    return (
        <SafeAreaView>
            <View>
                <Timer />
                <View style={buttonsStyle.container}>
                    <Buttons />
                </View>
            </View>
        </SafeAreaView>
    )
}