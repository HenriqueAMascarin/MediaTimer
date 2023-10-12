import { StyleSheet } from "react-native";
import { colorsStyle } from "../../Utils/colorsStyle";

export const infoStyles = StyleSheet.create({
  container: {
    height: 80,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  buttonsInfo: {
    backgroundColor: 'red',
    display: "flex",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    width: 90,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
