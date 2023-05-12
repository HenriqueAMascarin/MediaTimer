import { StyleSheet } from "react-native";
import { colorsStyle } from "../../colorsStyle";

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
        paddingLeft: 26,
        paddingRight: 20,
        paddingVertical: 18,
        borderRadius: 50,
        justifyContent: 'flex-end'
    },
    principalButton: {
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
    },
    containerOthersButtons:{
        position: "absolute",
        flexDirection: "row",
        gap: 70,
    }   
})

