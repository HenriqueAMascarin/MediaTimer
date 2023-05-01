import { StyleSheet } from "react-native";
import { colorsStyle } from "../../colorsStyle";
export const heightContainer = 240;

export const timerStyle = StyleSheet.create({
    
    listsContainer:{
        marginTop: 100,
        gap: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: heightContainer,
    },
    list:{
        maxWidth: 70,
        maxHeight: heightContainer,
    },
    listItem:{
        fontSize: 60,
        color: colorsStyle.principal.black,
    },
    listLine:{
        width: 3,
        height: heightContainer + 10,
        marginHorizontal: 20,
        backgroundColor: colorsStyle.principal.gray,
    },
})