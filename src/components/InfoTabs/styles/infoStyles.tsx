import { StyleSheet } from "react-native";
import { colorsStyle } from "../../Utils/colorsStyle";

export const infoStyles = StyleSheet.create({
  container: {
    height: 80,
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 20
  },
  buttonsInfo: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});
