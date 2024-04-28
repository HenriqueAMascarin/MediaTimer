import { StyleSheet } from "react-native";
import { colorsStyle } from "../../Utils/colorsStyle";

export let heightItem = 70;
export let heightContainer = heightItem * 3;

let fontSizeItem = heightItem - 10;

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
        height: heightContainer, //height is only heightContainer because if you put + 10 they not gonna be in the center with the number tables.
        justifyContent: "center",
    },
    listItem:{
        fontSize: fontSizeItem,
        height: heightItem, 
        color: colorsStyle.principal.black,
    },
    listLineContainer:{
        position: "relative",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    listLine:{
        width: 3,
        position: "absolute",
        height: "100%",
        backgroundColor: colorsStyle.principal.gray,
    },
    listLinePoints:{
        fontSize: 40,
        position: "relative",
        fontWeight: "bold",
        opacity: 0,
    },
    pauseText:{
        fontSize: 30,
        top: 50,
        color: colorsStyle.principal.blackGray,
        position: "absolute",
        opacity: 0,
    },
    totalTimeText:{
        fontSize: 24,
        bottom: 40,
        color: colorsStyle.principal.blackGray,
        position: "absolute",
        opacity: 0,
    },
    timerAlertSvg:{
        bottom: 2,
        color: colorsStyle.principal.blackGray,
        position: "absolute",
        opacity: 0,
    }
})