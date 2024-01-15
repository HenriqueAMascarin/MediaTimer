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
import { changePressBtn, changeMusicLink, changeIsSelection, changeIsSelectionYoutube } from "../Utils/Redux/features/statesMusic-slice";
import { AVPlaybackSource } from "expo-av";

export default function ButtonTabs() {

  const dispatch = useDispatch();
  const data = useAppSelector((state) => state);

  useEffect(() => {
    if (data.stateMusic.pressBtn.youtube) {
      changeMusic({ youtube: true }, null);
    }
  }, [data.stateMusic.pressBtn.youtube])

  function changeYoutube() {
    dispatch(changeIsSelection(false));
    dispatch(changeIsSelectionYoutube(true));
  };

  function changeFire() { changeMusic({ fire: true }, require('@assets/sounds/fire.wav')) };

  function changeWaves() { changeMusic({ waves: true }, require('@assets/sounds/waves.wav')) };

  function changeForest() { changeMusic({ forest: true }, require('@assets/sounds/nature.wav')) };

  function resetAll() {
    changeMusic({ reset: true }, null);
  }

  function changeMusic(changeBtn: {} | null, musicLink: AVPlaybackSource | string | null) {

    let newBtnsObj = { ...data.stateMusic.pressBtn };

    for (let key in data.stateMusic.pressBtn) {
      newBtnsObj[key] = false;
    }

    newBtnsObj = { ...newBtnsObj, ...changeBtn };

    dispatch(changePressBtn(newBtnsObj));

    dispatch(changeMusicLink(musicLink))

  }

  return (
    <ScrollView horizontal>
      <View style={infoStyles.container}>
        <TouchableOpacity style={infoStyles.buttonsInfo} onPress={resetAll}>
          <NothingSvg width="45px" height="45px" fill={data.stateMusic.pressBtn.reset ? colorsStyle.principal.blue : colorsStyle.principal.black} />
          <Text style={{ color: data.stateMusic.pressBtn.reset ? colorsStyle.principal.blue : colorsStyle.principal.black }}>Nenhum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={infoStyles.buttonsInfo} onPress={changeForest}>
          <ForestSvg width="45px" height="45px" fill={data.stateMusic.pressBtn.forest ? colorsStyle.principal.blue : colorsStyle.principal.black} />
          <Text style={{ color: data.stateMusic.pressBtn.forest ? colorsStyle.principal.blue : colorsStyle.principal.black }}>Floresta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={infoStyles.buttonsInfo} onPress={changeWaves}>
          <WavesSvg width="45px" height="45px" fill={data.stateMusic.pressBtn.waves ? colorsStyle.principal.blue : colorsStyle.principal.black} />
          <Text style={{ color: data.stateMusic.pressBtn.waves ? colorsStyle.principal.blue : colorsStyle.principal.black }}>Ondas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={infoStyles.buttonsInfo} onPress={changeFire}>
          <FireSvg width="45px" height="45px" fill={data.stateMusic.pressBtn.fire ? colorsStyle.principal.blue : colorsStyle.principal.black} />
          <Text style={{ color: data.stateMusic.pressBtn.fire ? colorsStyle.principal.blue : colorsStyle.principal.black }}>Fogueira</Text>
        </TouchableOpacity>

        <TouchableOpacity style={infoStyles.buttonsInfo} onPress={changeYoutube}>
          <YoutubeSvg width="45px" height="45px" fill={data.stateMusic.pressBtn.youtube ? colorsStyle.principal.blue : colorsStyle.principal.black} />
          <Text style={{ color: data.stateMusic.pressBtn.youtube ? colorsStyle.principal.blue : colorsStyle.principal.black }}>Youtube</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
