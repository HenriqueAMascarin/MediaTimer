import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { historyStyle } from "./styles/historyStyles";
import PlaySvg from "@assets/images/play.svg";
import { colorsStyle } from "../Utils/colorsStyle";
import { historyItem } from "../Utils/Redux/features/stateHistory-slice";
import {SuccessAlert, LoadingAlert} from "@src/components/InfoTabs/Alerts/Components";

export default function HistoryTabs() {
    const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);

    function musicName(nameMusic: string) {
        const nameOnly = nameMusic.slice(nameMusic.indexOf('-') + 2).slice(0, 20);

        const nameFormated = (nameOnly.lastIndexOf(' ') != -1 ? nameOnly.slice(0, nameOnly.lastIndexOf(' ')) : null) + '...';

        return nameFormated;
    }

    function changeItemSelected(item: historyItem) {
        if (!item.isSelected) {
            let newArr = stateHistory.historyItems;

            for (const key in newArr) {
                newArr[key].isSelected = false;
            }

            try {
                
                newArr[newArr.findIndex((el) => el == item)].isSelected = true;
            } catch (error) {
                return;
            }
        }
    }

    return (
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

            <View>
                <LoadingAlert/>

                <SuccessAlert/>
            </View>
        </ScrollView>
    )
}