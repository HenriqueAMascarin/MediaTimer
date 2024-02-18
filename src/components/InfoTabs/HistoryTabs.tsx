import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { View, Text, ScrollView } from 'react-native';
import { historyStyle } from "./styles/historyStyles";

export default function HistoryTabs() {
    const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);

    return (
        <ScrollView horizontal>
            <View style={[historyStyle.container]}>
                {stateHistory.historyItems.map((item, keyItem) => {
                    return (
                        <View style={[historyStyle.item]} key={keyItem}>
                            <Text>{item.nameMusic}</Text>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}