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
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 14,
        width: 260,
        gap: 4
    }
})