import { colorsStyle } from "@src/components/Utils/colorsStyle";
import { StyleSheet } from 'react-native';

export const alertsStyles = StyleSheet.create(
    {
        item: {
            display: "flex",
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: colorsStyle.principal.gray,
            shadowColor: "#000",
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 5,
            borderRadius: 14,
            paddingVertical: 6,
            paddingHorizontal: 20,
            width: 250,
            minHeight: 52,
            gap: 14,
        },
    }
)