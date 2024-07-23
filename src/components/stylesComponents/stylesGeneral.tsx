import { StyleSheet } from "react-native";

export const stylesGeneral = StyleSheet.create({
    containerAd: {
        display: "flex",
        maxHeight: 60,
        height: 60,
        position: "relative",
        justifyContent: 'center',
        borderWidth: 1,
        borderBottomWidth: 0
    },
    textAd: {
        alignSelf: "center", 
        position: 'absolute',
        fontSize: 16,
    },
})