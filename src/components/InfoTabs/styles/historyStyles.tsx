import { colorsStyle } from "@src/components/Utils/colorsStyle";
import { StyleSheet } from "react-native";

export const widthHistoryItem = 220;

export const historyStyle = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    flexDirection: "row",
    gap: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colorsStyle.principal.gray,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 8,
    width: widthHistoryItem,
    height: 70,
    gap: 2,
  },
  removeHistoryBtn: {
    backgroundColor: colorsStyle.principal.red,
    borderRadius: 7,
    gap: 5,
    marginTop: 3,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
  },
  textRemoveHistory:{
    color: colorsStyle.principal.white
  }
});
