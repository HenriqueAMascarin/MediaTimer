import { PixelRatio, StyleSheet } from "react-native";
import { colorsStyle } from "../../Utils/colorsStyle";

export const fontScaleMobile = PixelRatio.getFontScale();
export let heightContainer = 240 * fontScaleMobile;

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
        height: "100%",
        justifyContent: "center",
    },
    listItem:{
        fontSize: 60,
        color: colorsStyle.principal.black,
    },
    listLineContainer:{
        position: "relative",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    listLine:{
        width: 3 * fontScaleMobile,
        height: "100%",
        backgroundColor: colorsStyle.principal.gray,
    },
    listLinePoints:{
        fontSize: 40,
        position: "absolute",
        left: -4,
        width: 10 * fontScaleMobile,
        fontWeight: "bold",
        opacity: 0,
    }
})