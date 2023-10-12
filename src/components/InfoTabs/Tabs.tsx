import { View, Text, TouchableOpacity } from "react-native";
import { infoStyles } from "./styles/infoStyles";
import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import ForestSvg from "../../../assets/images/forest.svg";
import WavesSvg from "../../../assets/images/waves.svg";
import FireSvg from "../../../assets/images/fire.svg";
import YoutubeSvg from "../../../assets/images/youtube.svg";


export default function Tabs() {

  const data = useAppSelector((state) => state);

  return (
    <View style={infoStyles.container}>
      {data.stateMusic.isSelection ?
        <>
          <TouchableOpacity style={infoStyles.buttonsInfo}>
            <ForestSvg width={"35px"} height={"35px"} />
            <Text>Floresta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={infoStyles.buttonsInfo}>
            <WavesSvg width="35px" height="35px"/>
            <Text>Ondas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={infoStyles.buttonsInfo}>
            <FireSvg width="35px" height="35px"/>
            <Text>Fogueira</Text>
          </TouchableOpacity>

          <TouchableOpacity style={infoStyles.buttonsInfo}>
            <YoutubeSvg width="35px" height="35px"/>
            <Text>Youtube</Text>
          </TouchableOpacity>
        </>
        : null}
    </View>
  );
}
