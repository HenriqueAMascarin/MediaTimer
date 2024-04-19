import { View, Text, TouchableOpacity, ScrollView, Animated, StyleProp, ViewStyle } from "react-native";
import { infoStyles } from "./styles/infoStyles";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import { changeIsSelection, changeIsSelectionYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { changeMusic } from "../Utils/buttons";
import { useTheme } from "../Utils/Context/ThemeContext";
import React from "react";
import { SvgXml } from "react-native-svg";
import { fireSvgXml, forestSvgXml, nothingSvgXml, wavesSvgXml, youtubeSvgXml } from "./svgsXml";


interface Props {
  color: string;
  style: StyleProp<ViewStyle>,
  xml: string
}

class createSvg extends React.Component<Props, {}> {
  render() {
    return (
      <SvgXml xml={this.props.xml} width="45px" height="45px" fill={this.props.color} style={this.props.style} />
    )
  }
}

export default function ButtonTabs() {

  const dispatch = useDispatch();
  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
  const { data: dataTheme } = useTheme();

  function changeYoutube() {
    dispatch(changeIsSelection(false));
    dispatch(changeIsSelectionYoutube(true));
  };

  const IconsComponent = Animated.createAnimatedComponent(createSvg);

  function changeFire() { changeMusic(stateMusic.pressBtn, { fire: true }, require('@assets/sounds/fire.wav')) };

  function changeWaves() { changeMusic(stateMusic.pressBtn, { waves: true }, require('@assets/sounds/waves.wav')) };

  function changeForest() { changeMusic(stateMusic.pressBtn, { forest: true }, require('@assets/sounds/nature.wav')) };

  function resetAll() {
    changeMusic(stateMusic.pressBtn, { reset: true });
  }

  const ButtonsGroup = [{ svgXmlIcon: nothingSvgXml, onPressFunction: resetAll, stateActive: stateMusic.pressBtn.reset, label: 'Nenhum' },
  { svgXmlIcon: forestSvgXml, onPressFunction: changeForest, stateActive: stateMusic.pressBtn.forest, label: 'Floresta' },
  { svgXmlIcon: wavesSvgXml, onPressFunction: changeWaves, stateActive: stateMusic.pressBtn.waves, label: 'Ondas' },
  { svgXmlIcon: fireSvgXml, onPressFunction: changeFire, stateActive: stateMusic.pressBtn.fire, label: 'Fogueira' },
  { svgXmlIcon: youtubeSvgXml, onPressFunction: changeYoutube, stateActive: stateMusic.pressBtn.youtube, label: 'Youtube' },
  ]

  return (
    <ScrollView horizontal>
      <View style={infoStyles.container}>
        {ButtonsGroup.map((icon, keyItem) => {
          return (
            <TouchableOpacity style={infoStyles.buttonsInfo} onPress={icon.onPressFunction} key={keyItem}>
              <IconsComponent xml={icon.svgXmlIcon} color={icon.stateActive ? colorsStyle.principal.blue : dataTheme.animatedValues.principalColor} style={infoStyles.buttonsInfo} />

              <Animated.Text style={{ color: icon.stateActive ? colorsStyle.principal.blue : dataTheme.animatedValues.principalColor }}>{icon.label}</Animated.Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  );
}
