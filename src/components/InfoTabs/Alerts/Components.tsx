import CorrectSvg from "@assets/images/correct.svg";
import LoadingSvg from "@assets/images/loading.svg";
import { alertsStyles } from "../styles/alertsStyles";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import CloseSvg from "@assets/images/close.svg";
import WarningSvg from "@assets/images/warning.svg";

export function CloseButton ({clickFunction}: {clickFunction: Function}){
    return(
        <TouchableOpacity
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          height: 16,
          width: 16,
          elevation: 10,
          zIndex: 2,
        }}
        onPress={() => clickFunction()}
      >
        <CloseSvg width={"16px"} height={"16px"} />
    </TouchableOpacity>
    )
}

export function SuccessAlert({ alertText, closeFunction }: { alertText?: string, closeFunction: Function }) {
  return (
    <View style={[alertsStyles.item]}>
    <CloseButton clickFunction={closeFunction}/>

      <CorrectSvg style={{minWidth: 30}}/>

      <Text>{alertText ?? "Música encontrada"}</Text>
    </View>
  );
}

export function ErrorAlert({ alertText, closeFunction }: { alertText?: string, closeFunction: Function }) {
    return (
      <View style={[alertsStyles.item]}>
        <CloseButton clickFunction={closeFunction}/>
  
        <WarningSvg style={{minWidth: 30}}/>
  
        <Text>{alertText ?? "Falha na busca"}</Text>
      </View>
    );
  }

export function LoadingAlert({ alertText }: { alertText?: string }) {
  let spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[alertsStyles.item]}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <LoadingSvg style={{minWidth: 30}}/>
      </Animated.View>

      <Text>{alertText ?? "Buscando a música"}</Text>
    </View>
  );
}
