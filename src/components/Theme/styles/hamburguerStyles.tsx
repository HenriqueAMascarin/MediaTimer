import { colorsStyle } from "@src/components/Utils/colorsStyle"
import { StyleSheet } from "react-native"

export const hamburguerStyles = StyleSheet.create(
    {
        container: {
            position: "absolute",
            flex: 1,
            flexGrow: 1,
            bottom: 0,
            top: 0,
            right: 0,
            left: 0,
        },
        hamburguerContainer: {
            alignContent: "center",
            gap: 6,
            position: "absolute",
            top: 15,
            right: 12,
            zIndex: 1
        },
        hamburguerPads: {
            backgroundColor: colorsStyle.principal.black,
            width: 35,
            height: 5,
            borderRadius: 5,
        },
        modalContainer: {
            backgroundColor: colorsStyle.principal.white,
            alignItems: 'flex-start',
            flexDirection: 'column',
            gap: 8,
            borderRadius: 25,
            height: 164,
            width: 280,
            position: 'absolute',
            zIndex: 2,
            top: 15,
            right: 12,
            paddingHorizontal: 22,
            justifyContent: 'center',
        },
        bannerIdContainer: {
            position: 'absolute',
            display: "flex",
            alignSelf: 'center',
            justifyContent: 'center',
            bottom: 130,
        },
    }
)
