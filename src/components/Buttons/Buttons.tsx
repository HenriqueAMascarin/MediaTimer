import { View } from "react-native";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import { buttonsStyle } from "./styles/buttonsStyle";

export default function Buttons(){
    return(
        <View style={buttonsStyle.container}>
            <PlayButton/>
            <View style={buttonsStyle.containerOthersButtons}>
                <PauseButton/>

            </View>
        </View>
    )
}