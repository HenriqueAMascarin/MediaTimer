import { StyleSheet } from "react-native";
import { colorsStyle } from "@src/components/Utils/colorsStyle";

export const youtubeStyle = StyleSheet.create({
    item: {
        display: "flex",
        backgroundColor: colorsStyle.principal.gray,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 10,
        width: 280,
        minHeight: 50,
    }, 
    searchItem: {
        gap: 4,
        position: "relative"
    },
    statusItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },
})