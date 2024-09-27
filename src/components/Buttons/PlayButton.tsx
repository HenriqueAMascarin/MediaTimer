import { TouchableOpacity } from "react-native/";
import PlaySvg from "../../../assets/images/play.svg";

import { buttonsStyle } from "./styles/buttonsStyle";
import { colorsStyle } from "../Utils/colorsStyle";

import { useDispatch } from "react-redux";
import { changeIsPickingValue } from "../Utils/Redux/features/stateTimer-slice";

import { useTranslation } from "react-i18next";

export default function PlayButton() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton]} onPress={() => dispatch(changeIsPickingValue(true))} aria-label={t('buttonArias.play')}>
      <PlaySvg width={"35px"} height={"35px"} fill={colorsStyle.principal.white} />
    </TouchableOpacity>
  );
}
