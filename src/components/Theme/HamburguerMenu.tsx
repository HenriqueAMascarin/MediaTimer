import { Animated, TouchableOpacity, TouchableWithoutFeedback, View, useColorScheme } from "react-native";
import { hamburguerStyles } from "./styles/hamburguerStyles";
import { useEffect, useRef, useState } from "react";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeLocalKey } from "../Utils/globalVars";
import { themesType, useTheme } from "../Utils/Context/ThemeContext";

type typeItemTheme = ({ label: string, type: themesType | null, isActive: boolean });

export default function HamburguerMenu({ initialOption }: { initialOption: themesType | null }) {
    const {data: dataTheme, change: changeTheme} = useTheme();

    const colorScheme = useColorScheme();

    const [configModal, changeConfigModal] = useState(false);

    const opacityModal = useRef(new Animated.Value(0)).current;

    function toggleModal() {
        changeConfigModal(!configModal);
    }

    useEffect(() => {
        Animated.timing(opacityModal, {
            toValue: configModal ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [configModal]);
    
    const [typesTheme, changeTypesTheme] = useState<typeItemTheme[]>([{ label: 'Gerenciado pelo sistema', type: null, isActive: false }, { label: 'Branco', type: 'light', isActive: false }, { label: 'Escuro', type: 'dark', isActive: false }]);

    function typesThemeDifference(differentElement: themesType | null) {
        let newTypesTheme = [...typesTheme];

        newTypesTheme.forEach((element) => {
            if (element.type != differentElement) {
                element.isActive = false;
            } else {
                element.isActive = true;
            }
        })

        return { newTypesTheme };
    }

    useEffect(() => {

        const { newTypesTheme } = typesThemeDifference(initialOption);
        
        changeTypesTheme(newTypesTheme);

    }, [initialOption])

    function onTheme(themeElement: typeItemTheme) {
        const { newTypesTheme } = typesThemeDifference(themeElement.type);

        changeTypesTheme(newTypesTheme);

        changeTheme(themeElement.type ?? colorScheme ?? 'light');

        if (themeElement.type) {
            AsyncStorage.setItem(themeLocalKey, themeElement.type);
        } else {
            AsyncStorage.removeItem(themeLocalKey);
        }
    }

    return (
        <View style={hamburguerStyles.container}>
            <TouchableOpacity style={hamburguerStyles.hamburguerContainer} onPress={() => toggleModal()}>
                <Animated.View style={[hamburguerStyles.hamburguerPads, { backgroundColor: dataTheme.animatedValues.principalColor }]} />
                <Animated.View style={[hamburguerStyles.hamburguerPads, { backgroundColor: dataTheme.animatedValues.principalColor }]} />
                <Animated.View style={[hamburguerStyles.hamburguerPads, { backgroundColor: dataTheme.animatedValues.principalColor }]} />
            </TouchableOpacity>
            {configModal
                ?
                <Animated.View style={{ flex: 1, flexGrow: 1, zIndex: 10, opacity: opacityModal }}>

                    <Animated.View style={[hamburguerStyles.modalContainer, { backgroundColor: dataTheme.animatedValues.backgroundColor }]}>
                        <Animated.Text style={{ fontSize: 24, fontWeight: "500", marginBottom: 2, color: dataTheme.animatedValues.principalColor }}>Escolher tema</Animated.Text>
                        {typesTheme.map((theme, keyTheme) => {
                            return (
                                <TouchableOpacity onPress={() => onTheme(theme)} key={keyTheme} style={{ flexDirection: "row", alignItems: 'center', gap: 8 }}>
                                    <Animated.View style={{ borderWidth: 1, width: 18, borderRadius: 18, height: 18, position: 'relative', padding: 2, borderColor: dataTheme.animatedValues.principalColor }}>
                                        {theme.isActive ? <View style={{ backgroundColor: colorsStyle.principal.blue, position: "relative", flex: 1, borderRadius: 18 }} /> : null}
                                    </Animated.View>
                                    <Animated.Text style={{ fontSize: 18, color: dataTheme.animatedValues.principalColor }}>{theme.label}</Animated.Text>
                                </TouchableOpacity>
                            )
                        })}
                    </Animated.View>
                    <TouchableWithoutFeedback onPress={() => toggleModal()} >
                        <View style={[{ flex: 1, flexGrow: 1, backgroundColor: 'rgba(0, 0, 0, 0.58)' }]}></View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                :
                null}
        </View>
    )
}