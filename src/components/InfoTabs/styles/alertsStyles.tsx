import { colorsStyle } from "@src/components/Utils/colorsStyle";
import { StyleSheet } from 'react-native';

export const alertsStyles = StyleSheet.create(
    {
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
            paddingHorizontal: 5,
            width: 200,
            minHeight: 50,
            gap: 2,
        },
        statusItem: {
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
        },
    }
)