import { createContext, useContext, useEffect, useState } from "react";
import { Animated, Easing, useColorScheme } from "react-native";
import { colorsStyle } from "../colorsStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeLocalKey } from "../globalVars";

export type themesType = "light" | "dark";

const inputRange = [0, 1];

const animatedValues = {
    backgroundAnimated: new Animated.Value(0),
    principalAnimated: new Animated.Value(0),
    secondaryAnimated: new Animated.Value(0),
};

const ThemeContext = createContext<{
    data: {
        animatedValues: {
            backgroundColor: Animated.AnimatedInterpolation<string | number>;
            principalColor: Animated.AnimatedInterpolation<string | number>;
            secondaryColor: Animated.AnimatedInterpolation<string | number>;
        },
        selectedOption: null | themesType
    }, change: React.Dispatch<React.SetStateAction<themesType>>
}>({
    data: {
        animatedValues: {
            backgroundColor: animatedValues.backgroundAnimated.interpolate({
                inputRange,
                easing: Easing.inOut(Easing.ease),
                outputRange: [
                    colorsStyle.lightTheme.background,
                    colorsStyle.darkTheme.background,
                ],
            }),
            principalColor: animatedValues.principalAnimated.interpolate({
                inputRange,
                easing: Easing.inOut(Easing.ease),
                outputRange: [
                    colorsStyle.lightTheme.principal,
                    colorsStyle.darkTheme.principal,
                ],
            }),
            secondaryColor: animatedValues.secondaryAnimated.interpolate({
                inputRange,
                easing: Easing.inOut(Easing.ease),
                outputRange: [
                    colorsStyle.lightTheme.secondary,
                    colorsStyle.darkTheme.secondary,
                ],
            })
        },
        selectedOption: null
    }, change: useState
});

type items = {
    children?: JSX.Element | JSX.Element[];
}

export default function ThemeProvider({ children }: items) {


    const [themeType, changeThemeType] = useState<themesType>('light');

    const colorScheme = useColorScheme();

    const [themeOption, changeThemeOption] = useState<themesType | null>(null);

    const currentTheme = async () => {
        let localTheme = await AsyncStorage.getItem(themeLocalKey);
        let theme = colorScheme || "light";
        let newThemeOption: typeof themeOption = null;

        if (localTheme == 'dark' || localTheme == 'light') {
            theme = localTheme;
            newThemeOption = localTheme;
        }

        return { theme, newThemeOption };
    };

    useEffect(() => {
        currentTheme().then(({ theme, newThemeOption }) => {
            changeThemeOption(newThemeOption);
            changeThemeType(theme);
        })
    }, [colorScheme, [], themeType])

    useEffect(() => {
        Animated.parallel([
            Animated.timing(animatedValues.backgroundAnimated, {
                toValue: themeType == "dark" ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animatedValues.principalAnimated, {
                toValue: themeType == "dark" ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animatedValues.secondaryAnimated, {
                toValue: themeType == "dark" ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
    }, [themeType]);

    const [themes, changeThemes] = useState({
        backgroundColor: animatedValues.backgroundAnimated.interpolate({
            inputRange,
            easing: Easing.inOut(Easing.ease),
            outputRange: [
                colorsStyle.lightTheme.background,
                colorsStyle.darkTheme.background,
            ],
        }),
        principalColor: animatedValues.principalAnimated.interpolate({
            inputRange,
            easing: Easing.inOut(Easing.ease),
            outputRange: [
                colorsStyle.lightTheme.principal,
                colorsStyle.darkTheme.principal,
            ],
        }),
        secondaryColor: animatedValues.secondaryAnimated.interpolate({
            inputRange,
            easing: Easing.inOut(Easing.ease),
            outputRange: [
                colorsStyle.lightTheme.secondary,
                colorsStyle.darkTheme.secondary,
            ],
        })
    })


    return (
        <ThemeContext.Provider
            value={{
                data: {animatedValues: themes, selectedOption: themeOption},
                change: changeThemeType,
            }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    const { data, change } = context;
    return { data, change };
}