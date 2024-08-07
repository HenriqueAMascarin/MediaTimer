import { Animated, TouchableOpacity, TouchableWithoutFeedback, View, useColorScheme, Text, Linking } from "react-native";
import { hamburguerStyles } from "./styles/hamburguerStyles";
import { useEffect, useRef, useState } from "react";
import { colorsStyle } from "../Utils/colorsStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeLocalKey } from "../Utils/globalVars";
import { themesType, useTheme } from "../Utils/Context/ThemeContext";
import { animatedModalsOpacity } from "../Utils/animatedModalsOpacity";
import Logo from '@assets/images/logo.svg';
import { CloseButton } from "../InfoTabs/Alerts/Components";

type typeItemTheme = ({ label: string, type: themesType | null, isActive: boolean });

export default function HamburguerMenu({ initialOption }: { initialOption: themesType | null }) {
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

    function openPortfolio() {
        Linking.openURL('https://henriqueamascarin.vercel.app');
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
                        <Animated.Text style={{ fontSize: 24, fontWeight: "500", marginBottom: 2, color: dataTheme.animatedValues.principalColor }} allowFontScaling={false}>Escolher tema</Animated.Text>
                        {typesTheme.map((theme, keyTheme) => {
                            return (
                                <TouchableOpacity onPress={() => onTheme(theme)} key={keyTheme} style={{ flexDirection: "row", alignItems: 'center', gap: 8 }} aria-label={`Botão para escolher o tema ${theme.label}`}>
                                    <Animated.View style={{ borderWidth: 1, width: 18, borderRadius: 18, height: 18, position: 'relative', padding: 2, borderColor: dataTheme.animatedValues.principalColor }} aria-label={`Tema ${theme.label} ${!theme.isActive ? 'não' : ''} está ativo`}>
                                        {theme.isActive && <View style={{ backgroundColor: colorsStyle.principal.blue, position: "relative", flex: 1, borderRadius: 18 }} />}
                                    </Animated.View>
                                    <Animated.Text style={{ fontSize: 18, color: dataTheme.animatedValues.principalColor }} allowFontScaling={false}>{theme.label}</Animated.Text>
                                </TouchableOpacity>
                            )
                        })}
                    </Animated.View>

                    <Animated.View style={{ opacity: opacityModal, zIndex: 10, bottom: 0, position: 'absolute', alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => openPortfolio()} style={{ display: 'flex', marginBottom: 30, flexDirection: "row", alignItems: 'center', gap: 14, justifyContent: 'center' }} aria-label="Botão para ver o portfólio do Henrique de Albuquerque Mascarin">
                            <Logo width={'68px'} height={'68px'} aria-label="Ícone em formato de H"/>
                            <Text style={{ maxWidth: 110, color: colorsStyle.principal.white, fontWeight: '600', fontSize: 26 }} allowFontScaling={false}>Henrique Mascarin</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <TouchableWithoutFeedback onPress={() => toggleModal()} >
                        <View style={[{ flex: 1, flexGrow: 1, backgroundColor: 'rgba(0, 0, 0, 0.58)' }]}></View>
                    </TouchableWithoutFeedback>

                </Animated.View>
            }
        </View>
    )
}