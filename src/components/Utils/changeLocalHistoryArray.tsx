import { historyLocalKey } from "./globalVars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeHistoryArray, historyItem } from "./Redux/features/stateHistory-slice";
import { store } from "./Redux/store";

const dispatch = store.dispatch;

export async function changeLocalHistoryArray() {
    const jsonValue = await AsyncStorage.getItem(historyLocalKey);

    let historyValue: historyItem[] | null = null;
    
    if (jsonValue) historyValue = JSON.parse(jsonValue);

    if (historyValue != null) {
        dispatch(changeHistoryArray(historyValue));
    }
}