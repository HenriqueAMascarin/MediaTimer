import CorrectSvg from "@assets/images/correct.svg";
import LoadingSvg from "@assets/images/loading.svg";
import { alertsStyles } from "../styles/alertsStyles";
import { Text, Animated, TouchableOpacity } from "react-native";
import WarningSvg from "@assets/images/warning.svg";
import { animatedModalsOpacity } from "@src/components/Utils/animatedModalsOpacity";
import { colorsStyle } from "@src/components/Utils/colorsStyle";
import { CustomAnimatedSvg, closeSvgXml } from "../../Utils/svgsXml";

type CloseButtonType = {
  clickFunction: Function,
  color?: string | Animated.AnimatedInterpolation<string | number>,
  customPos?: { top: number, right: number }
}

function createOpacity(){
  let opacityModal = new Animated.Value(0);

  opacityModal.setValue(0);
  animatedModalsOpacity({ isOpen: true, animatedOpacity: opacityModal });

  return opacityModal;
}

export function CloseButton({ clickFunction, color = colorsStyle.principal.black, customPos = { top: 6, right: 6 } }: CloseButtonType) {

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: customPos.top,
        right: customPos.right,
        height: 16,
        width: 16,
        elevation: 10,
        zIndex: 2,
      }}
      onPress={() => clickFunction()}
      aria-label="Botão para fechar o elemento"
    >
      <CustomAnimatedSvg xml={closeSvgXml} width={"16px"} height={"16px"} color={color} />
    </TouchableOpacity>
  )
}

export function SuccessAlert({ alertText, closeFunction }: { alertText?: string, closeFunction: Function }) {
  let opacityModal = createOpacity();

  return (
    <Animated.View style={[alertsStyles.item, { opacity: opacityModal }]}>
      <CloseButton clickFunction={closeFunction} />

      <CorrectSvg style={{ minWidth: 30 }} />

      <Text allowFontScaling={false}>{alertText ?? "Música encontrada"}</Text>
    </Animated.View>
  );
}

export function ErrorAlert({ alertText, closeFunction }: { alertText?: string | null, closeFunction: Function }) {
  const opacityModal = createOpacity();

  return (
    <Animated.View style={[alertsStyles.item, { opacity: opacityModal }]}>
      <CloseButton clickFunction={closeFunction} />

      <WarningSvg style={{ minWidth: 30 }} />

      <Text allowFontScaling={false}>{alertText ?? "Falha na busca"}</Text>
    </Animated.View>
  );
}

export function LoadingAlert({ alertText }: { alertText?: string }) {
  let opacityModal = createOpacity();

  let spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      delay: 1,
      useNativeDriver: false,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={[alertsStyles.item, { opacity: opacityModal }]}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <LoadingSvg style={{ minWidth: 30 }} />
      </Animated.View>

      <Text allowFontScaling={false}>{alertText ?? "Buscando a música"}</Text>
    </Animated.View>
  );
}
