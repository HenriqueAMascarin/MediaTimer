import { Animated, TouchableOpacity, TouchableWithoutFeedback, View, useColorScheme } from "react-native";
import { hamburguerStyles } from "./styles/hamburguerStyles";
import { useEffect, useRef, useState } from "react";
import { colorsStyle } from "../Utils/colorsStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeLocalKey } from "../Utils/globalVars";
import { themesType, useTheme } from "../Utils/Context/ThemeContext";
import { animatedModalsOpacity } from "../Utils/animatedModalsOpacity";
import { CloseButton } from "../InfoTabs/Alerts/Components";
import TextAnimated from "../Texts/TextAnimated";
import { useTranslation } from "react-i18next";

type typeItemTheme = ({ label: string, type: themesType | null, isActive: boolean });

export default function HamburguerMenu({ initialOption }: { initialOption: themesType | null }) {
    const { t } = useTranslation();

    const { dataTheme, changeTheme } = useTheme();

    const colorScheme = useColorScheme();

    const [configModal, changeConfigModal] = useState(false);

    let opacityModal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animatedModalsOpacity({ isOpen: configModal, animatedOpacity: opacityModal });
    }, [configModal]);

    function toggleModal() {
        changeConfigModal(!configModal);
    }

    const [typesTheme, changeTypesTheme] = useState<typeItemTheme[]>([{ label: t('theme.options.managedBySystem'), type: null, isActive: false }, { label: t('theme.options.white'), type: 'light', isActive: false }, { label:  t('theme.options.dark'), type: 'dark', isActive: false }]);

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
            <TouchableOpacity style={hamburguerStyles.hamburguerContainer} onPress={() => toggleModal()} aria-label="Botão para abrir as configurações de tema">
                <Animated.View style={[hamburguerStyles.hamburguerPads, { backgroundColor: dataTheme.animatedValues.principalColor }]} />
                <Animated.View style={[hamburguerStyles.hamburguerPads, { backgroundColor: dataTheme.animatedValues.principalColor }]} />
                <Animated.View style={[hamburguerStyles.hamburguerPads, { backgroundColor: dataTheme.animatedValues.principalColor }]} />
            </TouchableOpacity>
            {configModal
                &&
                <Animated.View style={{ flex: 1, flexGrow: 1, zIndex: 10, opacity: opacityModal }}>

                    <Animated.View style={[hamburguerStyles.modalContainer, { backgroundColor: dataTheme.animatedValues.backgroundColor }]} aria-label={"Modal para escolher tema"}>
                        <CloseButton clickFunction={() => toggleModal()} color={dataTheme.animatedValues.principalColor} customPos={{ top: 12, right: 12 }} />
                        <TextAnimated style={{ fontSize: 24, fontFamily: 'Roboto_500Medium', marginBottom: 2, color: dataTheme.animatedValues.principalColor }}>{t('theme.selectTheme')}</TextAnimated>
                        {typesTheme.map((theme, keyTheme) => {
                            return (
                                <TouchableOpacity onPress={() => onTheme(theme)} key={keyTheme} style={{ flexDirection: "row", alignItems: 'center', gap: 8 }} aria-label={`Botão para escolher o tema ${theme.label}`}>
                                    <Animated.View style={{ borderWidth: 1, width: 18, borderRadius: 18, height: 18, position: 'relative', padding: 2, borderColor: dataTheme.animatedValues.principalColor }} aria-label={`Tema ${theme.label} ${!theme.isActive ? 'não' : ''} está ativo`}>
                                        {theme.isActive && <View style={{ backgroundColor: colorsStyle.principal.blue, position: "relative", flex: 1, borderRadius: 18 }} />}
                                    </Animated.View>
                                    <TextAnimated style={{ fontSize: 18, color: dataTheme.animatedValues.principalColor }}>{theme.label}</TextAnimated>
                                </TouchableOpacity>
                            )
                        })}
                    </Animated.View>

                    <TouchableWithoutFeedback onPress={() => toggleModal()} >
                        <View style={[{ flex: 1, flexGrow: 1, backgroundColor: 'rgba(0, 0, 0, 0.58)' }]}></View>
                    </TouchableWithoutFeedback>

                </Animated.View>
            }
        </View>
    )
}