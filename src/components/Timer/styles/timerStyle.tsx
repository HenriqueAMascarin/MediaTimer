import { StyleSheet } from "react-native";
import { colorsStyle } from "../../Utils/colorsStyle";
export const heightContainer = 240;

export const timerStyle = StyleSheet.create({
    
    listsContainer:{
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: heightContainer + 10,
        gap: 10,
    },
    listContainer:{
        position: "relative",
        maxWidth: 70,
        height: heightContainer,
        justifyContent: "center",
    },
    listItem:{
        fontSize: 60,
        color: colorsStyle.principal.black,
    },
    listLineContainer:{
        position: "relative",
        height: heightContainer + 10,
        alignItems: "center",
        justifyContent: "center",
    },
    listLine:{
        width: 3,
        height: heightContainer + 10,
        backgroundColor: colorsStyle.principal.gray,
    },
    listLinePoints:{
        fontSize: 40,
        position: "absolute",
        left: -4,
        width: 10,
        fontWeight: "bold",
        opacity: 0,
    }
})