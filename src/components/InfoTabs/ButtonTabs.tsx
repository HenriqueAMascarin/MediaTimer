import { View, TouchableOpacity, Animated } from "react-native";
import { infoStyles } from "./styles/infoStyles";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import { changeIsSelection, changeIsSelectionYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { changeMusic } from "../Utils/buttons";
import { useTheme } from "../Utils/Context/ThemeContext";
import React, { useEffect, useRef } from "react";
import { CustomAnimatedSvg, fireSvgXml, forestSvgXml, nothingSvgXml, wavesSvgXml, youtubeSvgXml } from "../Utils/svgsXml";
import { animatedModalsOpacity } from "../Utils/animatedModalsOpacity";


export default function ButtonTabs() {

  const dispatch = useDispatch();
  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
  const { dataTheme } = useTheme();

  function changeYoutube() {
    dispatch(changeIsSelection(false));
    dispatch(changeIsSelectionYoutube(true));
  };

  let opacityModal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedModalsOpacity({ isOpen: true, animatedOpacity: opacityModal });
  }, []);

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
    <Animated.ScrollView horizontal style={{ opacity: opacityModal }}>
      <View style={infoStyles.container}>
        {ButtonsGroup.map((icon, keyItem) => {
          return (
            <TouchableOpacity style={infoStyles.buttonsInfo} onPress={icon.onPressFunction} key={keyItem}>
              <CustomAnimatedSvg xml={icon.svgXmlIcon} color={icon.stateActive ? colorsStyle.principal.blue : dataTheme.animatedValues.principalColor} style={infoStyles.buttonsInfo} />

              <Animated.Text style={{ color: icon.stateActive ? colorsStyle.principal.blue : dataTheme.animatedValues.principalColor }}>{icon.label}</Animated.Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </Animated.ScrollView>
  );
}
