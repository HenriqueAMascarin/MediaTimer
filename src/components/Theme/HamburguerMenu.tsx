import { Text, TouchableOpacity, TouchableWithoutFeedback, View, useColorScheme } from "react-native";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { hamburguerStyles } from "./styles/hamburguerStyles";
import { useState } from "react";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import { changeTheme, themes } from "../Utils/Redux/features/stateTheme-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeLocalKey } from "../Utils/globalVars";

type themesItems = ({
    label: string;
    type: null;
    isActive: boolean;
} | {
    label: string;
    type: themes;
    isActive: boolean;
})[]

export default function HamburguerMenu() {
    const stateTheme = useAppSelector(({ stateTheme }) => stateTheme);
    const dispatch = useDispatch();

    const colorScheme = useColorScheme();

    const [configModal, changeConfigModal] = useState(false);

    function toggleModal() {
        changeConfigModal(!configModal);
    }

    const [typesTheme, changeTypesTheme] = useState<themesItems>([{ label: 'Gerenciado pelo sistema', type: null, isActive: false }, { label: 'Branco', type: 'light', isActive: false }, { label: 'Escuro', type: 'dark', isActive: false }]);

    function onTheme(themeElement: typeof typesTheme[0]) {
        let arrTheme = [...typesTheme];

        arrTheme.forEach((el) => {
            if (el != themeElement) {
                el.isActive = false;
            } else {
                el.isActive = true
            }
        });

        changeTypesTheme(arrTheme);

        dispatch(changeTheme(themeElement.type ?? colorScheme ?? 'light'));

        if (themeElement.type) {
            AsyncStorage.setItem(themeLocalKey, themeElement.type)
        } else {
            AsyncStorage.removeItem(themeLocalKey);
        }
    }

    return (
        <View style={hamburguerStyles.container}>
            <TouchableOpacity style={hamburguerStyles.hamburguerContainer} onPress={() => toggleModal()}>
                <View style={[hamburguerStyles.hamburguerPads, { backgroundColor: stateTheme.principal }]} />
                <View style={[hamburguerStyles.hamburguerPads, { backgroundColor: stateTheme.principal }]} />
                <View style={[hamburguerStyles.hamburguerPads, { backgroundColor: stateTheme.principal }]} />
            </TouchableOpacity>
            {configModal
                ?
                <View style={{ flex: 1, flexGrow: 1, zIndex: 10 }}>

                    <View style={[hamburguerStyles.modalContainer, {backgroundColor: stateTheme.background}]}>
                        <Text style={{ fontSize: 24, fontWeight: "500", marginBottom: 2, color: stateTheme.principal }}>Escolher tema</Text>
                        {typesTheme.map((theme, keyTheme) => {
                            return (
                                <TouchableOpacity onPress={() => onTheme(theme)} key={keyTheme} style={{ flexDirection: "row", alignItems: 'center', gap: 8 }}>
                                    <View style={{ borderWidth: 1, width: 18, borderRadius: 18, height: 18, position: 'relative', padding: 2, borderColor: stateTheme.principal }}>
                                        {theme.isActive ? <View style={{ backgroundColor: colorsStyle.principal.blue, position: "relative", flex: 1, borderRadius: 18 }} /> : null}
                                    </View>
                                    <Text style={{ fontSize: 18, color: stateTheme.principal }}>{theme.label}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <TouchableWithoutFeedback onPress={() => toggleModal()} >
                        <View style={[{ flex: 1, flexGrow: 1, backgroundColor: 'rgba(0, 0, 0, 0.58)' }]}></View>
                    </TouchableWithoutFeedback>
                </View>
                :
                null}
        </View>
    )
}