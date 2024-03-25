import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useEffect } from 'react';
import { infoStyles } from "./styles/infoStyles";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import ForestSvg from "../../../assets/images/forest.svg";
import NothingSvg from "../../../assets/images/nothing.svg";
import WavesSvg from "../../../assets/images/waves.svg";
import FireSvg from "../../../assets/images/fire.svg";
import YoutubeSvg from "../../../assets/images/youtube.svg";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import { changeIsSelection, changeIsSelectionYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { changeMusic } from "../Utils/buttons";

export default function ButtonTabs() {

  const dispatch = useDispatch();
  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);
  const stateTheme = useAppSelector(({ stateTheme }) => stateTheme);


  function changeYoutube() {
    dispatch(changeIsSelection(false));
    dispatch(changeIsSelectionYoutube(true));
  };

  function changeFire() { changeMusic(stateMusic.pressBtn, { fire: true }, require('@assets/sounds/fire.wav')) };

  function changeWaves() { changeMusic(stateMusic.pressBtn, { waves: true }, require('@assets/sounds/waves.wav')) };

  function changeForest() { changeMusic(stateMusic.pressBtn, { forest: true }, require('@assets/sounds/nature.wav')) };

  function resetAll() {
    changeMusic(stateMusic.pressBtn, { reset: true });
  }



  return (
    <ScrollView horizontal>
      <View style={infoStyles.container}>
        <TouchableOpacity style={infoStyles.buttonsInfo} onPress={resetAll}>
          <NothingSvg width="45px" height="45px" fill={stateMusic.pressBtn.reset ? colorsStyle.principal.blue : stateTheme.principal} />
          <Text style={{ color: stateMusic.pressBtn.reset ? colorsStyle.principal.blue : stateTheme.principal }}>Nenhum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={infoStyles.buttonsInfo} onPress={changeForest}>
          <ForestSvg width="45px" height="45px" fill={stateMusic.pressBtn.forest ? colorsStyle.principal.blue : stateTheme.principal} />
          <Text style={{ color: stateMusic.pressBtn.forest ? colorsStyle.principal.blue : stateTheme.principal }}>Floresta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={infoStyles.buttonsInfo} onPress={changeWaves}>
          <WavesSvg width="45px" height="45px" fill={stateMusic.pressBtn.waves ? colorsStyle.principal.blue : stateTheme.principal} />
          <Text style={{ color: stateMusic.pressBtn.waves ? colorsStyle.principal.blue : stateTheme.principal }}>Ondas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={infoStyles.buttonsInfo} onPress={changeFire}>
          <FireSvg width="45px" height="45px" fill={stateMusic.pressBtn.fire ? colorsStyle.principal.blue : stateTheme.principal} />
          <Text style={{ color: stateMusic.pressBtn.fire ? colorsStyle.principal.blue : stateTheme.principal }}>Fogueira</Text>
        </TouchableOpacity>

        <TouchableOpacity style={infoStyles.buttonsInfo} onPress={changeYoutube}>
          <YoutubeSvg width="45px" height="45px" fill={stateMusic.pressBtn.youtube ? colorsStyle.principal.blue : stateTheme.principal} />
          <Text style={{ color: stateMusic.pressBtn.youtube ? colorsStyle.principal.blue : stateTheme.principal }}>Youtube</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
