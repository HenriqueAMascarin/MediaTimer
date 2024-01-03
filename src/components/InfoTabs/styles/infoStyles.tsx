import { StyleSheet } from "react-native";

export const infoStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 20,
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
