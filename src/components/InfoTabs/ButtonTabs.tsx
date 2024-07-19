import { View, TouchableOpacity, Animated } from "react-native";
import { infoStyles } from "./styles/infoStyles";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import { changeIsSelection, changeIsSelectionYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { changeMusic } from "../Utils/buttons";
import { useTheme } from "../Utils/Context/ThemeContext";
import React, { useEffect, useRef, useState } from "react";
import { audioFileSvgXml, CustomAnimatedSvg, fireSvgXml, forestSvgXml, nothingSvgXml, wavesSvgXml, youtubeSvgXml } from "../Utils/svgsXml";
import { animatedModalsOpacity } from "../Utils/animatedModalsOpacity";
import { PRODUCTION } from "../Utils/globalVars";
import * as DocumentPicker from 'expo-document-picker';
import { newHistoryArray } from "../Utils/historyArrayFunctions";
import { historyItem } from "../Utils/Redux/features/stateHistory-slice";
import { ErrorAlert, LoadingAlert, SuccessAlert } from "./Alerts/Components";

export default function ButtonTabs() {

  const dispatch = useDispatch();
  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
  const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);

  const { dataTheme } = useTheme();

  const [status, changeStatus] = useState({ searching: false, success: false, error: false });

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

  function changeForest() { changeMusic(stateMusic.pressBtn, { forest: true }, require('@assets/sounds/forest.wav')) };

  function resetAll() {
    changeMusic(stateMusic.pressBtn, { reset: true });
  }

  function changeAudioFile() {
    changeStatus({ error: false, searching: true, success: false });

    setTimeout(() => {
      DocumentPicker.getDocumentAsync({ type: ['audio/*'], copyToCacheDirectory: false, multiple: false }).then(async (data) => {

        if (data.type == 'success') {
          
          const itemFile: historyItem = { isSelected: false, nameMusic: data.name, uri: data.uri }

          await newHistoryArray(stateHistory.historyItems, itemFile);

          await changeMusic(stateMusic.pressBtn, { audioFile: true }, data.uri);

          changeStatus({ error: false, searching: false, success: true });

          

        } else {
          changeStatus({ error: true, searching: false, success: false });
        }

      }
      );
    }, 400);
  };

  const onCloseAlerts = () => {
    changeStatus({ error: false, searching: false, success: false });
    dispatch(changeIsSelection(false));
  }

  const ButtonsGroup = [{ svgXmlIcon: nothingSvgXml, onPressFunction: resetAll, stateActive: stateMusic.pressBtn.reset, label: 'Nenhum' },
  { svgXmlIcon: forestSvgXml, onPressFunction: changeForest, stateActive: stateMusic.pressBtn.forest, label: 'Floresta' },
  { svgXmlIcon: wavesSvgXml, onPressFunction: changeWaves, stateActive: stateMusic.pressBtn.waves, label: 'Ondas' },
  { svgXmlIcon: fireSvgXml, onPressFunction: changeFire, stateActive: stateMusic.pressBtn.fire, label: 'Fogueira' },
  { svgXmlIcon: audioFileSvgXml, onPressFunction: changeAudioFile, stateActive: stateMusic.pressBtn.audioFile, label: 'Arquivo' },
  ]

  // if (!PRODUCTION) {
  //   ButtonsGroup.push({ svgXmlIcon: youtubeSvgXml, onPressFunction: changeYoutube, stateActive: stateMusic.pressBtn.youtube, label: 'Youtube' });
  // }

  return (
    <>
      <>
        {status.searching && <LoadingAlert alertText="Carregando a música" />}
        {status.error && <ErrorAlert alertText="Falha no carregamento" closeFunction={onCloseAlerts} />}
        {status.success && <SuccessAlert alertText="Sucesso no carregamento" closeFunction={onCloseAlerts} />}
      </>

      {(!status.error && !status.searching && !status.success) &&
        <Animated.ScrollView horizontal style={{ opacity: opacityModal }}>
          <View style={infoStyles.container}>
            {ButtonsGroup.map((icon, keyItem) => {
              return (
                <TouchableOpacity style={infoStyles.buttonsInfo} onPress={icon.onPressFunction} key={keyItem}>
                  <CustomAnimatedSvg xml={icon.svgXmlIcon} color={icon.stateActive ? colorsStyle.principal.blue : dataTheme.animatedValues.principalColor} style={infoStyles.buttonsInfo} />

                  <Animated.Text style={{ color: icon.stateActive ? colorsStyle.principal.blue : dataTheme.animatedValues.principalColor }} allowFontScaling={false}>{icon.label}</Animated.Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </Animated.ScrollView>
      }



    </>
  );
}
