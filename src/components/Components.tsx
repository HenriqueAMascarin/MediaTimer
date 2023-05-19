import { View, SafeAreaView } from "react-native";
import Buttons from "./Buttons/Buttons";
import Timer from "./Timer/Timer";

export default function () {
    return (
        <SafeAreaView>
            <View>
                <Timer />
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Buttons />
                </View>
            </View>
        </SafeAreaView>
    )
}