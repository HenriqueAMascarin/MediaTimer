import { View, SafeAreaView,} from "react-native";
import Buttons from "./Buttons/Buttons";
import Timer from "./Timer/Timer";
import { buttonsStyle } from "./Buttons/styles/buttonsStyle";
import Tabs from "./InfoTabs/Tabs";

export default function Components() {
    return (
        <SafeAreaView>
            <Timer />

            <View style={buttonsStyle.container}>
                <Tabs />
                <Buttons />
            </View>
        </SafeAreaView>
    )
}