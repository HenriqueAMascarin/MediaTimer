import { historyLocalKey } from "./globalVars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeHistoryArray, historyItem } from "./Redux/features/stateHistory-slice";
import { store } from "./Redux/store";

const dispatch = store.dispatch;

export async function newHistoryArray(historyItems: historyItem[], item: historyItem) {
    let oldHistoryArray = [...historyItems];

    for (let key = 0; key < oldHistoryArray.length; key++) {
        oldHistoryArray[key] = { ...oldHistoryArray[key], isSelected: false };

        if (item?.idMusic ? item?.idMusic == oldHistoryArray[key]?.idMusic : item?.uri == oldHistoryArray[key]?.uri) {
            oldHistoryArray.splice(key, 1);
        }
    }

    if (oldHistoryArray.length >= 10) {
        oldHistoryArray.pop();
    };

    const newArrItems = [item, ...oldHistoryArray];

    const jsonValue = JSON.stringify(newArrItems);

    await AsyncStorage.setItem(historyLocalKey, jsonValue);

    dispatch(changeHistoryArray(newArrItems));

}

export async function changeLocalHistoryArray() {
    const jsonValue = await AsyncStorage.getItem(historyLocalKey);

    let historyValue: historyItem[] | null = null;

    if (jsonValue) historyValue = JSON.parse(jsonValue);

    if (historyValue != null) {
        dispatch(changeHistoryArray(historyValue));
    }
}