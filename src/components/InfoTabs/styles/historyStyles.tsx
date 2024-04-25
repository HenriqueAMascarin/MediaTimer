import { colorsStyle } from "@src/components/Utils/colorsStyle"
import { StyleSheet } from "react-native";

export const historyStyle = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        gap: 20,
        paddingBottom: 15,
        paddingHorizontal: 15,
      },
    item: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colorsStyle.principal.gray,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 10,
        width: 220,
        height: 70,
        gap: 2,
    }, 
});