import { StyleSheet } from "react-native";

export const stylesGeneral = StyleSheet.create({
    containerAd: {
        display: "flex",
        maxHeight: 60,
        height: 60,
        position: "relative",
        borderTopWidth: 1,
    },
    textAd: {
        alignSelf: "flex-end", 
        borderWidth: 1, 
        borderRadius: 30, 
        position: "absolute", 
        top: 5,
        right: 8,
        paddingHorizontal: 6,
        fontSize: 14,
        zIndex: 1,
        shadowColor: "#000",
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 1,
    },
})