import { View, Text, TouchableOpacity } from "react-native/";
import { infoStyles } from "./styles/infoStyles";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import ForestSvg from "../../../assets/images/forest.svg";
import WavesSvg from "../../../assets/images/waves.svg";
import FireSvg from "../../../assets/images/fire.svg";
import YoutubeSvg from "../../../assets/images/youtube.svg";
import { colorsStyle } from "../Utils/colorsStyle";
import { useDispatch } from "react-redux";
import { changePressBtn, changeMusicLink } from "../Utils/Redux/features/statesMusic-slice";
import { AVPlaybackSource } from "expo-av";

export default function Tabs() {

  const dispatch = useDispatch();
  const data = useAppSelector((state) => state);

  function changeYoutube(){changeMusic({ youtube: !data.stateMusic.pressBtn.youtube }, require('@assets/sounds/nature.wav'))};

  function changeFire(){changeMusic({ fire: !data.stateMusic.pressBtn.fire }, require('@assets/sounds/fire.wav'))};

  function changeWaves(){changeMusic({ waves: !data.stateMusic.pressBtn.waves }, require('@assets/sounds/waves.wav'))};

  function changeForest(){changeMusic({ forest: !data.stateMusic.pressBtn.forest }, require('@assets/sounds/nature.wav'))};

  function changeMusic(changeBtn: {}, musicLink: AVPlaybackSource) {

    let newBtnsObj = data.stateMusic.pressBtn;

    Object.keys(newBtnsObj).forEach((key) => {
      newBtnsObj[key] = false;
    })
    newBtnsObj = { ...newBtnsObj, ...changeBtn }
    dispatch(changePressBtn(newBtnsObj));

    musicLink ? dispatch(changeMusicLink(musicLink)) : null;
  }

  return (
    <View style={infoStyles.container}>
      {data.stateMusic.isSelection ?
        <>
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
        </>
        : null}
    </View>
  );
}