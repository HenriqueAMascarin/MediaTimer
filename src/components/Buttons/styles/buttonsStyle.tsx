import { StyleSheet } from "react-native";
import { colorsStyle } from "../../Utils/colorsStyle";

export const buttonsStyle = StyleSheet.create({
    container: {
        marginBottom: "auto",
        marginTop: 130,
        position: "relative",
        alignItems:"center",
        justifyContent: "center"
    },
    buttons: {
        backgroundColor: colorsStyle.principal.gray,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 50,
        justifyContent: 'flex-end'
    },
    principalButton: {
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
    },
    containerInitialButtons:{
        position: "absolute",
        flexDirection: "row",
        gap: 70,
        zIndex: 1,
    },
    containerPlayStateButtons:{
        position: "absolute",
        flexDirection: "row",
        gap: 70,
    },   
    playStateButtons:{
        backgroundColor: colorsStyle.principal.blue
    },
})

