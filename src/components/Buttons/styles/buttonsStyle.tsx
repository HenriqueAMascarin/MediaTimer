import { StyleSheet } from "react-native";
import { colorsStyle } from "../../Utils/colorsStyle";

export const buttonsStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 70,
        gap: 10,
    },
    buttonsContainer: {
        marginBottom: "auto",
        marginTop: 60,
        position: "relative",
        alignItems: "center",
        justifyContent: "center"
    },
    buttons: {
        backgroundColor: colorsStyle.principal.gray,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
    },
    principalButton: {
        width: 68,
        height: 68,
        backgroundColor: colorsStyle.principal.blue
    },
    containerInitialButtons: {
        position: "absolute",
        flexDirection: "row",
        gap: 50,
        zIndex: 1,
    },
    containerPlayStateButtons: {
        position: "absolute",
        flexDirection: "row",
        gap: 70,
    },
    playStateButtons: {
        backgroundColor: colorsStyle.principal.blue,
    },
    containerAd: {
        display: "flex",
        maxHeight: 60,
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

