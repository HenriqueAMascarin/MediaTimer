import { StyleSheet } from "react-native";
import { colorsStyle } from "../../colorsStyle";
export const heightContainer = 240;

export const timerStyle = StyleSheet.create({
    
    listsContainer:{
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: heightContainer + 10,
        position: "relative",
        gap: 10,
    },
    list:{
        maxWidth: 70,
        height: heightContainer,
    },
    listItem:{
        fontSize: 60,
        color: colorsStyle.principal.black,
    },
    listLine:{
        width: 3,
        height: heightContainer + 10,
        backgroundColor: colorsStyle.principal.gray,
    },
})